function inicio (){
    let inicio = document.createElement('section');
    inicio.className = "inicio";

    let info = document.createElement('div');
    info.className = "info";
    inicio.appendChild(info);

    let juegos = document.createElement('div');
    juegos.className = "juegos";
    inicio.appendChild(juegos);

    let juego_memoria = document.createElement('div');
    juego_memoria.className = "juego_memoria"
    juegos.appendChild(juego_memoria);

    let btn_jugar_m = document.createElement('button');
    btn_jugar_m.textContent = "crear";
    juego_memoria.appendChild(btn_jugar_m);

    let juego_preguntas = document.createElement('div');
    juego_preguntas.className = "juego_preguntas";
    juegos.appendChild(juego_preguntas);

    let btn_jugar_p = document.createElement('button');
    btn_jugar_p.textContent = "crear";
    juego_preguntas.appendChild(btn_jugar_p);

    let juego_libre = document.createElement('div');
    juego_libre.className = "juego_libre";
    juegos.appendChild(juego_libre);

    let btn_jugar_l = document.createElement('button');
    btn_jugar_l.textContent = "crear";
    juego_libre.appendChild(btn_jugar_l);

    return inicio;
}

export {inicio};