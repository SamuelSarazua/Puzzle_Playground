function cargarFormulario() {

    let formulario = document.createElement('div');
    formulario.className = "formulario";

    let nombre = document.createElement('input');
    nombre.className = "nombre";
    formulario.appendChild(nombre);

    let num_jugadores = document.createElement('input');
    num_jugadores.textContent = "Número de jugadores"
    num_jugadores.className = "num-jugadores";
    formulario.appendChild(num_jugadores);

    let cuadro_niveles = document.createElement('div');
    cuadro_niveles.className = "cuadro-niveles";
    formulario.appendChild(cuadro_niveles);

    let nivel1 = document.createElement('div');
    nivel1.textContent = "Nivel 1";
    nivel1.className = "nivel-1";
    cuadro_niveles.appendChild(nivel1);

    let nivel2 = document.createElement('div');
    nivel2.textContent = "Nivel 2";
    nivel2.className = "nivel-2";
    cuadro_niveles.appendChild(nivel2);

    let nivel3 = document.createElement('div');
    nivel3.textContent = "Nivel 3";
    nivel3.className = "nivel-3";
    cuadro_niveles.appendChild(nivel3);

    let link = document.createElement('div');
    link.textContent = "copy link"
    link.className = "link";
    formulario.appendChild(link);

    let jugar = document.createElement('button');
    jugar.textContent = "Jugar";
    jugar.className = "btn-jugar";
    formulario.appendChild(jugar);

    return formulario;

}


export { cargarFormulario }