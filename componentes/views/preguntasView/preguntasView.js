import { pantalla_carga } from "../carga/cargaView.js";
import { preguntas } from "./preguntas.js"; // Asegúrate de importar tus preguntas

export function juego(nivel) {
  const container = document.createElement("div");
  container.className = "juego-container";

  // Iniciar directamente el juego con el nivel seleccionado
  iniciarJuego(nivel);

  async function iniciarJuego(nivel) {
    // Mostrar pantalla de carga primero
    const carga = pantalla_carga();
    container.innerHTML = "";
    container.appendChild(carga.element);

    // Esperar 10 segundos
    await carga.promise;

    // Continuar con el juego
    document.body.className = "juego";
    container.innerHTML = "";

    const preguntasFiltradas = preguntas.filter((p) => p.nivel === nivel);
    let indice = 0;
    let puntaje = 0;

    function mostrarPregunta() {
      if (indice >= preguntasFiltradas.length) {
        mostrarFinal(puntaje, preguntasFiltradas.length);
        return;
      }

      const actual = preguntasFiltradas[indice];
      container.innerHTML = "";

      const titulo = document.createElement("h2");
      titulo.className = "pregunta";
      titulo.textContent = `Pregunta ${indice + 1}: ${actual.texto}`;
      container.appendChild(titulo);

      const opcionesContainer = document.createElement("div");
      opcionesContainer.className = "opciones";
      container.appendChild(opcionesContainer);

      actual.opciones.forEach((opcion, i) => {
        const btn = document.createElement("button");
        btn.className = "btn-opcion";
        btn.textContent = opcion;
        btn.onclick = () => {
          const correcta = i === actual.correcta;
          btn.classList.add(correcta ? "correcta" : "incorrecta");

          if (correcta) puntaje++;

          const botones = opcionesContainer.querySelectorAll("button");
          botones.forEach((b) => (b.disabled = true));

          setTimeout(() => {
            indice++;
            mostrarPregunta();
          }, 1500);
        };
        opcionesContainer.appendChild(btn);
      });
    }

    mostrarPregunta();
  }

  function mostrarFinal(correctas, total) {
    container.innerHTML = "";

    const titulo = document.createElement("h2");
    titulo.className = "pregunta";
    titulo.textContent = "🎉 ¡Nivel terminado!";
    container.appendChild(titulo);

    const mensaje = document.createElement("div");
    mensaje.className = "mensaje-final";
    mensaje.textContent = `Obtuviste ${correctas} de ${total} preguntas correctas.`;
    container.appendChild(mensaje);

    const graficaDiv = document.createElement("div");
    graficaDiv.className = "grafica";
    const canvas = document.createElement("canvas");
    canvas.id = "graficoResultados";
    graficaDiv.appendChild(canvas);
    container.appendChild(graficaDiv);

    const incorrectas = total - correctas;
    new Chart(canvas, {
      type: "bar",
      data: {
        labels: ["Correctas", "Incorrectas"],
        datasets: [
          {
            label: "Respuestas",
            data: [correctas, incorrectas],
            backgroundColor: ["#2ecc71", "#e74c3c"],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });

    const reiniciarBtn = document.createElement("button");
    reiniciarBtn.textContent = "Volver al inicio";
    reiniciarBtn.className = "btn-opcion";
    reiniciarBtn.onclick = () => {
      // Aquí podrías redirigir a donde corresponda
      window.location.reload();
    };
    container.appendChild(reiniciarBtn);
  }

  return container;
}
