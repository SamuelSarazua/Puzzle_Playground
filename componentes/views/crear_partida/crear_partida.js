import { cargarFormularioPreguntas } from "../formulario/formularioPreguntasView.js";
import { cargarFormularioMemoria } from "../formulario/formularioMemoriaView.js";
import { cargarFormularioLibre } from "../formulario/formularioLibreView.js";

function crear_partida() {
  let crear_partida = document.createElement("div");
  crear_partida.className = "crear_partida";

  let img = document.createElement("div");
  img.className = "img";
  crear_partida.appendChild(img);

  let imgElement = document.createElement("img");
  imgElement.src = "https://i.imgur.com/4Z5b1kH.png";
  img.appendChild(imgElement);

  let juegos = document.createElement("div");
  juegos.className = "juegos";
  crear_partida.appendChild(juegos);

  // Juego Memoria
  let juego_memoria = document.createElement("div");
  juego_memoria.className = "juego_memoria";
  juegos.appendChild(juego_memoria);

  let btn_jugar_m = document.createElement("button");
  btn_jugar_m.textContent = "Play";
  btn_jugar_m.className = "btn-play";
  btn_jugar_m.addEventListener("click", (e) => {
    e.preventDefault();
    const mainContent = document.querySelector(".contenido-principal");
    if (mainContent) {
      mainContent.innerHTML = "";
      mainContent.appendChild(cargarFormularioMemoria());
    }
  });
  juego_memoria.appendChild(btn_jugar_m);

  // Juego Preguntas
  let juego_preguntas = document.createElement("div");
  juego_preguntas.className = "juego_preguntas";
  juegos.appendChild(juego_preguntas);

  let imagen_preguntas = document.createElement("div");
  imagen_preguntas.className = "imagen_preguntas";
  let imgPreguntas = document.createElement("img");
  imgPreguntas.src =
    "https://i.pinimg.com/736x/15/3e/bf/153ebf163aa863edc7e452f121e5d62d.jpg";
  imagen_preguntas.appendChild(imgPreguntas);
  juego_preguntas.appendChild(imagen_preguntas);

  let btn_jugar_p = document.createElement("button");
  btn_jugar_p.textContent = "Play";
  btn_jugar_p.addEventListener("click", (e) => {
    e.preventDefault();
    const mainContent = document.querySelector(".contenido-principal");
    if (mainContent) {
      mainContent.innerHTML = "";
      mainContent.appendChild(cargarFormularioPreguntas());
    }
  });
  juego_preguntas.appendChild(btn_jugar_p);

  // Juego Libre
  let juego_libre = document.createElement("div");
  juego_libre.className = "juego_libre";
  juegos.appendChild(juego_libre);

  let btn_jugar_l = document.createElement("button");
  btn_jugar_l.textContent = "Play";
  btn_jugar_l.addEventListener("click", (e) => {
    e.preventDefault();
    const mainContent = document.querySelector(".contenido-principal");
    if (mainContent) {
      mainContent.innerHTML = "";
      mainContent.appendChild(cargarFormularioLibre());
    }
  });
  juego_libre.appendChild(btn_jugar_l);

  return crear_partida;
}

export { crear_partida };
