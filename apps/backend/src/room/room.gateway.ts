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
import { RoomService } from './room.service';
import { JoinRoomPayload, LeaveRoomPayload } from '@shared/types';

@WebSocketGateway({ cors: { origin: '*' } })
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private roomService: RoomService
  ) {}

  private broadcastRoomList() {
    this.server.emit('roomListUpdated', this.roomService.listRooms());
  }
  
  handleConnection(client: Socket) {
    console.log('Connected' + client.id);
  }

  handleDisconnect(client: Socket) {
    const affectedRooms = this.roomService.handleDisconnect(client.id);
    affectedRooms.forEach((room) => this.server.to(room.id).emit('roomUpdated', room));
    this.broadcastRoomList();
  }
  
  @SubscribeMessage('createRoom')
  createRoom(
    @MessageBody() data: { roomId: string; playerName: string },
    @ConnectedSocket() client: Socket
  ) {
    const room = this.roomService.joinRoom(data.roomId, client.id, data.playerName);
    client.join(data.roomId);
    this.server.to(room.id).emit('roomUpdated', room);
    this.broadcastRoomList();
  }

  @SubscribeMessage('joinRoom')
  joinRoom(
    @MessageBody() payload: JoinRoomPayload, //以後改成DTO
    @ConnectedSocket() client: Socket
  ) {
    const room = this.roomService.joinRoom(payload.roomId, client.id, payload.name);
    client.join(room.id);
    this.server.to(room.id).emit('roomUpdated', room);
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(
    @MessageBody() data: LeaveRoomPayload,
    @ConnectedSocket() client: Socket
  ) {
    const room = this.roomService.leaveRoom(data.roomId, client.id);
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
}
