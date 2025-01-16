import { modalTitle, modalTextarea, modal, modalOverlay, closeButton, assuntos, setAssuntoAtual } from "../script.js";

export function criarElemento() {
    const galeria = document.querySelector('.galeria-assuntos');
    galeria.innerHTML = '';

    const ul = document.createElement('ul');
    galeria.appendChild(ul);

    assuntos.forEach((assunto, index) => {
        const newLi = document.createElement('li');
        newLi.textContent = assunto.titulo;
        ul.appendChild(newLi);

        newLi.addEventListener('click', function () {
            setAssuntoAtual(index); // Usando uma função para atualizar a variável
            modalTitle.textContent = assunto.titulo;
            modalTextarea.value = assunto.descricao;
            modal.classList.add('active');
            modalOverlay.classList.add('active');
        });

        closeButton.addEventListener('click', function () {
            if (window.confirm("Deseja realmente excluir este assunto?")) {
                assuntos.splice(index, 1);
                //criarElemento();
            }
        });
    });
}
