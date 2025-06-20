function perfil() {
  let perfil = document.createElement("div");
  perfil.className = "perfil";

  // Estructura del perfil
  let user = document.createElement("div");
  user.className = "user";
  perfil.appendChild(user);

  // Sección de datos del usuario
  let datos = document.createElement("div");
  datos.className = "datos";
  user.appendChild(datos);

  let datos_user = document.createElement("div");
  datos_user.className = "datos_user";
  datos.appendChild(datos_user);

  let estados_iconos = document.createElement("div");
  estados_iconos.className = "estados_iconos";
  datos_user.appendChild(estados_iconos);

  let tag = document.createElement("div");
  tag.className = "tag";
  estados_iconos.appendChild(tag);

  let icono_1 = document.createElement("div");
  icono_1.className = "icono_1";
  estados_iconos.appendChild(icono_1);

  let icono_2 = document.createElement("div");
  icono_2.className = "icono_2";
  estados_iconos.appendChild(icono_2);

  let datos_personales = document.createElement("div");
  datos_personales.className = "datos_personales";
  datos_user.appendChild(datos_personales);

  let nombre = document.createElement("h1");
  nombre.className = "nombre";
  nombre.textContent = "Nombre de Usuario";
  datos_personales.appendChild(nombre);

  let descripcion = document.createElement("h2");
  descripcion.className = "descripcion";
  descripcion.textContent = "Descripción del usuario";
  datos_personales.appendChild(descripcion);

  let followers = document.createElement("h3");
  followers.className = "followers";
  followers.textContent = "Seguidores: 0";
  datos_user.appendChild(followers);

  let img_perfil = document.createElement("div");
  img_perfil.className = "img_perfil";
  datos.appendChild(img_perfil);

  let img_perfil_img = document.createElement("img");
  img_perfil_img.className = "img_perfil_img";
  img_perfil_img.src =
    "https://cdn.shopify.com/s/files/1/0607/2306/9147/files/catnap.png";
  img_perfil_img.alt = "Imagen de perfil";
  img_perfil.appendChild(img_perfil_img);

  // Sección de estados del usuario
  let texto_partidas = document.createElement("div");
  texto_partidas.className = "texto_partidas";
  texto_partidas.textContent = "Partidas";
  user.appendChild(texto_partidas);

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

  // Sección de logros
  let logros = document.createElement("div");
  logros.className = "logros";
  perfil.appendChild(logros);

  let logros_obtenidos = document.createElement("div");
  logros_obtenidos.className = "logros_obtenidos";
  logros.appendChild(logros_obtenidos);

  let estadisticas_titulo = document.createElement("h1");
  estadisticas_titulo.className = "estadisticas_titulo";
  estadisticas_titulo.textContent = "Estadísticas";
  logros.appendChild(estadisticas_titulo);

  let estadisticas = document.createElement("div");
  estadisticas.className = "estadisticas";
  logros.appendChild(estadisticas);

  return perfil;
}

export { perfil };
