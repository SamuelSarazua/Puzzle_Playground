import { AuthService } from "../../../authService.js";

// URL fija de tu backend
const SOCKET_URL = "https://backend-game-mnte.onrender.com";

let socket = null;

export function conectarSocket(idUsuario, token) {
  if (socket && socket.connected) {
    return socket; // Ya está conectado
  }

  if (!idUsuario || !token) {
    throw new Error("No hay sesión activa");
  }

  if (socket) {
    socket.disconnect();
    socket = null;
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

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Tiempo de espera agotado para conectar el socket"));
    }, 5000);

    socket.on("connect", () => {
      clearTimeout(timeout);
      console.log("Socket conectado:", socket.id);
      resolve(socket);
    });

    socket.on("connect_error", (err) => {
      clearTimeout(timeout);
      console.error("Error de conexión Socket.io:", err.message);
      reject(err);
    });
  });
}

export function unirsePartida({ codigoPartida, idUsuario }) {
  return new Promise((resolve, reject) => {
    if (!socket || !socket.connected) {
      reject(new Error("Socket no conectado"));
      return;
    }

    socket.emit(
      "unirse_partida",
      { codigoPartida, idLogin: idUsuario },
      (response) => {
        if (response.error) {
          reject(new Error(response.mensaje));
        } else {
          resolve(response);
        }
      }
    );
  });
}

export function escucharEventos(socket, callbacks) {
  socket.on("actualizar_jugadores", (data) => {
    callbacks.onActualizarJugadores(data);
  });

  socket.on("partida_lista", callbacks.onPartidaLista);
  socket.on("error_partida", callbacks.onErrorPartida);

  socket.on("partida_comenzada", (data) => {
    console.log("Partida comenzada:", data);
    if (callbacks.onPartidaComenzada) {
      callbacks.onPartidaComenzada(data);
    }
  });

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
