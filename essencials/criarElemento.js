import { modalTitle, modalTextarea, modal, modalOverlay, deleteButton, assuntos, setAssuntoAtual, getAssuntoAtual, db } from "../script.js";
import { doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

export function criarElemento() {
    const galeria = document.querySelector(".galeria-assuntos");
    galeria.innerHTML = "";

    const ul = document.createElement("ul");
    galeria.appendChild(ul);

    assuntos.forEach((assunto, index) => {
        const newLi = document.createElement("li");
        newLi.textContent = assunto.titulo;
        ul.appendChild(newLi);

        newLi.addEventListener("click", () => {
            setAssuntoAtual(index);
            modalTitle.textContent = assunto.titulo;
            modalTextarea.value = assunto.descricao;
            modal.classList.add("active");
            modalOverlay.classList.add("active");
        });
    });
}

export function configurarBotaoExclusao() {
    deleteButton.addEventListener("click", async () => {
        const assuntoAtual = getAssuntoAtual();

        if (assuntoAtual !== undefined && window.confirm("Deseja realmente excluir este assunto?")) {
            const assunto = assuntos[assuntoAtual];

            try {
                await deleteDoc(doc(db, "assuntos", assunto.id)); // Exclui no Firestore
                assuntos.splice(assuntoAtual, 1); // Atualiza localmente
                criarElemento(); // Atualiza a lista de elementos
            } catch (error) {
                console.error("Erro ao excluir o assunto do Firestore: ", error);
            }

            modal.classList.remove("active");
            modalOverlay.classList.remove("active");
        }
    });
}
