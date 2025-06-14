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
      // Remover selección previa
      document.querySelectorAll(".btn-nivel").forEach((btn) => {
        btn.classList.remove("seleccionado");
      });
      // Marcar como seleccionado
      e.target.classList.add("seleccionado");
    });
    nivelesContainer.appendChild(nivelBtn);
  }

  selectorNivel.appendChild(nivelesContainer);
  formulario.appendChild(selectorNivel);

  // Botón para jugar
  let jugar = document.createElement("button");
  jugar.textContent = "Jugar a Preguntas";
  jugar.className = "btn-jugar";
  jugar.addEventListener("click", async () => {
    const nivelSeleccionado = document.querySelector(".btn-nivel.seleccionado")
      ?.dataset.nivel;
    const numJugadores = num_jugadores.value || 1;

    if (!nivelSeleccionado) {
      alert("Por favor selecciona un nivel");
      return;
    }

    const DOM = document.querySelector("#root");
    DOM.innerHTML = "";

    // Mostrar pantalla de carga con información
    const carga = pantalla_carga();
    carga.element.querySelector(
      ".numero_jugadores"
    ).textContent = `Número de jugadores: ${numJugadores}/5\nNivel: ${nivelSeleccionado}`;
    DOM.appendChild(carga.element);

    await carga.promise;

    DOM.innerHTML = "";
    // Pasar el nivel seleccionado al juego de preguntas
    DOM.appendChild(juego(parseInt(nivelSeleccionado)));
  });

  formulario.appendChild(jugar);

  return formulario;
}
