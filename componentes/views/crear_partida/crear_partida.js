import { cargarFormularioPreguntas } from "../formulario/formularioPreguntasView.js";
import { cargarFormularioMemoria } from "../formulario/formularioMemoriaView.js";
/* import { cargarFormularioAhorcado } from "../formulario/formularioAhorcadoView.js";
import { cargarFormularioReciclaje } from "../formulario/formularioReciclajeView.js"; */

function crear_partida() {
  let crear_partida = document.createElement("div");
  crear_partida.className = "crear_partida";

  // Contenedor principal del carrusel
  let carruselContainer = document.createElement("div");
  carruselContainer.className = "carrusel-container";
  crear_partida.appendChild(carruselContainer);

  // Flecha izquierda
  let flechaIzquierda = document.createElement("div");
  flechaIzquierda.className = "flecha flecha-izquierda";
  flechaIzquierda.innerHTML = "&larr;";
  carruselContainer.appendChild(flechaIzquierda);

  // Contenedor de juegos
  let juegos = document.createElement("div");
  juegos.className = "juegos";
  carruselContainer.appendChild(juegos);

  // Flecha derecha
  let flechaDerecha = document.createElement("div");
  flechaDerecha.className = "flecha flecha-derecha";
  flechaDerecha.innerHTML = "&rarr;";
  carruselContainer.appendChild(flechaDerecha);

  // Array con todos los juegos disponibles
  const todosLosJuegos = [
    crearJuegoMemoria(),
    crearJuegoPreguntas(),
    crearJuegoAhorcado(),
    crearJuegoReciclaje(),
    // Espacio para agregar más juegos después:
    // crearJuego5(),
    // crearJuego6(),
    // etc...
  ];

  // Índice actual del carrusel
  let currentIndex = 0;

  // Función para mostrar los juegos visibles
  function mostrarJuegos() {
    juegos.innerHTML = "";

    // Mostrar solo 3 juegos a la vez
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % todosLosJuegos.length;
      if (todosLosJuegos[index]) {
        juegos.appendChild(todosLosJuegos[index]);
      }
    }
  }

  // Event listeners para las flechas
  flechaIzquierda.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + todosLosJuegos.length) % todosLosJuegos.length;
    mostrarJuegos();
  });

  flechaDerecha.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % todosLosJuegos.length;
    mostrarJuegos();
  });

  // Mostrar los primeros juegos al inicio
  mostrarJuegos();

  return crear_partida;
}

// Función para crear el juego de memoria
function crearJuegoMemoria() {
  let juego_memoria = document.createElement("div");
  juego_memoria.className = "juego_memoria";

  let imagen_memorias = document.createElement("div");
  imagen_memorias.className = "imagen_preguntas";

  let img_memorias = document.createElement("img");
  img_memorias.src =
    "https://i.pinimg.com/736x/e5/47/f1/e547f15649f1d97a24103e84e9f2dd0e.jpg";

  imagen_memorias.appendChild(img_memorias);
  juego_memoria.appendChild(imagen_memorias);

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

  return juego_memoria;
}

// Función para crear el juego de preguntas
function crearJuegoPreguntas() {
  let juego_preguntas = document.createElement("div");
  juego_preguntas.className = "juego_preguntas";

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

  return juego_preguntas;
}

// Función para crear el juego del ahorcado
function crearJuegoAhorcado() {
  let juego_ahorcado = document.createElement("div");
  juego_ahorcado.className = "juego_ahorcado";

  let imagen_ahorcado = document.createElement("div");
  imagen_ahorcado.className = "imagen_preguntas";

  let imgAhorcado = document.createElement("img");
  imgAhorcado.src = "https://example.com/ruta/a/imagen/ahorcado.jpg"; // Cambia esta URL

  imagen_ahorcado.appendChild(imgAhorcado);
  juego_ahorcado.appendChild(imagen_ahorcado);

  let btn_jugar_a = document.createElement("button");
  btn_jugar_a.textContent = "Play";
  btn_jugar_a.addEventListener("click", (e) => {
    e.preventDefault();
    const mainContent = document.querySelector(".contenido-principal");
    if (mainContent) {
      mainContent.innerHTML = "";
      mainContent.appendChild(cargarFormularioAhorcado());
    }
  });
  juego_ahorcado.appendChild(btn_jugar_a);

  return juego_ahorcado;
}

// Función para crear el juego de reciclaje
function crearJuegoReciclaje() {
  let juego_reciclaje = document.createElement("div");
  juego_reciclaje.className = "juego_reciclaje";

  let imagen_reciclaje = document.createElement("div");
  imagen_reciclaje.className = "imagen_preguntas";

  let imgReciclaje = document.createElement("img");
  imgReciclaje.src = "https://example.com/ruta/a/imagen/reciclaje.jpg"; // Cambia esta URL

  imagen_reciclaje.appendChild(imgReciclaje);
  juego_reciclaje.appendChild(imagen_reciclaje);

  let btn_jugar_r = document.createElement("button");
  btn_jugar_r.textContent = "Play";
  btn_jugar_r.addEventListener("click", (e) => {
    e.preventDefault();
    const mainContent = document.querySelector(".contenido-principal");
    if (mainContent) {
      mainContent.innerHTML = "";
      mainContent.appendChild(cargarFormularioReciclaje());
    }
  });
  juego_reciclaje.appendChild(btn_jugar_r);

  return juego_reciclaje;
}

export { crear_partida };
