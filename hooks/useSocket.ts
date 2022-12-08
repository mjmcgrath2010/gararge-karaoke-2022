import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");
      const socket = io();
      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("disconnect", () => {
        socket?.removeAllListeners();
        socket?.close();
        setSocket(null);
      });
      setSocket(socket);
    };
    if (!socket) {
      socketInitializer();
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return socket;
};

export default useSocket;
