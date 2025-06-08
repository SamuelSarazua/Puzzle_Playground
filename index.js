import { inicio } from "./componentes/views/inicio/inicio.js";
import { header } from "./componentes/views/inicio/header.js";
import { footer } from "./componentes/views/inicio/footer.js";
import { Login } from "./componentes/views/login/loginView.js";
import { perfil } from "./componentes/views/perfil/perfil.js";
import { jugar_amigos } from "./componentes/views/amigos/amigos.js";
import { crear_partida } from "./componentes/views/crear_partida/crear_partida.js";

// Elementos globales
const DOM = document.querySelector("#root");
const mainContent = document.createElement("main");
mainContent.className = "contenido-principal";

// Verificar el estado de sesión al cargar la aplicación
const checkAuth = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

function cargarContenidoPrincipal() {
  DOM.innerHTML = "";
  DOM.className = "dom";

  // Cargar estructura básica
  DOM.appendChild(header());
  mainContent.innerHTML = "";
  mainContent.appendChild(inicio());
  DOM.appendChild(mainContent);
  DOM.appendChild(footer());
}

function mostrarInicio() {
  mainContent.innerHTML = "";
  mainContent.appendChild(inicio());
}

function mostrarPerfil() {
  mainContent.innerHTML = "";
  mainContent.appendChild(perfil());
}

function mostrarJugarAmigos() {
  mainContent.innerHTML = "";
  mainContent.appendChild(jugar_amigos());
}

function mostrarCrearPartida() {
  mainContent.innerHTML = "";
  mainContent.appendChild(crear_partida());
}

function cargarLogin() {
  DOM.innerHTML = "";
  DOM.className = "dom";
  DOM.appendChild(Login());
}

// Función principal de inicialización
function initApp() {
  if (checkAuth()) {
    cargarContenidoPrincipal();
  } else {
    cargarLogin();
  }
}

// Función para cerrar sesión
function cerrarSesion() {
  localStorage.removeItem("isLoggedIn");
  cargarLogin();
}

// Inicializar la aplicación
initApp();

export {
  cargarContenidoPrincipal,
  cerrarSesion,
  mostrarInicio,
  mostrarPerfil,
  mostrarJugarAmigos,
  mostrarCrearPartida,
};
