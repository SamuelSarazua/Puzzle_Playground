import {
  cerrarSesion,
  mostrarInicio,
  mostrarPerfil,
  mostrarJugarAmigos,
  mostrarCrearPartida,
} from "../../../index.js";

function header() {
  let header = document.createElement("header");
  header.className = "header";

  let menu_lateral = document.createElement("div");
  menu_lateral.className = "menu_lateral hidden";
  header.appendChild(menu_lateral);

  let home = document.createElement("button");
  home.textContent = "home";
  home.addEventListener("click", function () {
    mostrarInicio();
    menu_lateral.classList.add("hidden");
  });
  menu_lateral.appendChild(home);

  let juega_amigos = document.createElement("button");
  juega_amigos.textContent = "juega con amigos";
  juega_amigos.addEventListener("click", function () {
    mostrarJugarAmigos();
    menu_lateral.classList.add("hidden");
  });
  menu_lateral.appendChild(juega_amigos);

  let perfilBtn = document.createElement("button");
  perfilBtn.textContent = "perfil";
  perfilBtn.addEventListener("click", function () {
    mostrarPerfil();
    menu_lateral.classList.add("hidden");
  });
  menu_lateral.appendChild(perfilBtn);

  let crear_partidaBtn = document.createElement("button");
  crear_partidaBtn.textContent = "crear una partida";
  crear_partidaBtn.addEventListener("click", function () {
    mostrarCrearPartida();
    menu_lateral.classList.add("hidden");
  });
  menu_lateral.appendChild(crear_partidaBtn);

  let log_out = document.createElement("button");
  log_out.textContent = "cerrar sesión";
  log_out.addEventListener("click", function () {
    if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      cerrarSesion();
    }
  });
  menu_lateral.appendChild(log_out);

  let btn_menu = document.createElement("button");
  btn_menu.className = "btn_menu";
  btn_menu.textContent = "☰";
  header.appendChild(btn_menu);

  let logo_game = document.createElement("div");
  logo_game.className = "logo";
  header.appendChild(logo_game);

  btn_menu.addEventListener("click", function () {
    menu_lateral.classList.toggle("hidden");
  });

  return header;
}

export { header };
