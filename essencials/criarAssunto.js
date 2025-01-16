import { inputTitulo, assuntos,  } from "../script.js";

import { criarElemento  } from "../essencials/criarElemento.js";



export function criarAssunto() {
    let titulo = inputTitulo.value.trim();
    if (titulo) {
        let assunto = { titulo: titulo, descricao: "" };
        assuntos.push(assunto);
        console.log(assuntos);
        inputTitulo.value = '';
        criarElemento();
    } else {
        console.log('O campo de título está vazio.');
    }
}
