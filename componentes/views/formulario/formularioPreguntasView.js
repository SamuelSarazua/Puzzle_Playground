import { pantalla_carga } from "../carga/cargaView.js";
import { juego } from "../preguntasView/preguntasView.js";

export function cargarFormularioPreguntas() {
  let formulario = document.createElement("div");
  formulario.className = "formulario-preguntas";

  // Campos específicos para preguntas
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

  // Selector de niveles
  let selectorNivel = document.createElement("div");
  selectorNivel.className = "selector-nivel";

  let tituloNivel = document.createElement("h3");
  tituloNivel.textContent = "Selecciona un nivel:";
  selectorNivel.appendChild(tituloNivel);

  let nivelesContainer = document.createElement("div");
  nivelesContainer.className = "niveles-container";

  // Crear botones para cada nivel
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
      verificarCamposYGenerarCodigo();
    });
    nivelesContainer.appendChild(nivelBtn);
  }

  selectorNivel.appendChild(nivelesContainer);
  formulario.appendChild(selectorNivel);

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

  // Función para generar un código aleatorio
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

  // Función para verificar campos y generar código
  function verificarCamposYGenerarCodigo() {
    const nombreValido = nombre.value.trim() !== "";
    const jugadoresValido =
      num_jugadores.value &&
      num_jugadores.value >= 1 &&
      num_jugadores.value <= 5;
    const nivelSeleccionado =
      document.querySelector(".btn-nivel.seleccionado") !== null;

    if (nombreValido && jugadoresValido && nivelSeleccionado) {
      crear_codigo.textContent = generarCodigoAleatorio();
      crear_codigo.style.color = "#2ecc71";
    } else {
      crear_codigo.textContent = "Complete los datos";
      crear_codigo.style.color = "#e74c3c";
    }
  }

  // Event listeners para los campos
  nombre.addEventListener("input", verificarCamposYGenerarCodigo);
  num_jugadores.addEventListener("input", verificarCamposYGenerarCodigo);

  // Función para guardar la partida en el backend
  async function guardarPartida(datosPartida) {
    try {
      const response = await fetch("http://localhost:3000/api/partidas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosPartida),
      });

      if (!response.ok) {
        throw new Error("Error al guardar la partida");
      }

      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  // Botón para jugar
  let jugar = document.createElement("button");
  jugar.textContent = "Jugar";
  jugar.className = "btn-jugar";
  jugar.addEventListener("click", async () => {
    const nivelSeleccionado = document.querySelector(".btn-nivel.seleccionado")
      ?.dataset.nivel;
    const numJugadores = num_jugadores.value || 1;
    const nombreJuego = nombre.value.trim();
    const codigoGenerado = crear_codigo.textContent;

    // Validaciones
    if (!nombreJuego) {
      alert("Por favor ingresa un nombre para el juego");
      return;
    }

    if (!nivelSeleccionado) {
      alert("Por favor selecciona un nivel");
      return;
    }

    if (
      !num_jugadores.value ||
      num_jugadores.value < 1 ||
      num_jugadores.value > 5
    ) {
      alert("Por favor ingresa un número válido de jugadores (1-5)");
      return;
    }

    if (codigoGenerado === "Complete los datos") {
      alert("Por favor completa todos los datos para generar el código");
      return;
    }

    // Objeto con los datos de la partida
    const datosPartida = {
      nombre_partida: nombreJuego,
      numero_jugadores: numJugadores,
      numero_nivel: nivelSeleccionado,
      codigo_generado: codigoGenerado,
    };

    // Mostrar pantalla de carga
    const DOM = document.querySelector("#root");
    DOM.innerHTML = "";
    const carga = pantalla_carga();
    carga.element.querySelector(
      ".numero_jugadores"
    ).textContent = `Nombre: ${nombreJuego}\nJugadores: ${numJugadores}/5\nNivel: ${nivelSeleccionado}\nGuardando partida...`;
    DOM.appendChild(carga.element);

    try {
      // Guardar la partida en el backend
      await guardarPartida(datosPartida);

      await carga.promise;

      DOM.innerHTML = "";
      // Iniciar el juego
      DOM.appendChild(juego(parseInt(nivelSeleccionado)));
    } catch (error) {
      DOM.innerHTML = "";
      alert(
        "Ocurrió un error al guardar la partida. Por favor intenta nuevamente."
      );
      console.error(error);
    }
  });

  formulario.appendChild(jugar);

  return formulario;
}
