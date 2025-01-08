import { useEffect, useState } from "react";
import { io } from "socket.io-client";

/**
 * 유저가 웹에 접속하고, 로그인이 돼어있다면, 유저 타입 + 유저 아이디를 이용해서 room을 팜
 */

const back_url = "http://localhost:3000/panther-charitan/chat";
let sockets = {};
const useSocket = (roomId) => {
  const [socket, setSocket] = useState(undefined);
  useEffect(() => {
    if (!sockets) {
      sockets = io(back_url, {
        autoConnect: false,
        transports: ["websocket"],
        query: { roomId: roomId },
      });
    }
    if (sockets) {
      sockets.connect();
      setSocket(sockets);
    }
    return () => {
      if (sockets) {
        sockets.disconnect();
        let sockets = {};
      }
    };
  }, []);

  return { socket };
};

export default useSocket;
