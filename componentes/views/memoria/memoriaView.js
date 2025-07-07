function juegoMemoria() {
  let DOM = document.createElement("div");
  DOM.className = "memoria-dom";

  // Crear pantalla de bienvenida
  let pantallaInicio = document.createElement("div");
  pantallaInicio.className = "memoria-pantalla-inicio";

  let titulo = document.createElement("h1");
  titulo.textContent = "Puzzle Playground";

  let descripcion = document.createElement("p");
  descripcion.textContent = "¡Pon a prueba tu memoria!";

  let botonIniciar = document.createElement("button");
  botonIniciar.id = "memoria-btn-iniciar";
  botonIniciar.textContent = "Comenzar";

  // Agregar hijos a pantallaInicio
  pantallaInicio.appendChild(titulo);
  pantallaInicio.appendChild(descripcion);
  pantallaInicio.appendChild(botonIniciar);

  // Agregar pantallaInicio al DOM
  DOM.appendChild(pantallaInicio);

  // Cuando clickeen "Comenzar"
  botonIniciar.onclick = () => {
    pantallaInicio.remove();
    iniciarJuego(DOM);
  };

  return DOM;
}

let vidasRestantes = 5; // Vidas globales, inicializadas a 5

function actualizarVidas(header) {
  // Primero elimina vidas actuales
  const vidasActuales = header.querySelectorAll(".memoria-vida");
  vidasActuales.forEach((img) => img.remove());

  // Total corazones (fijos a 5)
  const totalVidas = 5;

  for (let i = 0; i < totalVidas; i++) {
    let vida = document.createElement("img");
    vida.className = "memoria-vida";

    if (i < vidasRestantes) {
      // Corazón lleno (color)
      vida.src = "./img/img.png";
    } else {
      // Corazón vacío (gris)
      vida.src =
        "https://img.freepik.com/vector-premium/icono-corazon-pixelado-vacio-vacio-vacio-ausencia-amor-soledad-anhelo-emociones-vacias-simbolo-digital-pixel-art-retro-nostalgia-icono-linea-vectorial-negocios-publicidad_855332-1962.jpg";
      vida.style.opacity = "0.5"; // opcional para hacerlo más tenue
    }

    header.appendChild(vida);
  }
}

function iniciarJuego(DOM) {
  DOM.innerHTML = "";

  let header = document.createElement("div");
  header.className = "memoria-header";
  DOM.appendChild(header);

  let titulo = document.createElement("h1");
  titulo.textContent = "Puzzle Playground";
  titulo.className = "memoria-titulo-header";
  header.appendChild(titulo);

  actualizarVidas(header);

  let cronometro = document.createElement("div");
  cronometro.className = "memoria-cronometro";
  cronometro.textContent = "Tiempo: 00";
  header.appendChild(cronometro);

  let tablero = document.createElement("div");
  tablero.className = "memoria-tablero";
  DOM.appendChild(tablero);

  let nivelActual = 1;

  const botonNivel = document.createElement("button");
  botonNivel.className = "memoria-boton-nivel";
  botonNivel.textContent = `Nivel ${nivelActual + 1}`;

  // INICIALMENTE DESHABILITADO
  botonNivel.disabled = true;
  botonNivel.style.opacity = "0.6";
  botonNivel.style.cursor = "default";

  DOM.appendChild(botonNivel);

  generarNivel(nivelActual, tablero, header, botonNivel);

  // NO asignar onclick aquí, se asignará cuando se complete el nivel
}

function crearCarta(valor) {
  let carta = document.createElement("div");
  carta.className = "memoria-carta";
  carta.dataset.valor = valor; // guardamos el valor para comparar pares

  let front = document.createElement("div");
  front.className = "memoria-front";

  let back = document.createElement("div");
  back.className = "memoria-back";
  back.textContent = valor; // Emoji aquí

  carta.appendChild(front);
  carta.appendChild(back);

  return carta;
}

function mezclarArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generarNivel(nivel, tablero, header, botonNivel) {
  if (nivel > 9) return;

  tablero.innerHTML = "";

  const cantidadCartas = 4 + (nivel - 1) * 2;

  let tiempo = 8 + nivel * 2 + Math.floor(cantidadCartas / 2);
  iniciarCronometro(tiempo, () => {
    alert("⏰ ¡Se acabó el tiempo!");

    vidasRestantes--; // Restar una vida

    // Opcional: reiniciar el nivel o volver al nivel 1
    actualizarVidas(header);

    if (vidasRestantes > 0) {
      generarNivel(nivel, tablero, header, botonNivel); // Reinicia mismo nivel
    } else {
      alert("💔 ¡Game Over!");
      location.reload(); // recarga la página para reiniciar el juego
    }
  });

  const columnas = Math.ceil(Math.sqrt(cantidadCartas));
  tablero.style.gridTemplateColumns = `repeat(${columnas}, auto)`;

  // Array de emojis para los pares (puedes poner imágenes o lo que prefieras)
  const emojis = ["🐱", "🐶", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮"];

  // Tomamos la cantidad necesaria de pares (cantidadCartas / 2)
  let valores = emojis.slice(0, cantidadCartas / 2);

  // Creamos un array con dos de cada valor
  let cartasValores = valores.concat(valores);

  // Mezclamos
  mezclarArray(cartasValores);

  // Variables para control de juego
  let cartasVolteadas = [];
  let paresEncontrados = 0;

  cartasValores.forEach((valor) => {
    const carta = crearCarta(valor);

    carta.addEventListener("click", () => {
      if (
        carta.classList.contains("memoria-volteada") ||
        cartasVolteadas.length === 2 ||
        carta.classList.contains("memoria-encontrada")
      )
        return;

      carta.classList.add("memoria-volteada");
      cartasVolteadas.push(carta);

      if (cartasVolteadas.length === 2) {
        const [carta1, carta2] = cartasVolteadas;

        if (carta1.dataset.valor === carta2.dataset.valor) {
          // Par correcto
          carta1.classList.add("memoria-encontrada");
          carta2.classList.add("memoria-encontrada");

          // Opacidad para indicar encontrado
          carta1.style.opacity = "0.5";
          carta2.style.opacity = "0.5";

          paresEncontrados++;

          // Limpiar volteadas
          cartasVolteadas = [];

          // ¿Se terminaron las cartas?
          if (paresEncontrados === cantidadCartas / 2) {
            const boton = document.querySelector(".memoria-boton-nivel");
            clearInterval(temporizador); // Detener el cronómetro al ganar
            if (nivel < 9) {
              // ACTIVAR BOTÓN SOLO CUANDO TERMINE EL NIVEL
              botonNivel.disabled = false;
              botonNivel.style.opacity = "1";
              botonNivel.style.cursor = "pointer";
              botonNivel.textContent = `Nivel ${nivel + 1}`;

              botonNivel.onclick = () => {
                generarNivel(nivel + 1, tablero, header, botonNivel);
                // DESHABILITAR BOTÓN AL PASAR AL SIGUIENTE NIVEL
                botonNivel.disabled = true;
                botonNivel.style.opacity = "0.6";
                botonNivel.style.cursor = "default";
              };
            } else {
              boton.textContent = "🎉 ¡Completado!";
              boton.disabled = true;
              boton.style.opacity = "0.6";
              boton.style.cursor = "default";

              mostrarCartelFinal();
            }
          }
        } else {
          // Par incorrecto - esperar y voltear atrás
          setTimeout(() => {
            carta1.classList.remove("memoria-volteada");
            carta2.classList.remove("memoria-volteada");
            cartasVolteadas = [];
          }, 1000);
        }
      }
    });

    tablero.appendChild(carta);
  });
}

let temporizador; // Global para controlarlo

function iniciarCronometro(tiempoInicial, callbackFin) {
  clearInterval(temporizador);
  let tiempoRestante = tiempoInicial;
  const cronometro = document.querySelector(".memoria-cronometro");
  cronometro.textContent = `Tiempo: ${tiempoRestante}s`;

  temporizador = setInterval(() => {
    tiempoRestante--;
    cronometro.textContent = `Tiempo: ${tiempoRestante}s`;

    if (tiempoRestante <= 0) {
      clearInterval(temporizador);
      callbackFin(); // Ejecuta lo que pasará cuando se acabe el tiempo
    }
  }, 1000);
}

function mostrarCartelFinal() {
  const cartel = document.createElement("div");
  cartel.className = "memoria-cartel-final";
  cartel.innerHTML = `
          <h1>🎉 ¡Felicidades! 🎉</h1>
          <p>Completaste todos los niveles del juego 😺🧠</p>
      `;

  // Cuando hagan clic en el cartel, se quita
  cartel.addEventListener("click", () => {
    cartel.remove();
  });

  document.body.appendChild(cartel);
}

juegoMemoria();

export { juegoMemoria };
