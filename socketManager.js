// URL fija de tu backend
const SOCKET_URL = "https://backend-game-mnte.onrender.com";

let socket = null;

export function conectarSocket(idUsuario, token) {
  if (socket) {
    socket.disconnect();
  }

  socket = io(SOCKET_URL, {
    auth: {
      idUsuario: idUsuario,
      token: token,
    },
    transports: ["websocket"],
    withCredentials: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: true,
  });

  socket.on("connect", () => {
    console.log("Socket conectado:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Error de conexión Socket.io:", err.message);
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

// Opcional: exponer funciones globalmente si las necesitas en otros scripts
window.conectarSocket = conectarSocket;
window.unirsePartida = unirsePartida;
window.escucharEventos = escucharEventos;
window.desconectarSocket = desconectarSocket;
window.getSocket = getSocket;
