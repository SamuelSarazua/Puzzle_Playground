import { pantalla_carga } from "../carga/cargaView.js";
import { juego } from "../preguntasView/preguntasView.js";
import {
  conectarSocket,
  escucharEventos,
  unirsePartida,
  getSocket,
} from "../../../socketManager.js";
import { AuthService } from "../../../authService.js";

async function verificarCodigoPartida(codigo) {
  try {
    // Verificar sesión primero
    const { userId, token } = AuthService.getCurrentUser();
    if (!userId || !token) {
      throw new Error("No hay sesión activa");
    }

    const response = await fetch(
      `https://backend-game-mnte.onrender.com/api/partidas/validar/${codigo}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-User-Id": userId,
        },
      }
    );

    if (response.status === 401) {
      AuthService.logout();
      throw new Error("La sesión ha expirado");
    }

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Error al validar partida");
    }

    if (!data.partida || !data.partida.id) {
      throw new Error("La partida no existe o no es válida");
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

  let imagen_principal = document.createElement("div");
  imagen_principal.className = "imagen_principal";
  juega_amigos.appendChild(imagen_principal);

  let img_principal = document.createElement("img");
  img_principal.src = "../../componentes/assets/amigos.png";
  imagen_principal.appendChild(img_principal);

  // Crear contenedor de partidas públicas
  let partidas_publicas = document.createElement("div");
  partidas_publicas.className = "partidas_publicas";

  let titulo_partidas_publicas = document.createElement("h2");
  titulo_partidas_publicas.textContent = "Partidas Públicas";
  partidas_publicas.appendChild(titulo_partidas_publicas);

  let contenedor_partidas_publicas = document.createElement("div");
  contenedor_partidas_publicas.className = "contenedor_partidas_publicas";
  partidas_publicas.appendChild(contenedor_partidas_publicas);

  let partida_creada = document.createElement("div");
  partida_creada.className = "partida_creada";
  contenedor_partidas_publicas.appendChild(partida_creada);

  let nombre_partida = document.createElement("h1");
  nombre_partida.className = "nombre_partida";
  nombre_partida.textContent = "nombre partida";
  partida_creada.appendChild(nombre_partida);

  let num_jugadores_partida = document.createElement("div");
  num_jugadores_partida.className = "num_j_partidas";
  num_jugadores_partida.textContent = "1/5";
  partida_creada.appendChild(num_jugadores_partida);

  let nombres_juego = document.createElement("div");
  nombres_juego.className = "nombres_juego";
  nombres_juego.textContent = "juego";
  partida_creada.appendChild(nombres_juego);

  let nivel_partida = document.createElement("div");
  nivel_partida.className = "nivel_partida";
  nivel_partida.textContent = "nivel";
  partida_creada.appendChild(nivel_partida);

  let dificultad_partida = document.createElement("div");
  dificultad_partida.className = "dificultad_partida";
  dificultad_partida.textContent = "difi";
  partida_creada.appendChild(dificultad_partida);

  let unirse_partida_publica = document.createElement("button");
  unirse_partida_publica.className = "unirse_pp";
  unirse_partida_publica.textContent = "unirse";
  partida_creada.appendChild(unirse_partida_publica);

  juega_amigos.appendChild(partidas_publicas);

  // Crear contenedor de partidas privadas
  let partidas_privadas = document.createElement("div");
  partidas_privadas.className = "partidas_privadas";

  let titulo_partidas_privadas = document.createElement("h2");
  titulo_partidas_privadas.textContent = "Partidas Privadas";
  partidas_privadas.appendChild(titulo_partidas_privadas);

  let ingresar_partida_privada = document.createElement("input");
  ingresar_partida_privada.className = "ingresar_partida_p";
  ingresar_partida_privada.placeholder = "Ingresa tu código";
  partidas_privadas.appendChild(ingresar_partida_privada);

  let boton_ir = document.createElement("button");
  boton_ir.className = "boton_ir";
  boton_ir.textContent = "ir";

  boton_ir.addEventListener("click", async () => {
    try {
      // 1. Validar código de partida
      const codigo = ingresar_partida_privada.value.trim();
      if (!codigo) {
        mostrarError("Por favor ingresa un código de partida válido");
        return;
      }

      // 2. Verificar sesión del usuario
      const session = AuthService.getCurrentUser();

      if (!session) {
        throw new Error(
          "No hay una sesión válida. Por favor inicia sesión nuevamente."
        );
      }

      const { userId, token, username } = session;

      // 3. Obtener contenedor principal
      const mainContent = obtenerContenedorPrincipal();

      // 4. Mostrar pantalla de carga
      mostrarPantallaCarga(mainContent);

      // 5. Validar partida en el servidor
      const partida = await validarPartidaServidor(codigo, userId, token);

      // 6. Conectar socket
      const socket = await conectarSocketUsuario(userId, token);

      // 7. Mostrar pantalla de espera
      const esperaDiv = mostrarPantallaEspera(
        mainContent,
        codigo,
        partida,
        username
      );

      // 8. Configurar listeners del socket
      configurarListenersSocket(socket, {
        partida,
        userId,
        username,
        esperaDiv,
        mainContent,
        onPartidaLista: () => {
          iniciarJuego(mainContent, partida, socket);
        },
      });

      // 9. Unirse a la partida
      await unirseAPartida(socket, codigo, userId);
    } catch (error) {
      manejarErrorUnirsePartida(error);
    }
  });

  // Funciones auxiliares:

  function obtenerContenedorPrincipal() {
    const mainContent = document.querySelector(".contenido-principal");
    if (!mainContent) {
      console.error("No se encontró el contenedor principal");
      throw new Error("Error interno de la aplicación");
    }
    return mainContent;
  }

  function mostrarPantallaCarga(contenedor) {
    contenedor.innerHTML = "";
    const carga = pantalla_carga();
    contenedor.appendChild(carga.element);
  }

  async function validarPartidaServidor(codigo, userId, token) {
    try {
      const partida = await verificarCodigoPartida(codigo, userId, token);

      if (partida.estado !== "esperando") {
        throw new Error(
          partida.estado === "comenzado"
            ? "La partida ya ha comenzado"
            : "La partida ha finalizado"
        );
      }

      return partida;
    } catch (error) {
      console.error("Error al validar partida:", error);
      throw error;
    }
  }

  async function conectarSocketUsuario(userId, token) {
    try {
      return await conectarSocket(userId, token);
    } catch (error) {
      console.error("Error al conectar socket:", error);
      throw new Error("No se pudo conectar al servidor. Intenta nuevamente.");
    }
  }

  function mostrarPantallaEspera(contenedor, codigo, partida, username) {
    contenedor.innerHTML = "";

    const esperaDiv = document.createElement("div");
    esperaDiv.className = "espera-partida";
    esperaDiv.innerHTML = `
      <div class="cabecera-espera">
        <h2>Esperando jugadores...</h2>
        <p class="codigo-partida">Código: <strong>${codigo}</strong></p>
      </div>
      
      <div class="info-partida">
        <div class="info-item">
          <span>Jugadores:</span>
          <span>${partida.jugadoresConectados || 1}/${partida.jugadores}</span>
        </div>
        <div class="info-item">
          <span>Nivel:</span>
          <span>${partida.nivel}</span>
        </div>
        <div class="info-item">
          <span>Dificultad:</span>
          <span>${partida.dificultad}</span>
        </div>
      </div>
      
      <div class="jugadores-conectados">
        <h3>Jugadores conectados:</h3>
        <ul class="lista-jugadores">
          <li class="jugador-propio">${username} (Tú)</li>
        </ul>
      </div>
      
      <div class="contador-jugadores">
        <progress value="${partida.jugadoresConectados || 1}" max="${
      partida.jugadores
    }"></progress>
        <span>${partida.jugadoresConectados || 1}/${partida.jugadores}</span>
      </div>
      
      <div class="loader"></div>
      
      <button class="btn-abandonar">Abandonar partida</button>
    `;

    // Manejar el botón de abandonar
    esperaDiv.querySelector(".btn-abandonar").addEventListener("click", () => {
      abandonarPartida();
      contenedor.innerHTML = "";
      contenedor.appendChild(jugar_amigos());
    });

    contenedor.appendChild(esperaDiv);
    return esperaDiv;
  }

  function configurarListenersSocket(
    socket,
    { partida, userId, username, esperaDiv, mainContent, onPartidaLista }
  ) {
    escucharEventos(socket, {
      onActualizarJugadores: (data) => {
        console.log("👥 Lista de jugadores actualizada:", data.listaJugadores);
        const listaJugadores = esperaDiv.querySelector(".lista-jugadores");
        const contador = esperaDiv.querySelector(
          ".contador-jugadores progress"
        );
        const textoContador = esperaDiv.querySelector(
          ".contador-jugadores span"
        );

        // Actualizar lista de jugadores (es un array de strings)
        listaJugadores.innerHTML = `
          <li class="jugador-propio">${username} (Tú)</li>
          ${data.listaJugadores
            .filter((j) => j !== username)
            .map((j) => `<li>${j}</li>`)
            .join("")}
        `;

        // Actualizar contador
        if (contador && textoContador) {
          contador.value = data.jugadoresConectados;
          textoContador.textContent = `${data.jugadoresConectados}/${partida.jugadores}`;
        }
      },

      onPartidaLista: (data) => {
        console.log("🎯 Partida lista:", data);
        onPartidaLista(); // O pasa `data` si lo usas
      },

      onErrorPartida: (error) => {
        mainContent.innerHTML = `
          <div class="error">
            <h3>Error en la partida</h3>
            <p>${error.mensaje}</p>
            <button class="btn-volver">Volver</button>
          </div>
        `;

        mainContent
          .querySelector(".btn-volver")
          .addEventListener("click", () => {
            mainContent.innerHTML = "";
            mainContent.appendChild(jugar_amigos());
          });
      },
      onPartidaComenzada: (data) => {
        console.log("🎮 Partida comenzada:", data);
        const DOM = document.querySelector("#root");
        DOM.innerHTML = "";

        const nivel = parseInt(data.nivel); // viene desde el servidor
        const dificultad = data.dificultad; // viene desde el servidor

        DOM.appendChild(juego(nivel, dificultad));
      },
    });
  }

  function iniciarJuego(contenedor, partida, socket) {
    contenedor.innerHTML = "";
    const juegoView = juego({
      nivel: parseInt(partida.nivel),
      dificultad: partida.dificultad,
      idPartida: partida.id,
      esMultijugador: true,
      socket: socket,
    });
    contenedor.appendChild(juegoView);
  }

  async function unirseAPartida(socket, codigo, userId) {
    try {
      await unirsePartida({ codigoPartida: codigo, idUsuario: userId });
    } catch (error) {
      console.error("Error al unirse a partida:", error);
      throw new Error("No se pudo unir a la partida. Intenta nuevamente.");
    }
  }

  function abandonarPartida() {
    const socket = getSocket();
    if (socket) {
      socket.emit("abandonar_partida");
      desconectarSocket();
    }
  }

  function manejarErrorUnirsePartida(error) {
    console.error("Error al unirse a partida:", error);

    const mainContent =
      document.querySelector(".contenido-principal") || document.body;

    // Mensaje especial para errores de autenticación
    if (
      error.message.includes("sesión") ||
      error.message.includes("autenticación")
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");

      mainContent.innerHTML = `
        <div class="error-sesion">
          <h3>Sesión expirada</h3>
          <p>${error.message}</p>
          <button id="btn-login">Ir a iniciar sesión</button>
        </div>
      `;

      mainContent.querySelector("#btn-login").addEventListener("click", () => {
        window.location.href = "/login.html";
      });

      return;
    }

    // Error normal
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

  partidas_privadas.appendChild(boton_ir);
  juega_amigos.appendChild(partidas_privadas);

  return juega_amigos;
}

function mostrarErrorSesionExpirada() {
  // Limpiar datos de sesión
  AuthService.logout();

  const modal = document.createElement("div");
  modal.className = "modal-sesion-expirada";
  modal.innerHTML = `
    <div class="modal-contenido">
      <h3>Sesión Expirada</h3>
      <p>Tu sesión ha expirado o no es válida.</p>
      <div class="modal-botones">
        <button id="btn-login">Ir a Iniciar Sesión</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("btn-login").addEventListener("click", () => {
    window.location.href = "/login.html";
  });
}

function manejarErrorUnirsePartida(error, mainContent) {
  console.error("Error al unirse a partida:", error);

  // Determinar el mensaje apropiado
  let mensajeError = error.message;

  if (
    error.message.includes("sesión") ||
    error.message.includes("autenticación")
  ) {
    mensajeError =
      "Problema de autenticación. Serás redirigido para iniciar sesión.";
    setTimeout(() => {
      window.location.href = "/login.html";
    }, 3000);
  }

  mainContent.innerHTML = `
    <div class="error-partida">
      <h3>Error al unirse a la partida</h3>
      <p>${mensajeError}</p>
      <button class="btn-volver">Volver</button>
    </div>
  `;

  mainContent.querySelector(".btn-volver").addEventListener("click", () => {
    mainContent.innerHTML = "";
    mainContent.appendChild(jugar_amigos());
  });
}

export { jugar_amigos };
