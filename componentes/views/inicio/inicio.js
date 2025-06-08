import { cargarFormulario } from "../formulario/formularioView.js";

function inicio() {
  let inicio = document.createElement("section");
  inicio.className = "inicio";

  let img = document.createElement("div");
  img.className = "img";
  img.innerHTML = `<img src="../assets/love3.png" alt="">`;
  inicio.appendChild(img);

  let info = document.createElement("div");
  info.className = "info";
  info.textContent = "WELCOME TO THE PUZZLEZ PLAYGROUD";
  inicio.appendChild(info);

  let juegos = document.createElement("div");
  juegos.className = "juegos";
  inicio.appendChild(juegos);

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
      mainContent.appendChild(cargarFormulario());
    }
  });
  juego_memoria.appendChild(btn_jugar_m);

  // Juego Preguntas
  let juego_preguntas = document.createElement("div");
  juego_preguntas.className = "juego_preguntas";
  juegos.appendChild(juego_preguntas);

  let btn_jugar_p = document.createElement("button");
  btn_jugar_p.textContent = "Play";
  juego_preguntas.appendChild(btn_jugar_p);

  // Juego Libre
  let juego_libre = document.createElement("div");
  juego_libre.className = "juego_libre";
  juegos.appendChild(juego_libre);

  let btn_jugar_l = document.createElement("button");
  btn_jugar_l.textContent = "Play";
  juego_libre.appendChild(btn_jugar_l);

  return inicio;
}

export { inicio };
