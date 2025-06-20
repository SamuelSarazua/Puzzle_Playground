import { cargarSignup } from "../registro/registroView.js";
import { cargarContenidoPrincipal } from "../../../index.js";

export function verificarAutenticacion() {
  const token = localStorage.getItem("authToken");
  return token !== null && token !== undefined;
}

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
  inputPassword.id = "password";
  inputPassword.placeholder = "Contraseña";
  inputPassword.required = true;

  let botonLogin = document.createElement("button");
  botonLogin.type = "submit";
  botonLogin.textContent = "Iniciar Sesión >";
  botonLogin.className = "login-btn";

  // Mensaje de error
  let errorMessage = document.createElement("div");
  errorMessage.className = "error-message";
  errorMessage.style.color = "red";
  errorMessage.style.marginTop = "10px";
  errorMessage.style.display = "none";

  form.appendChild(inputEmail);
  form.appendChild(inputPassword);
  form.appendChild(botonLogin);
  form.appendChild(errorMessage);
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

  // Función para manejar el login
  async function manejarLogin(email, password) {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: email,
          contraseña: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en el login");
      }

      // Guardar datos de sesión compatibles con tu index.js
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: data.id_usuario,
          nombre: data.nombre,
          correo: data.correo,
          puntos: data.puntos || 0,
        })
      );

      return true;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  }

  // Manejador de submit
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = inputEmail.value;
    const password = inputPassword.value;

    try {
      botonLogin.disabled = true;
      botonLogin.textContent = "Iniciando sesión...";
      errorMessage.style.display = "none";

      const loginExitoso = await manejarLogin(email, password);

      if (loginExitoso) {
        // Usamos tu función exportada de index.js
        cargarContenidoPrincipal();
      }
    } catch (error) {
      errorMessage.textContent = error.message || "Credenciales incorrectas";
      errorMessage.style.display = "block";
    } finally {
      botonLogin.disabled = false;
      botonLogin.textContent = "Iniciar Sesión >";
    }
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
