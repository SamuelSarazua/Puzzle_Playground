import { io } from "socket.io-client";

// Configuración de conexión
const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  (import.meta.env.NODE_ENV === "production"
    ? "wss://backend-game-mnte.onrender.com"
    : "http://localhost:3000");

let socket = null;

export function conectarSocket(idUsuario, token) {
  // Si ya hay una conexión, la cerramos primero
  if (socket) {
    socket.disconnect();
  }

  socket = io(SOCKET_URL, {
    auth: {
      idUsuario,
      token,
    },
    transports: ["websocket"],
    withCredentials: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: true,
  });

  // Manejadores de eventos básicos
  socket.on("connect", () => {
    console.log("Socket conectado:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Error de conexión Socket.io:", err.message);
    // Intenta reconectar automáticamente
    setTimeout(() => socket.connect(), 1000);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket desconectado:", reason);
  });

  return socket;
}

export function unirsePartida({ codigoPartida, idUsuario }) {
  return new Promise((resolve, reject) => {
    if (!socket || !socket.connected) {
      reject(new Error("Socket no conectado"));
      return;
    }

    socket.emit("unirse_partida", { codigoPartida, idUsuario }, (response) => {
      if (response.error) {
        reject(new Error(response.mensaje));
      } else {
        resolve(response);
      }
    });
  });
}

export function escucharEventos(socket, callbacks) {
  socket.on("actualizar_jugadores", callbacks.onActualizarJugadores);
  socket.on("partida_lista", callbacks.onPartidaLista);
  socket.on("error_partida", callbacks.onErrorPartida);

  // Agregar más listeners si es necesario
  socket.on("disconnect", () => {
    console.log("Desconectado del servidor");
  });
}

export function desconectarSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function getSocket() {
  return socket;
}
