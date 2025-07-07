export function pantalla_carga() {
  let pantalla_carga = document.createElement("div");
  pantalla_carga.className = "pantalla_carga";

  let cargando = document.createElement("div");
  cargando.className = "cargando";
  cargando.textContent = "Cargando...";
  pantalla_carga.appendChild(cargando);

  let infoJuego = document.createElement("div");
  infoJuego.className = "info-juego";

  let infoPartida = document.createElement("div");
  infoPartida.className = "info-partida"; // Este será nuestro contenedor
  infoJuego.appendChild(infoPartida);

  pantalla_carga.appendChild(infoJuego);

  return {
    element: pantalla_carga,
    promise: new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 10000); // 10 segundos
    }),
    // Añadimos función para actualizar información
    actualizarInfo: (texto) => {
      infoPartida.textContent = texto;
    },
  };
}
