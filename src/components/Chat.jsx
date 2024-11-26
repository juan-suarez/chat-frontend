import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import getUserInfoFromCookie from "../utils/getNameUser";

const { firstName, lastName, role } = getUserInfoFromCookie()

const socket = io("http://localhost:3000",{
  auth: {
    username: firstName+ ' ' + lastName,
    serverOffset: 0,
    role
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
          <div key={index} style={{ width: '100%' }}>
            <div style={styles.message}>
              {msg}
            </div>
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
    textAlign: "left", // Asegura que el contenedor esté alineado a la izquierda
    margin: "0 auto",
    padding: "1rem",
    width: "100%",
    maxWidth: "600px",
    height: "100%",
  },
  chatBox: {
    height: "90%",
    overflowY: "auto",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9", // Fondo de la caja de chat
    scrollBehavior: "smooth",
    textAlign: "left", // Asegura que todo el contenido dentro del chatBox esté alineado a la izquierda
  },
  message: {
    padding: "10px 15px", // Espaciado interno del mensaje
    background: "linear-gradient(to right, #5c9bf1, #00aaff)", // Fondo del mensaje
    color: "white", // Color del texto
    borderRadius: "15px", // Bordes redondeados
    border: "solid black 1px", // Borde del mensaje
    display: "inline-block", // El mensaje solo toma el tamaño del texto
    marginBottom: "15px", // Espacio entre mensajes
    whiteSpace: "pre-wrap", // Respetar los saltos de línea
    wordWrap: "break-word", // Romper las palabras largas
    textAlign: "left", // Alineación del texto dentro del mensaje
    maxWidth: "100%", // El mensaje puede ocupar hasta el 100% del contenedor
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  input: {
    flex: "1",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  button: {
    padding: "12px 20px",
    background: "linear-gradient(to right, #5c9bf1, #00aaff)", // Estilo del botón con gradiente
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  },
};








