import { modalTitle, modalTextarea, modal, modalOverlay, closeButton, assuntos, setAssuntoAtual, getAssuntoAtual } from "../script.js";

export function criarElemento() {
    const galeria = document.querySelector('.galeria-assuntos');
    galeria.innerHTML = '';

    const ul = document.createElement('ul');
    galeria.appendChild(ul);

    assuntos.forEach((assunto, index) => {
        const newLi = document.createElement('li');
        newLi.textContent = assunto.titulo;
        ul.appendChild(newLi);

        // Listener para abrir o modal
        newLi.addEventListener('click', function () {
            setAssuntoAtual(index); // Usando uma função para atualizar a variável
            modalTitle.textContent = assunto.titulo;
            modalTextarea.value = assunto.descricao;
            modal.classList.add('active');
            modalOverlay.classList.add('active');
        });
    });
}

// Configurar o listener de exclusão apenas uma vez
export function configurarBotaoExclusao() {
    closeButton.addEventListener('click', function () {
        const assuntoAtual = getAssuntoAtual();
        if (assuntoAtual !== undefined && window.confirm("Deseja realmente excluir este assunto?")) {
            assuntos.splice(assuntoAtual, 1);
            criarElemento();
            modal.classList.remove('active');
            modalOverlay.classList.remove('active'); 
        }
    });
}
