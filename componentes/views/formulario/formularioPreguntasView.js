import { pantalla_carga } from "../carga/cargaView.js";
import { juego } from "../preguntasView/preguntasView.js";
import { getSocket, conectarSocket } from "../../../socketManager.js";

export function cargarFormularioPreguntas() {
  let formulario = document.createElement("div");
  formulario.className = "formulario-preguntas";

  // Variables globales para el estado
  let nivelSeleccionadoGlobal = null;
  let dificultadSeleccionadaGlobal = null;

  // Campos específicos
  let nombre = document.createElement("input");
  nombre.className = "nombre";
  nombre.placeholder = "Nombre del juego de preguntas";
  formulario.appendChild(nombre);

  let num_jugadores = document.createElement("input");
  num_jugadores.placeholder = "Número de jugadores (1-5)";
  num_jugadores.className = "num-jugadores";
  num_jugadores.type = "number";
  num_jugadores.min = "1";
  num_jugadores.max = "5";
  formulario.appendChild(num_jugadores);

  let selectorNivel = document.createElement("div");
  selectorNivel.className = "selector-nivel";
  let tituloNivel = document.createElement("h3");
  tituloNivel.textContent = "Selecciona un nivel:";
  selectorNivel.appendChild(tituloNivel);

  let nivelesContainer = document.createElement("div");
  nivelesContainer.className = "niveles-container";

  for (let i = 1; i <= 5; i++) {
    let nivelBtn = document.createElement("button");
    nivelBtn.className = "btn-nivel";
    nivelBtn.textContent = `Nivel ${i}`;
    nivelBtn.dataset.nivel = i;
    nivelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelectorAll(".btn-nivel").forEach((btn) => {
        btn.classList.remove("seleccionado");
      });
      e.target.classList.add("seleccionado");
      nivelSeleccionadoGlobal = e.target.dataset.nivel;
      verificarCamposYGenerarCodigo();
    });
    nivelesContainer.appendChild(nivelBtn);
  }

  selectorNivel.appendChild(nivelesContainer);
  formulario.appendChild(selectorNivel);

  let contenedor_nivel_dificultad = document.createElement("div");
  contenedor_nivel_dificultad.className = "cont-niver-dificultad";
  formulario.appendChild(contenedor_nivel_dificultad);

  let titulo_c_n_d = document.createElement("h3");
  titulo_c_n_d.textContent = "Elige la dificultad: ";
  contenedor_nivel_dificultad.appendChild(titulo_c_n_d);

  let cont_f_i_d = document.createElement("div");
  cont_f_i_d.className = "cont_f_i_d";
  contenedor_nivel_dificultad.appendChild(cont_f_i_d);

  let nivel_facil = document.createElement("button");
  nivel_facil.className = "nivel_facil";
  nivel_facil.textContent = "Fácil";
  nivel_facil.dataset.dificultad = "facil";

  let niver_intermedio = document.createElement("button");
  niver_intermedio.className = "nivel_intermedio";
  niver_intermedio.textContent = "Medio";
  niver_intermedio.dataset.dificultad = "medio";

  let nivel_dificil = document.createElement("button");
  nivel_dificil.className = "nivel_dificil";
  nivel_dificil.textContent = "Difícil";
  nivel_dificil.dataset.dificultad = "dificil";

  [nivel_facil, niver_intermedio, nivel_dificil].forEach((boton) => {
    boton.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelectorAll(".nivel_facil, .nivel_intermedio, .nivel_dificil")
        .forEach((btn) => btn.classList.remove("seleccionado"));
      e.target.classList.add("seleccionado");
      dificultadSeleccionadaGlobal = e.target.dataset.dificultad;
      verificarCamposYGenerarCodigo();
    });
    cont_f_i_d.appendChild(boton);
  });

  let contenedorCodigo = document.createElement("div");
  contenedorCodigo.className = "contenedor-codigo";

  let tituloCodigo = document.createElement("h3");
  tituloCodigo.className = "tituloCodigo";
  tituloCodigo.textContent = "Código de juego:";
  contenedorCodigo.appendChild(tituloCodigo);

  let crear_codigo = document.createElement("h1");
  crear_codigo.className = "generar_codigo";
  crear_codigo.textContent = "Complete los datos";
  contenedorCodigo.appendChild(crear_codigo);

  formulario.appendChild(contenedorCodigo);

  function generarCodigoAleatorio() {
    const caracteres =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let codigo = "";
    for (let i = 0; i < 8; i++) {
      codigo += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }
    return codigo;
  }

  function verificarCamposYGenerarCodigo() {
    const nombreValido = nombre.value.trim() !== "";
    const jugadoresValido =
      num_jugadores.value &&
      num_jugadores.value >= 1 &&
      num_jugadores.value <= 5;
    const nivelSeleccionado = nivelSeleccionadoGlobal !== null;
    const dificultadSeleccionada = dificultadSeleccionadaGlobal !== null;

    if (
      nombreValido &&
      jugadoresValido &&
      nivelSeleccionado &&
      dificultadSeleccionada
    ) {
      crear_codigo.textContent = generarCodigoAleatorio();
      crear_codigo.style.color = "#2ecc71";
    } else {
      crear_codigo.textContent = "Complete los datos";
      crear_codigo.style.color = "#e74c3c";
    }
  }

  nombre.addEventListener("input", verificarCamposYGenerarCodigo);
  num_jugadores.addEventListener("input", verificarCamposYGenerarCodigo);

  async function guardarPartida(datosPartida) {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const token = localStorage.getItem("token");
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const response = await fetch(
        "https://backend-game-mnte.onrender.com/api/partidas",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(datosPartida),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al guardar la partida");
      }

      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  let jugar = document.createElement("button");
  jugar.textContent = "Jugar";
  jugar.className = "btn-crear-partida";
  jugar.addEventListener("click", async () => {
    const numJugadores = num_jugadores.value;
    const nombreJuego = nombre.value.trim();
    const codigoGenerado = crear_codigo.textContent;

    if (
      !nombreJuego ||
      !nivelSeleccionadoGlobal ||
      !dificultadSeleccionadaGlobal ||
      !numJugadores ||
      numJugadores < 1 ||
      numJugadores > 5 ||
      codigoGenerado === "Complete los datos"
    ) {
      alert("Por favor completa todos los campos correctamente.");
      return;
    }

    const datosPartida = {
      nombre_partida: nombreJuego,
      numero_jugadores: numJugadores,
      numero_nivel: nivelSeleccionadoGlobal,
      dificultad: dificultadSeleccionadaGlobal,
      codigo_generado: codigoGenerado,
      id_usuarios: localStorage.getItem("userId") || null,
    };

    const DOM = document.querySelector("#root");
    DOM.innerHTML = "";
    const carga = pantalla_carga();
    carga.actualizarInfo({
      nombreJuego,
      numJugadores,
      nivelSeleccionado: nivelSeleccionadoGlobal,
      dificultadSeleccionada: dificultadSeleccionadaGlobal,
      mensaje: "Guardando partida...",
    });
    DOM.appendChild(carga.element);

    try {
      const resultado = await guardarPartida(datosPartida);
      console.log("✅ Partida guardada:", resultado);

      const exito = document.createElement("div");
      exito.className = "mensaje-exito";
      exito.innerHTML = `
        <h3>¡Partida creada exitosamente!</h3>
        <p>Código: ${codigoGenerado}</p>
        <button class="btn-comenzar-partida">Comenzar Juego</button>
      `;
      DOM.appendChild(exito);

      DOM.querySelector(".btn-comenzar-partida").addEventListener(
        "click",
        async () => {
          const idPartida =
            resultado.id_partida || resultado.idPartidas || resultado.id;
          const idLogin = localStorage.getItem("userId");
          const token = localStorage.getItem("token");

          try {
            console.log("🚀 Click en comenzar juego");
            const socket = await conectarSocket(idLogin, token);

            socket.emit("unirse_partida", {
              codigoPartida: datosPartida.codigo_generado,
              idLogin: idLogin,
            });

            socket.once("actualizar_jugadores", () => {
              console.log("✅ Jugador unido. Enviando comenzar_partida...");
              socket.emit("comenzar_partida", { idPartida, idLogin });
            });

            socket.once("partida_comenzada", (data) => {
              console.log("🎮 Partida comenzó:", data);
              DOM.innerHTML = "";
              DOM.appendChild(juego(parseInt(data.nivel), data.dificultad));
            });

            socket.once("error_partida", (error) => {
              console.error("❌ Error al unirse a partida:", error.mensaje);
              alert(error.mensaje || "No se pudo unir a la partida.");
            });
          } catch (err) {
            console.error("Error al conectar socket:", err);
            alert("No estás conectado al servidor.");
          }
        }
      );
    } catch (error) {
      console.error("Error al guardar partida:", error);
      const DOM = document.querySelector("#root");
      DOM.innerHTML = "";

      const errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      errorDiv.innerHTML = `
        <h3>Error al guardar partida</h3>
        <p>${error.message}</p>
        <div class="detalles-error">
          <p>Posibles soluciones:</p>
          <ul>
            <li>Verifica tu conexión a internet</li>
            <li>Intenta nuevamente más tarde</li>
            <li>Contacta al soporte técnico</li>
          </ul>
        </div>
        <button class="btn-reintentar">Reintentar</button>
      `;
      DOM.appendChild(errorDiv);

      DOM.querySelector(".btn-reintentar").addEventListener("click", () => {
        DOM.innerHTML = "";
        DOM.appendChild(cargarFormularioPreguntas());
      });
    }
  });

  formulario.appendChild(jugar);
  return formulario;
}
