import { 
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  MessageBody,
  ConnectedSocket
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { RoomStatus } from '@shared/types';
import { RoomService } from './room.service';
import { GameManagerService } from '../game/game-manager.service';

@WebSocketGateway({ cors: { origin: process.env.FRONTEND_URL ?? 'http://localhost:4200' } })
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private roomService: RoomService,
    private gameManager: GameManagerService,
    private jwtService: JwtService
  ) {}

  private broadcastRoomList() {
    this.server.emit('roomListUpdated', this.roomService.listRooms());
  }
  
  handleConnection(client: Socket) {
    const token = client.handshake.auth.token;
    try {
      const payload = this.jwtService.verify(token);
      client.data.playerId = payload.id;
      client.data.playerName = payload.name;
    } catch {
      client.emit('authError', 'token 驗證失敗');
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const affectedRooms = this.roomService.handleDisconnect(client.data.playerId);
    affectedRooms.forEach((room) => this.server.to(room.id).emit('roomUpdated', room));
    this.broadcastRoomList();
  }
  
  @SubscribeMessage('createRoom')
  createRoom(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket
  ) {
    const room = this.roomService.joinRoom(data.roomId, client);
    client.join(data.roomId);
    this.server.to(room.id).emit('roomUpdated', room);
    this.broadcastRoomList();
  }

  @SubscribeMessage('joinRoom')
  joinRoom(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket
  ) {
    const room = this.roomService.joinRoom(data.roomId, client);
    client.join(room.id);
    this.server.to(room.id).emit('roomUpdated', room);
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket
  ) {
    const room = this.roomService.leaveRoom(data.roomId, client.data.playerId);
    client.leave(data.roomId);
    if (room) { this.server.to(room.id).emit('roomUpdated', room); }
    this.broadcastRoomList();
  }

  @SubscribeMessage('getRoomList')
  getRoomList(){
    this.broadcastRoomList();
  }

  @SubscribeMessage('getRoom')
  getRoom(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket
  ) {
    const room = this.roomService.listRooms().find((r) => { return r.id == data.roomId; });
    if (room) {
      client.join(room.id);
      client.emit('roomUpdated', room);
    } else {
      client.emit('joinRoomError', '不存在');
    }
  }

  @SubscribeMessage('startGame')
  startGame(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket
  ) {
    const room = this.roomService.listRooms().find((r) => { return r.id == data.roomId; });
    room.status = RoomStatus.GAME_START;
    this.gameManager.createGame(data.roomId, room.players, this.server);
    this.server.to(data.roomId).emit('roomUpdated', room);
  }
}
