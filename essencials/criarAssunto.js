import { inputTitulo, assuntos } from "../script.js";
import { criarElemento } from "../essencials/criarElemento.js";

const LIMITE_ASSUNTOS = 12;

// Exporta a função criarAssunto
export function criarAssunto() {
    let titulo = inputTitulo.value.trim(); // Remove espaços desnecessários
    
    // Valida se o campo está vazio
    if (!titulo) {
        alert("O campo de título está vazio.");
        return;
    }

    // Busca o assunto no array, se já existir
    const assuntoExistente = assuntos.find((assunto) => assunto.titulo === titulo);

    if (assuntoExistente) {
        // Se já existe, aumenta sua prioridade no ranking (ou pontuação)
        assuntoExistente.pontos += 1;
    } else {
        // Verifica o limite de tópicos
        if (assuntos.length >= LIMITE_ASSUNTOS) {
            alert(`Você atingiu o limite máximo de ${LIMITE_ASSUNTOS} tópicos.`);
            return;
        }

        let descricao = ""
        // Cria um novo assunto com 1 ponto inicial e o adiciona ao array
        const novoAssunto = { titulo: titulo, descricao: descricao ,pontos: 1,  };
        assuntos.push(novoAssunto);
    }

    // Ordena os assuntos do maior para o menor número de pontos
    assuntos.sort((a, b) => b.pontos - a.pontos);

    // Reseta o input e atualiza a lista exibida
    inputTitulo.value = "";
    criarElemento(); // Atualiza a exibição dos elementos

    console.log(assuntos); // Para debug, exibe o ranking atualizado
}
