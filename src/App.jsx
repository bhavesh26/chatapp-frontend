import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { socketService } from "./hooks/socket";



export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socket = socketService.getSocket(); // Get the single instance

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]); // Update messages
    });

    return () => socket.off("message"); // Cleanup listener
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("message", input); // Send message to server
      setInput("");
    }
  };

  return (
    <div>
      <h2>Chat App</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
