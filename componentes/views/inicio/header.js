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

  let contenedor_menu = document.createElement("div");
  contenedor_menu.className = "contenedor_menu";
  header.appendChild(contenedor_menu);

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
  contenedor_menu.appendChild(btn_menu);

  let logo_game = document.createElement("div");
  logo_game.className = "logo";
  contenedor_menu.appendChild(logo_game);

  let logo_img = document.createElement("img");
  logo_img.src = "../../assets/logo.png";
  logo_game.appendChild(logo_img);

  let logos_icon = document.createElement("div");
  logos_icon.className = "logos_icon";
  header.appendChild(logos_icon);

  let logo_icon1 = document.createElement("div");
  logo_icon1.className = "logo_icon1";
  logos_icon.appendChild(logo_icon1);

  let icon1_img = document.createElement("img");
  icon1_img.src = "https://cdn-icons-png.flaticon.com/512/25/25231.png";
  icon1_img.alt = "Icono del juego";
  logo_icon1.appendChild(icon1_img);

  let logo_icon2 = document.createElement("div");
  logo_icon2.className = "logo_icon2";
  logos_icon.appendChild(logo_icon2);

  let icon2_img = document.createElement("img");
  icon2_img.src =
    "https://images.icon-icons.com/2429/PNG/512/figma_logo_icon_147289.png";
  icon2_img.alt = "Icono del juego";
  logo_icon2.appendChild(icon2_img);

  let logo_icon3 = document.createElement("div");
  logo_icon3.className = "logo_icon3";
  logos_icon.appendChild(logo_icon3);

  let icon3_img = document.createElement("img");
  icon3_img.src =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png";
  icon3_img.alt = "Icono del juego";
  logo_icon3.appendChild(icon3_img);

  let btn_menu_icon = document.createElement("button");
  btn_menu_icon.className = "btn_menu_icon";
  btn_menu_icon.textContent = "user";
  logos_icon.appendChild(btn_menu_icon);

  btn_menu.addEventListener("click", function () {
    menu_lateral.classList.toggle("hidden");
  });

  return header;
}

export { header };
