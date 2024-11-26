import { io } from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io("http://localhost:3000",{
  auth: {
    username: "juan",
    serverOffset: 0
  }
});

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Conexión al servidor
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    // Recibir mensajes del servidor
    socket.on("chat-message", (message, serverOffset) => {
      console.log(serverOffset)
      setMessages((prevMessages) => [...prevMessages, message]);
      socket.auth.serverOffset = serverOffset;
    });

    // Manejar desconexión
    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    // Limpieza al desmontar
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
    <div style={styles.container}>
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
          placeholder="Type a message..."
        />
        <button style={styles.button} onClick={sendMessage}>
          Send
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
  },
  chatBox: {
    height: "400px",
    overflowY: "auto",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9",
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

export default App;
