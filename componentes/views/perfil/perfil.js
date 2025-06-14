function perfil() {
  let perfil = document.createElement("div");
  perfil.className = "perfil";

  let user = document.createElement("div");
  user.className = "user";
  perfil.appendChild(user);

  let datos = document.createElement("div");
  datos.className = "datos";
  user.appendChild(datos);

  let datos_user = document.createElement("div");
  datos_user.className = "datos_user";
  datos.appendChild(datos_user);

  let img_perfil = document.createElement("div");
  img_perfil.className = "img_perfil";
  datos.appendChild(img_perfil);

  let info_partidas = document.createElement("div");
  info_partidas.className = "info_partidas";
  user.appendChild(info_partidas);

  let victorias = document.createElement("h1");
  victorias.className = "victorias";
  info_partidas.appendChild(victorias);

  let derrotas = document.createElement("h1");
  derrotas.className = "derrotas";
  info_partidas.appendChild(derrotas);

  let total_partidas = document.createElement("h1");
  total_partidas.className = "total_partidas";
  info_partidas.appendChild(total_partidas);

  let logros = document.createElement("div");
  logros.className = "logros";
  perfil.appendChild(logros);

  return perfil;
}

export { perfil };
