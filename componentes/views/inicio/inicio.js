function inicio() {
  let inicio = document.createElement("section");
  inicio.className = "inicio";

  let img_inicio = document.createElement("div");
  img_inicio.className = "img_inicio";
  inicio.appendChild(img_inicio);

  let img = document.createElement("img");
  // img.src = "https://cdn.shopify.com/s/files/1/0607/2306/9147/files/catnap.png";
  img_inicio.appendChild(img);

  let contenido_inicio = document.createElement("div");
  contenido_inicio.className = "contenido_inicio";
  inicio.appendChild(contenido_inicio);

  let titulo_inicio = document.createElement("h1");
  titulo_inicio.textContent = "Puzzle Playground";
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

  let img_inicio2 = document.createElement("div");
  img_inicio2.className = "img_inicio2";
  inicio.appendChild(img_inicio2);

  let img2 = document.createElement("img");
  //img2.src =
  //  "https://cdn.shopify.com/s/files/1/0607/2306/9147/files/crafty.png";
  img_inicio2.appendChild(img2);

  let cont_lenguajes = document.createElement("div");
  cont_lenguajes.className = "cont_lenguajes";
  inicio.appendChild(cont_lenguajes);

  let html = document.createElement("div");
  html.className = "html";
  cont_lenguajes.appendChild(html);

  let htmlLogo = document.createElement("div");
  htmlLogo.className = "html-logo";
  html.appendChild(htmlLogo);

  let htmltexto = document.createElement("p");
  htmltexto.textContent = "HTML";
  html.appendChild(htmltexto);

  let node = document.createElement("div");
  node.className = "node";
  cont_lenguajes.appendChild(node);

  let nodeLogo = document.createElement("div");
  nodeLogo.className = "node-logo";
  node.appendChild(nodeLogo);

  let nodetexto = document.createElement("p");
  nodetexto.textContent = "Node.js";
  node.appendChild(nodetexto);

  let play_games = document.createElement("div");
  play_games.className = "play_games";

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

  let csstexto = document.createElement("p");
  csstexto.textContent = "CSS";
  css.appendChild(csstexto);

  let js = document.createElement("div");
  js.className = "js";
  cont_lenguajes.appendChild(js);

  let jsLogo = document.createElement("div");
  jsLogo.className = "js-logo";
  js.appendChild(jsLogo);

  let jstexto = document.createElement("p");
  jstexto.textContent = "JavaScript";
  js.appendChild(jstexto);

  return inicio;
}

export { inicio };
