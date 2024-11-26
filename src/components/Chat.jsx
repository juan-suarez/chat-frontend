import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import getUserInfoFromCookie from "../utils/getNameUser";

const { firstName, lastName } = getUserInfoFromCookie()

const socket = io("http://localhost:3000",{
  auth: {
    username: firstName+ ' ' + lastName,
    serverOffset: 0
  }
});

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  
  
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("chat-message", (message, serverOffset) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      socket.auth.serverOffset = serverOffset;
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      socket.off("connect");
      socket.off("chat-message");
      socket.off("disconnect");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      // Emitir el mensaje al servidor
      socket.emit("chat-message", input);
      setMessages((prevMessages) => [...prevMessages]);
      setInput("");
    }
  };

  return (
    <div style={styles.container} >
      <h1>Chat</h1>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={styles.message}>
            {msg}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escibe un mensaje..."
        />
        <button style={styles.button} onClick={sendMessage}>
          Enviar
        </button>
      </div>
      
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    margin: "0 auto",
    padding: "1rem",
    width: "100%",
    maxWidth: "600px",
    height: "100%",
  },
  chatBox: {
    height: "90%",
    overflowY: "scroll",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9",
    scrollBehavior: "smooth",
  },
  message: {
    marginBottom: "5px",
    textAlign: "left",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: "1",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

