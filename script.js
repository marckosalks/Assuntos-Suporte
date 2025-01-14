const button = document.getElementById("add");
const inputTitulo = document.getElementById("input-titulo");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const closeButton = document.getElementById("close-button");
const modalTextarea = document.getElementById("modal-textarea");
const modalOverlay = document.getElementById("modal-overlay");
let assuntos = [];
let assuntoAtual;


function criarAssunto(){
    let titulo = inputTitulo.value.trim();
    if(titulo){
        if(titulo){
            let assunto =  { titulo: titulo, descricao: ""}
            assuntos.push(assunto);
            console.log(assunto);
            inputTitulo.value = '';
        }

        criarElemento();
    }else{
        console.log('O campo de título está vazio.');
    }
}



// Adiciona um evento de click ao botão de adicionar
button.addEventListener('click', () =>  {
    criarAssunto();
    criarAssunto();
});

inputTitulo.addEventListener('keypress', () => {
    if(event.key === 'Enter') {
        criarAssunto();
    }
})

// Adiciona um evento de click ao botão de fechar
closeButton.addEventListener('click', function () {
    modal.classList.remove('active');
    modalOverlay.classList.remove('active');
});

// Adiciona um evento de click ao overlay do modal
modalOverlay.addEventListener('click', function () {
    modal.classList.remove('active');
    modalOverlay.classList.remove('active');
});

// Adiciona um evento de input ao textarea do modal para atualizar a descrição
modalTextarea.addEventListener('input', function () {
    if (assuntoAtual !== undefined) {
        assuntos[assuntoAtual].descricao = modalTextarea.value;
        console.log(`Descrição atualizada para o assunto ${assuntoAtual}: ${modalTextarea.value}`);
    }
});

// Função para criar os elementos da lista
function criarElemento() {
    const galeria = document.querySelector('.galeria-assuntos');
    galeria.innerHTML = '';

    // Crio a ul
    const ul = document.createElement('ul');
    galeria.appendChild(ul);

    // Percorro o array e crio a li
    assuntos.forEach((assunto, index) => {
        const newLi = document.createElement('li');
        newLi.textContent = assunto.titulo;
        ul.appendChild(newLi);

        // Adiciona um evento de click ao elemento criado
        newLi.addEventListener('click' , function () {
            assuntoAtual = index;
            modalTitle.textContent = assunto.titulo;
            modalTextarea.value = assunto.descricao;
            modal.classList.add('active');
            modalOverlay.classList.add('active');
        });

        //função para apagar o assunto
        closeButton.addEventListener('click', function () {
            
            if(window.confirm("Deseja realmente excluir este assunto?")){
                assuntos.splice(index, 1);
                criarElemento();
                ul.appendChild(newLi);
            }

        });
    });
}
