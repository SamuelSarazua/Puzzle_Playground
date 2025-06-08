import { cargarSignup } from "../registro/registroView.js";
import { cargarContenidoPrincipal } from "../../../index.js";
function Login() {
  let login = document.createElement("section");
  login.className = "login";

  // Logo
  const logoDiv = document.createElement("div");
  const logoImg = document.createElement("img");
  logoImg.src = "";
  logoImg.alt = "Logo";
  logoDiv.appendChild(logoImg);

  const logoLogin = document.createElement("div");
  logoLogin.className = "logo-login";
  logoLogin.appendChild(logoDiv);
  login.appendChild(logoLogin);

  // Formulario
  let form = document.createElement("form");
  form.className = "form";

  let inputEmail = document.createElement("input");
  inputEmail.type = "email";
  inputEmail.id = "email";
  inputEmail.placeholder = "Correo electrónico";
  inputEmail.required = true;

  let inputPassword = document.createElement("input");
  inputPassword.type = "password";
  inputPassword.id = "contraseña";
  inputPassword.placeholder = "Contraseña";
  inputPassword.required = true;

  let botonLogin = document.createElement("button");
  botonLogin.type = "submit";
  botonLogin.textContent = "Iniciar Sesión >";
  botonLogin.className = "login-btn";

  form.appendChild(inputEmail);
  form.appendChild(inputPassword);
  form.appendChild(botonLogin);
  login.appendChild(form);

  // Enlace Sign Up
  const signupText = document.createElement("p");
  const signupLink = document.createElement("a");
  signupLink.href = "#";
  signupLink.textContent = "Sign Up";
  signupText.appendChild(document.createTextNode("¿No tienes cuenta? "));
  signupText.appendChild(signupLink);

  const crearCuenta = document.createElement("div");
  crearCuenta.className = "crear";
  crearCuenta.appendChild(signupText);
  login.appendChild(crearCuenta);

  // Manejador de login (sin backend)
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Inicio de sesión exitoso");

    // Guardar estado de sesión
    localStorage.setItem("isLoggedIn", "true");

    // Forzar recarga para limpiar cualquier estado anterior
    window.location.reload();
  });

  // Manejador Sign Up
  signupLink.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector("#root").innerHTML = "";
    document.querySelector("#root").appendChild(cargarSignup());
  });

  return login;
}

export { Login };
