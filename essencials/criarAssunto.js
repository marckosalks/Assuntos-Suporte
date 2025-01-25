import { inputTitulo, assuntos, } from "../script.js";

import { criarElemento } from "../essencials/criarElemento.js";

const LIMITE_ASSUNTOS = 12;

export function criarAssunto() {
    if (assuntos.length == LIMITE_ASSUNTOS) {
        (`Você atingiu o limite máximo de ${LIMITE_ASSUNTOS} tópicos.`);
        return;
    } else {

        let titulo = inputTitulo.value.trim();
        if (titulo) {
            let assunto = { titulo: titulo, descricao: "" };
            assuntos.push(assunto);
            console.log(assuntos);
            inputTitulo.value = '';
            criarElemento();
        } else {
            console.log('O campo de título está vazio.');
            alert('Algo deu errado.')
        }
    }
}
