import { pantalla_carga } from "../carga/cargaView.js";
import { juegoMemoria } from "../memoria/memoriaView.js";

export function cargarFormularioMemoria() {
  let formulario = document.createElement("div");
  formulario.className = "formulario-memoria";

  // Campos específicos para memoria
  let nombre = document.createElement("input");
  nombre.className = "nombre";
  nombre.placeholder = "Nombre del juego de memoria";
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

  // Crear botones para cada nivel (1-5)
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

  // Contenedor de dificultad
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
  cont_f_i_d.appendChild(nivel_facil);

  let nivel_intermedio = document.createElement("button");
  nivel_intermedio.className = "nivel_intermedio";
  nivel_intermedio.textContent = "Medio";
  nivel_intermedio.dataset.dificultad = "medio";
  cont_f_i_d.appendChild(nivel_intermedio);

  let nivel_dificil = document.createElement("button");
  nivel_dificil.className = "nivel_dificil";
  nivel_dificil.textContent = "Difícil";
  nivel_dificil.dataset.dificultad = "dificil";
  cont_f_i_d.appendChild(nivel_dificil);

  // Contenedor del código
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
    const dificultadSeleccionada =
      document.querySelector(
        ".nivel_facil.seleccionado, .nivel_intermedio.seleccionado, .nivel_dificil.seleccionado"
      ) !== null;

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

  // Event listeners para los campos
  nombre.addEventListener("input", verificarCamposYGenerarCodigo);
  num_jugadores.addEventListener("input", verificarCamposYGenerarCodigo);

  // Event listeners para los botones de dificultad
  [nivel_facil, nivel_intermedio, nivel_dificil].forEach((boton) => {
    boton.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelectorAll(".nivel_facil, .nivel_intermedio, .nivel_dificil")
        .forEach((btn) => {
          btn.classList.remove("seleccionado");
        });
      e.target.classList.add("seleccionado");
      verificarCamposYGenerarCodigo();
    });
  });

  // Botón para jugar
  let jugar = document.createElement("button");
  jugar.textContent = "Jugar a Memoria";
  jugar.className = "btn-jugar";
  jugar.addEventListener("click", async () => {
    const nivelSeleccionado = document.querySelector(".btn-nivel.seleccionado")
      ?.dataset.nivel;
    const dificultadSeleccionada = document.querySelector(
      ".nivel_facil.seleccionado, .nivel_intermedio.seleccionado, .nivel_dificil.seleccionado"
    )?.dataset.dificultad;
    const nombreJuego = nombre.value.trim();
    const codigoGenerado = crear_codigo.textContent;
    const numJugadores = num_jugadores.value || 1;

    // Validaciones
    if (!nombreJuego) {
      alert("Por favor ingresa un nombre para el juego");
      return;
    }

    if (!nivelSeleccionado) {
      alert("Por favor selecciona un nivel");
      return;
    }

    if (!dificultadSeleccionada) {
      alert("Por favor selecciona una dificultad");
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

    // Mostrar pantalla de carga
    const DOM = document.querySelector("#root");
    DOM.innerHTML = "";
    const carga = pantalla_carga();
    carga.element.querySelector(
      ".numero_jugadores"
    ).textContent = `Nombre: ${nombreJuego}\nJugadores: ${numJugadores}/5\nNivel: ${nivelSeleccionado}\nDificultad: ${dificultadSeleccionada}\nCargando juego...`;
    DOM.appendChild(carga.element);

    await carga.promise;

    DOM.innerHTML = "";
    // Iniciar el juego de memoria con los parámetros seleccionados
    const parejas = 4 + (parseInt(nivelSeleccionado) - 1) * 2; // Calcula el número de parejas basado en el nivel
    DOM.appendChild(
      juegoMemoria(parejas, dificultadSeleccionada, numJugadores)
    );
  });

  formulario.appendChild(jugar);

  return formulario;
}
