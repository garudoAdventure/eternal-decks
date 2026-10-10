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

@WebSocketGateway({ cors: { origin: process.env.FRONTEND_URL ?? 'http://localhost:4200' } })
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
    game.emitAvailableMove();
  }

  @SubscribeMessage(GameEvent.SELECT_CARD)
  selectCard(
    @MessageBody() data: { roomId: string, cardIdx: number },
    @ConnectedSocket() client
  ) {
    const game = this.gameManager.getGameById(data.roomId);
    game.selectCard(client.data.playerId, data.cardIdx);
  }

  @SubscribeMessage(GameEvent.DRAG_CARD)
  dragCard(
    @MessageBody() data: { roomId: string, cardIdx: number },
    @ConnectedSocket() client
  ) {
    const game = this.gameManager.getGameById(data.roomId);
    game.dragCard(client.data.playerId, data.cardIdx);
  }

  @SubscribeMessage(GameEvent.SELECT_FIELD_CARD)
  selectFieldCard(
    @MessageBody() data: { roomId: string, fieldIdx: number, cardIdx: number },
    @ConnectedSocket() client
  ) {
    const game = this.gameManager.getGameById(data.roomId);
    game.selectFieldCard(client.data.playerId, data.fieldIdx, data.cardIdx);
  }

  @SubscribeMessage(GameEvent.PLAY_CARD_TO_FIELD)
  playCardToField(
    @MessageBody() data: { roomId: string, fieldIdx: number, cardIdx: number },
    @ConnectedSocket() client
  ) {
    const game = this.gameManager.getGameById(data.roomId);
    game.playCardToField(client.data.playerId, data.fieldIdx, data.cardIdx);
  }

  @SubscribeMessage(GameEvent.PLAY_CARD_TO_RIVER)
  playCardToRiver(
    @MessageBody() data: { roomId: string, cardIdx: number },
    @ConnectedSocket() client
  ) {
    const game = this.gameManager.getGameById(data.roomId);
    game.playCardToRiver(client.data.playerId, data.cardIdx);
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
    game.selectEternal(client.data.playerId, data.eternalIdx);
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
  useAbilityCard(
    @MessageBody() data: { roomId: string, cardIdx: number },
    @ConnectedSocket() client
  ) {
    const game = this.gameManager.getGameById(data.roomId);
    game.useAbilityCard(client.data.playerId, data.cardIdx);
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
