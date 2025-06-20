function footer() {
  let footer = document.createElement("footer");
  footer.className = "footer";

  let btn_github = document.createElement("a");
  btn_github.className = "btn_github";
  btn_github.href = "https://github.com/SamuelSarazua/Puzzle_Playground";
  footer.appendChild(btn_github);

  let btn_img = document.createElement("img");
  btn_img.src = "../assets/GitHub-logo.png";
  btn_github.appendChild(btn_img);

  let colaboradores = document.createElement("div");
  colaboradores.textContent =
    "@sesarazua, @sajeronimo, @bemorales, @davillatoro";
  colaboradores.className = "colaboradores";
  footer.appendChild(colaboradores);

  return footer;
}

export { footer };
