import { Injectable } from "@angular/core";
import { fromEvent, Observable } from "rxjs";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "./api-config";

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket!: Socket;

  connect() {
    this.socket = io(SOCKET_URL, {
      auth: {
        token: sessionStorage.getItem('token')
      }
    });
  }

  get id(): string | undefined {
    return this.socket.id;
  }

  emit(event: string, data?: any) {
    this.socket.emit(event, data);
  }

  on<T>(event: string): Observable<T> {
    return fromEvent<T>(this.socket, event);
  }
}