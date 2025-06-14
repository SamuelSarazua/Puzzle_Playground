function pantalla_carga() {
  let pantalla_carga = document.createElement("div");
  pantalla_carga.className = "pantalla_carga";

  let cargando = document.createElement("div");
  cargando.className = "cargando";
  cargando.textContent = "Cargando...";
  pantalla_carga.appendChild(cargando);

  let infoJuego = document.createElement("div");
  infoJuego.className = "info-juego";

  let numero_jugadores = document.createElement("div");
  numero_jugadores.className = "numero_jugadores";
  infoJuego.appendChild(numero_jugadores);

  let nivel = document.createElement("div");
  nivel.className = "nivel";
  infoJuego.appendChild(nivel);

  pantalla_carga.appendChild(infoJuego);

  return {
    element: pantalla_carga,
    promise: new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 10000); // 10 segundos
    }),
  };
}

export { pantalla_carga };
