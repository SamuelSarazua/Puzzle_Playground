import { Login } from "../login/loginView.js";
import { cargarContenidoPrincipal } from "../../../index.js";

async function registrarUsuario(nombreCompleto, correo, contraseña) {
  try {
    const response = await fetch(
      "https://backend-game-mnte.onrender.com/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombreCompleto,
          correo,
          contraseña,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error en el registro");
    }

    // Auto-login después del registro exitoso
    const loginResponse = await fetch(
      "https://backend-game-mnte.onrender.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: correo, // Puede ser email o nombre
          contraseña: contraseña,
        }),
      }
    );

    const loginData = await loginResponse.json();

    if (!loginResponse.ok) {
      throw new Error(
        loginData.message || "Error en auto-login después de registro"
      );
    }

    // Guardar datos de sesión compatibles con tu index.js
    localStorage.setItem("authToken", loginData.token);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem(
      "userData",
      JSON.stringify({
        id: loginData.id_usuario,
        nombre: loginData.nombre,
        correo: loginData.correo,
        puntos: loginData.puntos || 0,
      })
    );

    return loginData;
  } catch (error) {
    console.error("Error en registro:", error);
    throw error;
  }
}

function cargarSignup() {
  let signup = document.createElement("section");
  signup.className = "signup";

  let image1_signup = document.createElement("div");
  image1_signup.className = "image1_signup";
  signup.appendChild(image1_signup);

  let img1_signup = document.createElement("img");
  img1_signup.src = "../../componentes/assets/treen.png";
  image1_signup.appendChild(img1_signup);

  /*   let image2_signup = document.createElement("div");
  image2_signup.className = "image2_signup";
  signup.appendChild(image2_signup);

  let img2_signup = document.createElement("img");
  img2_signup.src = "../../componentes/assets/toro.png";
  image2_signup.appendChild(img2_signup); */

  // Logo
  const logoDiv = document.createElement("div");
  const logoImg = document.createElement("img");
  logoImg.src = "../../componentes/assets/logo_oficial.png";
  logoImg.alt = "";
  logoDiv.appendChild(logoImg);

  const logoContainer = document.createElement("div");
  logoContainer.className = "logo-signup";
  logoContainer.appendChild(logoDiv);

  // Formulario
  const formTitle = document.createElement("h1");
  formTitle.textContent = "Create new account";

  const loginLinkText = document.createElement("p");
  const loginLink = document.createElement("a");
  loginLink.href = "#";
  loginLink.textContent = "Iniciar Sesión";
  loginLinkText.appendChild(document.createTextNode("¿Ya tienes una cuenta? "));
  loginLinkText.appendChild(loginLink);

  const volverLogin = document.createElement("div");
  volverLogin.className = "volver-login";
  volverLogin.appendChild(loginLinkText);

  // Campos del formulario
  const nombreInput = document.createElement("input");
  nombreInput.type = "text";
  nombreInput.id = "nombre";
  nombreInput.placeholder = "Nombre";
  nombreInput.required = true;

  const apellidoInput = document.createElement("input");
  apellidoInput.type = "text";
  apellidoInput.id = "apellido";
  apellidoInput.placeholder = "Apellido";
  apellidoInput.required = true;

  const contNP = document.createElement("div");
  contNP.className = "cont_n_p";
  contNP.appendChild(nombreInput);
  contNP.appendChild(apellidoInput);

  const correoInput = document.createElement("input");
  correoInput.type = "email";
  correoInput.id = "correo";
  correoInput.placeholder = "Correo electrónico";
  correoInput.required = true;

  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.id = "contraseña";
  passwordInput.placeholder = "Contraseña";
  passwordInput.required = true;

  // Mensaje de error
  const errorMessage = document.createElement("div");
  errorMessage.className = "error-message";
  errorMessage.style.color = "red";
  errorMessage.style.marginTop = "10px";
  errorMessage.style.display = "none";

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Registrarse";

  // Construir formulario
  const formSignup = document.createElement("form");
  formSignup.className = "form-signup";
  formSignup.appendChild(formTitle);
  formSignup.appendChild(volverLogin);
  formSignup.appendChild(contNP);
  formSignup.appendChild(correoInput);
  formSignup.appendChild(passwordInput);
  formSignup.appendChild(errorMessage);
  formSignup.appendChild(submitButton);

  // Agregar todo al contenedor principal
  signup.appendChild(logoContainer);
  signup.appendChild(formSignup);

  // Manejador de envío de formulario
  formSignup.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nombre = nombreInput.value.trim();
    const apellido = apellidoInput.value.trim();
    const correo = correoInput.value.trim();
    const contraseña = passwordInput.value;

    // Validación básica
    if (!nombre || !apellido || !correo || !contraseña) {
      errorMessage.textContent = "Por favor completa todos los campos";
      errorMessage.style.display = "block";
      return;
    }

    if (contraseña.length < 6) {
      errorMessage.textContent =
        "La contraseña debe tener al menos 6 caracteres";
      errorMessage.style.display = "block";
      return;
    }

    try {
      submitButton.disabled = true;
      submitButton.textContent = "Registrando...";
      errorMessage.style.display = "none";

      await registrarUsuario(`${nombre} ${apellido}`, correo, contraseña);

      // Usamos tu función exportada de index.js para redirigir
      cargarContenidoPrincipal();
    } catch (error) {
      errorMessage.textContent =
        error.message || "Error en el registro. Intenta nuevamente.";
      errorMessage.style.display = "block";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Registrarse";
    }
  });

  // Manejador para volver a login
  loginLink.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector("#root").innerHTML = "";
    document.querySelector("#root").appendChild(Login());
  });

  return signup;
}

export { cargarSignup };
