import { mostrarCrearPartida } from "../../../index.js";
function inicio() {
  let inicio = document.createElement("section");
  inicio.className = "inicio";

  let img_inicio = document.createElement("div");
  img_inicio.className = "img_inicio";
  inicio.appendChild(img_inicio);

  let img = document.createElement("img");
  img.src = "../../componentes/assets/image_inicio.png";
  img_inicio.appendChild(img);

  let contenido_inicio = document.createElement("div");
  contenido_inicio.className = "contenido_inicio";
  inicio.appendChild(contenido_inicio);

  let titulo_inicio = document.createElement("h1");
  titulo_inicio.textContent = "Welcome Players";
  titulo_inicio.className = "titulo_inicio";
  contenido_inicio.appendChild(titulo_inicio);

  let texto_inicio = document.createElement("p");
  texto_inicio.textContent = "welcome to Puzzle Playground.";
  texto_inicio.className = "texto_inicio";
  contenido_inicio.appendChild(texto_inicio);

  let play_video = document.createElement("div");
  play_video.className = "play_video";

  // Crear el ícono Play (SVG)
  let playIcon1 = document.createElement("span");
  playIcon1.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
`;

  // Insertar el ícono dentro del div
  play_video.appendChild(playIcon1);

  // Agregar el div al contenedor
  contenido_inicio.appendChild(play_video);

  let cont_lenguajes = document.createElement("div");
  cont_lenguajes.className = "cont_lenguajes";
  inicio.appendChild(cont_lenguajes);

  let html = document.createElement("div");
  html.className = "html";
  cont_lenguajes.appendChild(html);

  let htmlLogo = document.createElement("div");
  htmlLogo.className = "html-logo";
  html.appendChild(htmlLogo);

  let html_img = document.createElement("img");
  html_img.src =
    "https://cdn.iconscout.com/icon/free/png-256/free-html-5-logo-icon-download-in-svg-png-gif-file-formats--programming-langugae-language-pack-logos-icons-1175208.png?f=webp&w=256";
  htmlLogo.appendChild(html_img);

  let htmltexto = document.createElement("p");
  htmltexto.textContent = "HTML";
  html.appendChild(htmltexto);

  let node = document.createElement("div");
  node.className = "node";
  cont_lenguajes.appendChild(node);

  let nodeLogo = document.createElement("div");
  nodeLogo.className = "node-logo";
  node.appendChild(nodeLogo);

  let node_img = document.createElement("img");
  node_img.src = "https://img.icons8.com/fluent/512/node-js.png";
  nodeLogo.appendChild(node_img);

  let nodetexto = document.createElement("p");
  nodetexto.textContent = "Node.js";
  node.appendChild(nodetexto);

  let play_games = document.createElement("button");
  play_games.className = "play_games";
  play_games.addEventListener("click", function () {
    mostrarCrearPartida();
  });

  let playIcon = document.createElement("span");
  playIcon.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
`;

  play_games.appendChild(playIcon);
  cont_lenguajes.appendChild(play_games);

  let css = document.createElement("div");
  css.className = "css";
  cont_lenguajes.appendChild(css);

  let cssLogo = document.createElement("div");
  cssLogo.className = "css-logo";
  css.appendChild(cssLogo);

  let css_img = document.createElement("img");
  css_img.src =
    "https://cdn4.iconfinder.com/data/icons/iconsimple-programming/512/css-512.png";
  cssLogo.appendChild(css_img);

  let csstexto = document.createElement("p");
  csstexto.textContent = "CSS";
  css.appendChild(csstexto);

  let js = document.createElement("div");
  js.className = "js";
  cont_lenguajes.appendChild(js);

  let jsLogo = document.createElement("div");
  jsLogo.className = "js-logo";
  js.appendChild(jsLogo);

  let js_img = document.createElement("img");
  js_img.src =
    "https://static.vecteezy.com/system/resources/previews/027/127/560/non_2x/javascript-logo-javascript-icon-transparent-free-png.png";
  jsLogo.appendChild(js_img);

  let jstexto = document.createElement("p");
  jstexto.textContent = "JavaScript";
  js.appendChild(jstexto);

  return inicio;
}

export { inicio };
