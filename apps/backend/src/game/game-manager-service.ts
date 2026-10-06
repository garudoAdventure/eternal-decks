import { Injectable } from "@nestjs/common";
import { Server } from "socket.io";
import { Game } from "./entities/Game";
import { Player } from "./entities/Player";
import { Color, RoomPlayer } from "@shared/types";

@Injectable()
export class GameManagerService {
  games = new Map<string, Game>();

  constructor(
  ){}

  createGame(roomId: string, players: RoomPlayer[], server: Server): Game {
    const game = new Game(roomId);
    const color = [Color.RED, Color.GREEN, Color.BLUE, Color.YELLOW];
    
    players.forEach((player, idx) => {
      game.addPlayer(new Player(
        player.playerId, player.socketId, player.name, color[idx], game
      ));
    });

    game.initPlayers();

    game.on('updateGameData', () => {
      this.broadcastGameData(game, server);
    });

    game.on('getAvailableMove', () => {
      this.broadcastAvailableMove(game, server);
    })

    game.on('stageClear', () => {
      game.players.forEach(player => {
        const playerSocket = server.sockets.sockets.get(player.socketId);
        playerSocket.emit('stageClear');
        playerSocket.emit('getAvailableMove', player.state.getAvailableMove());
      });
    });
    
    game.on('gameOver', (payload) => {
      game.players.forEach(player => {
        const playerSocket = server.sockets.sockets.get(player.socketId);
        playerSocket.emit('gameOver', payload);
        playerSocket.emit('getAvailableMove', player.state.getAvailableMove());
      });
    });
    
    this.games.set(roomId, game);
    return game;
  }

  getGameById(id: string): Game {
    return this.games.get(id);
  }

  private broadcastGameData(game: Game, server: Server) {
    game.players.forEach(player => {
      const playerSocket = server.sockets.sockets.get(player.socketId);
      playerSocket.emit('updateGameData', player.state.getGameData());
    });
    game.movedItemId = [];
  }

  private broadcastAvailableMove(game: Game, server: Server) {
    game.players.forEach(player => {
      const playerSocket = server.sockets.sockets.get(player.socketId);
      playerSocket.emit('getAvailableMove', player.state.getAvailableMove());
    });
  }
}