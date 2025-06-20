import { pantalla_carga } from "../carga/cargaView.js";
import { juego } from "../preguntasView/preguntasView.js";

async function verificarCodigoPartida(codigo) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/partidas/validar/${codigo}`
    );

    if (!response.ok) {
      throw new Error("Error al validar partida");
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Código inválido");
    }

    return data.partida;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

function jugar_amigos() {
  let juega_amigos = document.createElement("div");
  juega_amigos.className = "juega_amigos";

  // Crear contenedor de partidas públicas
  let partidas_publicas = document.createElement("div");
  partidas_publicas.className = "partidas_publicas";

  let titulo_partidas_publicas = document.createElement("h2");
  titulo_partidas_publicas.textContent = "Partidas Públicas";
  partidas_publicas.appendChild(titulo_partidas_publicas);

  let contenedor_partidas_publicas = document.createElement("div");
  contenedor_partidas_publicas.className = "contenedor_partidas_publicas";
  partidas_publicas.appendChild(contenedor_partidas_publicas);

  juega_amigos.appendChild(partidas_publicas);

  // Crear contenedor de partidas privadas
  let partidas_privadas = document.createElement("div");
  partidas_privadas.className = "partidas_privadas";

  let titulo_partidas_privadas = document.createElement("h2");
  titulo_partidas_privadas.textContent = "Partidas Privadas";
  partidas_privadas.appendChild(titulo_partidas_privadas);

  let ingresar_partida_privada = document.createElement("input");
  ingresar_partida_privada.className = "ingresar_partida_p";
  ingresar_partida_privada.placeholder = "Ingresa tu código";
  partidas_privadas.appendChild(ingresar_partida_privada);

  let boton_ir = document.createElement("button");
  boton_ir.className = "boton_ir";
  boton_ir.textContent = "ir";

  boton_ir.addEventListener("click", async () => {
    const codigo = ingresar_partida_privada.value.trim();

    if (!codigo) {
      alert("Por favor ingresa un código de partida");
      return;
    }

    const mainContent = document.querySelector(".contenido-principal");
    mainContent.innerHTML = "";

    // Mostrar pantalla de carga
    const carga = pantalla_carga();
    carga.element.querySelector(
      ".numero_jugadores"
    ).textContent = `Validando código: ${codigo}`;
    mainContent.appendChild(carga.element);

    try {
      // Validar código con el backend
      const response = await fetch(
        `http://localhost:3000/api/partidas/validar/${codigo}`
      );

      if (!response.ok) {
        throw new Error("Error al validar partida");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Código inválido");
      }

      const partida = data.partida;

      // Actualizar mensaje de carga
      carga.element.querySelector(
        ".numero_jugadores"
      ).textContent = `Uniéndose a: ${partida.nombre}\nJugadores: ${partida.jugadores}\nNivel: ${partida.nivel}`;

      // Esperar tiempo restante de carga
      await carga.promise;

      // Redirigir al juego con el nivel de la partida
      mainContent.innerHTML = "";
      mainContent.appendChild(juego(parseInt(partida.nivel)));
    } catch (error) {
      console.error("Error al unirse a partida:", error);
      mainContent.innerHTML = `<div class="error">Error: ${error.message}</div>`;

      // Volver a mostrar el formulario después de 3 segundos
      setTimeout(() => {
        mainContent.innerHTML = "";
        mainContent.appendChild(jugar_amigos());
      }, 3000);
    }
  });

  partidas_privadas.appendChild(boton_ir);
  juega_amigos.appendChild(partidas_privadas);

  return juega_amigos;
}

export { jugar_amigos };
