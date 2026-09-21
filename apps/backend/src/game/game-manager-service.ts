import { Injectable } from "@nestjs/common";
import { Server } from "socket.io";
import { Game } from "./entities/Game";
import { Player } from "./entities/Player";
import { PlayCardAnimationEvent, Color, RoomPlayer } from "@shared/types";

@Injectable()
export class GameManagerService {
  games = new Map<string, Game>();

  constructor(
  ){ }

  createGame(roomId: string, players: RoomPlayer[], server: Server): Game {
    const game = new Game(roomId);
    const color = [Color.RED, Color.GREEN, Color.BLUE, Color.YELLOW];
    let idx = 0;
    for (const player of players) {
      game.addPlayer(
        new Player(player.playerId, player.socketId, player.name, color[idx], game)
      );
      idx++;
    }
    game.initPlayers();

    game.on('stateChanged', () => {
      this.broadcastGameData(game, server);
    });

    game.on('playCardAnimation', (event: PlayCardAnimationEvent) => {
      for (let player of game.players) {
        const playerSocket = server.sockets.sockets.get(player.socketId);
        playerSocket.emit('playCardAnimation', event);
      }
    });

    game.on('gameOver', () => {
      
    });
    
    this.games.set(roomId, game);
    return game;
  }

  getGameById(id: string): Game {
    return this.games.get(id);
  }

  private broadcastGameData(game: Game, server: Server) {
    for (let player of game.players) {
      const playerSocket = server.sockets.sockets.get(player.socketId);
      playerSocket.emit('updateGameData', player.state.getGameData());
      playerSocket.emit('getAvailableMove', player.state.getAvailableMove());
    }
  }
}