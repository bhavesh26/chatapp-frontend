import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3002";

class SocketService {
  constructor() {
    if (!SocketService.instance) {
      this.socket = io(SOCKET_URL, {
        transports: ["websocket"],
        reconnection: true,
      });
      SocketService.instance = this;
    }
    return SocketService.instance;
  }

  getSocket() {
    return this.socket;
  }
}

export const socketService = new SocketService();
