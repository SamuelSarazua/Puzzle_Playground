import { pantalla_carga } from "../carga/cargaView.js";

export function cargarFormularioLibre() {
  let formulario = document.createElement("div");
  formulario.className = "formulario-libre";

  // Campos específicos para juego libre
  let nombre = document.createElement("input");
  nombre.className = "nombre";
  nombre.placeholder = "Nombre del juego libre";
  formulario.appendChild(nombre);

  let descripcion = document.createElement("textarea");
  descripcion.placeholder = "Descripción del juego";
  descripcion.className = "descripcion";
  formulario.appendChild(descripcion);

  let jugar = document.createElement("button");
  jugar.textContent = "Crear Juego Libre";
  jugar.className = "btn-jugar";
  jugar.addEventListener("click", async () => {
    const DOM = document.querySelector("#root");
    DOM.innerHTML = "";

    const carga = pantalla_carga();
    DOM.appendChild(carga.element);

    await carga.promise;

    DOM.innerHTML = "";
    // Aquí iría la lógica para cargar el juego libre
    DOM.appendChild(crearJuegoLibre());
  });

  formulario.appendChild(jugar);

  return formulario;
}

function crearJuegoLibre() {
  // Implementación del juego libre
  const container = document.createElement("div");
  container.textContent = "Juego Libre Personalizado";
  return container;
}
