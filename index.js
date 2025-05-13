import { inicio } from "./componentes/views/inicio/inicio.js";
import { header } from "./componentes/views/inicio/header.js";

function cargarDOM (){
    let DOM = document.querySelector("#root");
    DOM.className = "dom";

    DOM.appendChild(header());
    DOM.appendChild(inicio());

    return DOM;
}

cargarDOM();

export {cargarDOM}