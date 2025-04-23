import { inicio } from "./views/inicio.js";
import { header } from "./views/header.js";

function cargarDOM (){
    let DOM = document.querySelector("#root");
    DOM.className = "dom";

    DOM.appendChild(header());
    DOM.appendChild(inicio());


    return DOM;
}

cargarDOM();

export {cargarDOM}