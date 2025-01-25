import { criarAssunto } from "./essencials/criarAssunto.js";
import { criarElemento, configurarBotaoExclusao } from "./essencials/criarElemento.js";

const button = document.getElementById("add");
export const inputTitulo = document.getElementById("input-titulo");
export const modal = document.getElementById("modal");
export const modalTitle = document.getElementById("modal-title");
export const closeButton = document.getElementById("close-button");
export const modalTextarea = document.getElementById("modal-textarea");
export const modalOverlay = document.getElementById("modal-overlay");
export let assuntos = [];

let _assuntoAtual;
export function setAssuntoAtual(index) {
    _assuntoAtual = index;
}
export function getAssuntoAtual() {
    return _assuntoAtual;
}

button.addEventListener('click', criarAssunto);

inputTitulo.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        criarAssunto();
    }
});

modalOverlay.addEventListener('click', function () {
    modal.classList.remove('active');
    modalOverlay.classList.remove('active');
});

modalTextarea.addEventListener('input', function () {
    const assuntoAtual = getAssuntoAtual();
    if (assuntoAtual !== undefined) {
        assuntos[assuntoAtual].descricao = modalTextarea.value;
        console.log(`Descrição atualizada para o assunto ${assuntoAtual}: ${modalTextarea.value}`);
    }
});

// Configurar o listener de exclusão na inicialização
configurarBotaoExclusao();
