import { criarAssunto } from "./essencials/criarAssunto.js";
import { criarElemento, configurarBotaoExclusao } from "./essencials/criarElemento.js";

// Importar Firebase e Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCtUq-t8BMBMHT2zalSzDGYJs2mMG9SnHY",
    authDomain: "quadro-de-assuntos-58e14.firebaseapp.com",
    projectId: "quadro-de-assuntos-58e14",
    storageBucket: "quadro-de-assuntos-58e14.firebasestorage.app",
    messagingSenderId: "864693170371",
    appId: "1:864693170371:web:0b978343d9e4d02f373276",
    measurementId: "G-XKH1RFNJ86"
};

// Inicializar Firebase e Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const button = document.getElementById("add");
export const inputTitulo = document.getElementById("input-titulo");
export const modal = document.getElementById("modal");
export const modalTitle = document.getElementById("modal-title");
export const closeButton = document.getElementById("close-button");
export const deleteButton = document.getElementById("delete-button"); // Novo botão de exclusão
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

// Função para carregar dados do Firestore
async function carregarAssuntos() {
    const querySnapshot = await getDocs(collection(db, "assuntos"));
    assuntos = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id, // Salva o ID do Firestore para futuras atualizações/exclusões
    }));
    criarElemento();
    configurarBotaoExclusao(); // Adiciona os eventos de exclusão
}

// Event Listeners
button.addEventListener("click", criarAssunto);

inputTitulo.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        criarAssunto();
    }
});

modalOverlay.addEventListener("click", () => {
    modal.classList.remove("active");
    modalOverlay.classList.remove("active");
});

modalTextarea.addEventListener("input", async function () {
    const assuntoAtual = getAssuntoAtual();
    if (assuntoAtual !== undefined) {
        const assunto = assuntos[assuntoAtual];
        assunto.descricao = modalTextarea.value;
        console.log(`Descrição atualizada localmente para ${assunto.titulo}: ${modalTextarea.value}`);

        try {
            // Atualiza a descrição no Firestore
            const assuntoRef = doc(db, "assuntos", assunto.id);
            await updateDoc(assuntoRef, { descricao: assunto.descricao });
            console.log(`Descrição salva no Firestore para ${assunto.titulo}`);
        } catch (error) {
            console.error("Erro ao atualizar a descrição no Firestore: ", error);
        }
    }
});

// Inicializar
carregarAssuntos();
