import { pantalla_carga } from "../carga/cargaView.js";

export function cargarFormularioMemoria() {
  let formulario = document.createElement("div");
  formulario.className = "formulario-memoria";

  // Campos específicos para memoria
  let nombre = document.createElement("input");
  nombre.className = "nombre";
  nombre.placeholder = "Nombre del juego de memoria";
  formulario.appendChild(nombre);

  let num_parejas = document.createElement("input");
  num_parejas.placeholder = "Número de parejas";
  num_parejas.className = "num-parejas";
  formulario.appendChild(num_parejas);

  let dificultad = document.createElement("select");
  dificultad.className = "dificultad";
  ["Fácil", "Medio", "Difícil"].forEach((opcion) => {
    let option = document.createElement("option");
    option.value = opcion.toLowerCase();
    option.textContent = opcion;
    dificultad.appendChild(option);
  });
  formulario.appendChild(dificultad);

  let jugar = document.createElement("button");
  jugar.textContent = "Jugar a Memoria";
  jugar.className = "btn-jugar";
  jugar.addEventListener("click", async () => {
    const DOM = document.querySelector("#root");
    DOM.innerHTML = "";

    const carga = pantalla_carga();
    DOM.appendChild(carga.element);

    await carga.promise;

    DOM.innerHTML = "";
    // Obtener valores del formulario
    const parejas = parseInt(num_parejas.value) || 8;
    const nivelDificultad = dificultad.value;
    DOM.appendChild(juegoMemoria(parejas, nivelDificultad));
  });

  formulario.appendChild(jugar);

  return formulario;
}
