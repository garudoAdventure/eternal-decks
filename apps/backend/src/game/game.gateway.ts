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
import { GameEvent } from '@shared/types';
import { GameManagerService } from './game-manager-service';

@WebSocketGateway({ cors: { origin: '*' } })
export class GameGateway implements OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private gameManager: GameManagerService
  ) {}

  handleDisconnect(client: Socket) {

  }

  @SubscribeMessage('loadGame')
  loadGame(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client
  ) {
    const game = this.gameManager.getGameById(data.roomId);
    const playerId = client.data.playerId;
    const player = game.players.find(p => p.id == playerId);
    if (player) {
      player.socketId = client.id;
    }
    game.emitGameData();
  }

  @SubscribeMessage(GameEvent.SELECT_CARD)
  selectCard(
    @MessageBody() data: { roomId: string, cardIdx: number },
    @ConnectedSocket() client
  ) {
    const game = this.gameManager.getGameById(data.roomId);
    game.selectCard(client.data.playerId, data.cardIdx);
  }

  @SubscribeMessage(GameEvent.SELECT_FIELD_CARD)
  selectFieldCard(
    @MessageBody() data: { roomId: string, fieldIdx: number, cardIdx: number },
    @ConnectedSocket() client
  ) {
    const game = this.gameManager.getGameById(data.roomId);
    game.selectFieldCard(client.data.playerId, data.fieldIdx, data.cardIdx);
  }

  @SubscribeMessage(GameEvent.SELECT_FIELD)
  selectField(
    @MessageBody() data: { roomId: string, fieldIdx: number },
    @ConnectedSocket() client
  ) {
    const game = this.gameManager.getGameById(data.roomId);
    game.selectField(client.data.playerId, data.fieldIdx);
  }

  @SubscribeMessage(GameEvent.SELECT_FIELD_ETERNAL)
  selectFieldEternal(
    @MessageBody() data: { roomId: string, eternalIdx: number },
    @ConnectedSocket() client
  ) {
    const game = this.gameManager.getGameById(data.roomId);
    game.selectFieldEternal(client.data.playerId, data.eternalIdx);
  }

  @SubscribeMessage(GameEvent.SELECT_ETERNAL)
  selectEternal(
    @MessageBody() data: { roomId: string, eternalIdx: number },
    @ConnectedSocket() client
  ) {
    const game = this.gameManager.getGameById(data.roomId);
    game.selectFieldEternal(client.data.playerId, data.eternalIdx);
  }

  @SubscribeMessage(GameEvent.SELECT_JEWEL)
  selectJewel(
    @MessageBody() data: { roomId: string, jewelIdx: number },
    @ConnectedSocket() client
  ) {
    const game = this.gameManager.getGameById(data.roomId);
    game.selectJewel(client.data.playerId, data.jewelIdx);
  }

  @SubscribeMessage(GameEvent.SELECT_HEART)
  selectHeart(
    @MessageBody() data: { roomId: string, heartIdx: number },
    @ConnectedSocket() client
  ) {
    const game = this.gameManager.getGameById(data.roomId);
    game.selectHeart(client.data.playerId, data.heartIdx);
  }

  @SubscribeMessage(GameEvent.SELECT_PLAYER)
  selectPlayer(
    @MessageBody() data: { roomId: string, playerId: string },
    @ConnectedSocket() client
  ) {
    const game = this.gameManager.getGameById(data.roomId);
    game.selectPlayer(client.data.playerId, data.playerId);
  }

  @SubscribeMessage(GameEvent.USE_CARD)
  useCard(
    @MessageBody() data: { roomId: string, cardIdx: number },
    @ConnectedSocket() client
  ) {
    const game = this.gameManager.getGameById(data.roomId);
    game.useCard(client.data.playerId, data.cardIdx);
  }

  @SubscribeMessage(GameEvent.ROTATE_CARD)
  rotateCard(
    @MessageBody() data: { roomId: string, cardIdx: number },
    @ConnectedSocket() client
  ) {
    const game = this.gameManager.getGameById(data.roomId);
    game.rotateCard(client.data.playerId, data.cardIdx);
  }

  @SubscribeMessage(GameEvent.CONFIRM_ACTION)
  confirmAction(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client
  ) {
    const game = this.gameManager.getGameById(data.roomId);
    game.confirmAction(client.data.playerId);
  }
  
}
