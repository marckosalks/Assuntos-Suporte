import { inputTitulo, assuntos, db } from "../script.js";
import { criarElemento } from "./criarElemento.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const LIMITE_ASSUNTOS = 12;

export async function criarAssunto() {
    let titulo = inputTitulo.value.trim();

    if (!titulo) {
        alert("O campo de título está vazio.");
        return;
    }

    const assuntoExistente = assuntos.find((assunto) => assunto.titulo === titulo);

    if (assuntoExistente) {
        assuntoExistente.pontos += 1;
    } else {
        if (assuntos.length >= LIMITE_ASSUNTOS) {
            alert(`Você atingiu o limite máximo de ${LIMITE_ASSUNTOS} tópicos.`);
            return;
        }

        const novoAssunto = { titulo: titulo, descricao: "", pontos: 1 };

        try {
            const docRef = await addDoc(collection(db, "assuntos"), novoAssunto);
            novoAssunto.id = docRef.id; // Salva o ID Firestore localmente
            assuntos.push(novoAssunto);
        } catch (error) {
            console.error("Erro ao salvar o assunto no Firestore: ", error);
        }
    }

    assuntos.sort((a, b) => b.pontos - a.pontos);
    inputTitulo.value = "";
    criarElemento();
}
