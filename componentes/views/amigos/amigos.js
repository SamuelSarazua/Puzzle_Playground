import { pantalla_carga } from "../carga/cargaView.js";
import { juego } from "../preguntasView/preguntasView.js";

async function verificarCodigoPartida(codigo) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/partidas/validar/${codigo}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Error al validar partida");
    }

    if (!data.partida || !data.partida.id) {
      throw new Error("La respuesta del servidor no es válida");
    }

    return data.partida;
  } catch (error) {
    console.error("Error al validar partida:", error);
    throw error;
  }
}

function jugar_amigos() {
  let juega_amigos = document.createElement("div");
  juega_amigos.className = "juega_amigos";

  // ... (código anterior de creación de UI permanece igual)

  boton_ir.addEventListener("click", async () => {
    const codigo = ingresar_partida_privada.value.trim();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!codigo) {
      alert("Por favor ingresa un código de partida");
      return;
    }

    if (!userId || !token) {
      alert("No se encontró información de usuario. Inicia sesión nuevamente.");
      return;
    }

    const mainContent = document.querySelector(".contenido-principal");
    if (!mainContent) {
      console.error("No se encontró el contenedor principal");
      return;
    }

    // Mostrar pantalla de carga
    mainContent.innerHTML = "";
    const carga = pantalla_carga();
    mainContent.appendChild(carga.element);

    try {
      // 1. Validar código de partida
      const partida = await verificarCodigoPartida(codigo);

      if (partida.estado !== "esperando") {
        throw new Error(
          partida.estado === "comenzado"
            ? "La partida ya ha comenzado"
            : "La partida ha finalizado"
        );
      }

      // 2. Conectar con Socket.io usando el manager
      const socket = conectarSocket(userId, token);

      // 3. Configurar listeners
      escucharEventos(socket, {
        onActualizarJugadores: (data) => {
          if (carga?.controller) {
            carga.controller.actualizarInfo({
              jugadoresConectados: data.jugadoresConectados,
              jugadoresRequeridos: partida.jugadores,
              nivel: partida.nivel,
              dificultad: partida.dificultad,
              mensaje: `Esperando jugadores: ${data.jugadoresConectados}/${partida.jugadores}`,
            });
          }
        },
        onPartidaLista: (data) => {
          mainContent.innerHTML = "";
          const juegoView = juego({
            nivel: parseInt(partida.nivel),
            dificultad: partida.dificultad,
            idPartida: partida.id,
            esMultijugador: true,
            socket: getSocket(), // Pasamos el socket al juego
          });
          mainContent.appendChild(juegoView);
        },
        onErrorPartida: (error) => {
          throw new Error(error.mensaje || "Error en la partida");
        },
      });

      // 4. Unirse a la partida
      await unirsePartida({ codigoPartida: codigo, idUsuario: userId });

      // Actualizar pantalla de carga
      if (carga?.controller) {
        carga.controller.actualizarInfo({
          jugadoresConectados: 1,
          jugadoresRequeridos: partida.jugadores,
          nivel: partida.nivel,
          dificultad: partida.dificultad,
          mensaje: "Conectando...",
        });
      }
    } catch (error) {
      console.error("Error al unirse a partida:", error);
      mainContent.innerHTML = `
        <div class="error">
          <h3>Error al unirse a la partida</h3>
          <p>${error.message}</p>
          <button class="btn-volver">Volver</button>
        </div>
      `;

      mainContent.querySelector(".btn-volver").addEventListener("click", () => {
        mainContent.innerHTML = "";
        mainContent.appendChild(jugar_amigos());
      });
    }
  });

  return juega_amigos;
}

export { jugar_amigos };
