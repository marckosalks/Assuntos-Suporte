const button = document.getElementById("add");
const inputTitulo = document.getElementById("input-titulo");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const closeButton = document.getElementById("close-button");
const modalTextarea = document.getElementById("modal-textarea");
const modalOverlay = document.getElementById("modal-overlay");
let assuntos = [];
let assuntoAtual;

button.addEventListener('click', criarAssunto);
closeButton.addEventListener('click', fecharModal);
modalOverlay.addEventListener('click', fecharModal);
modalTextarea.addEventListener('input', atualizarDescricao);

// Função para criar um novo assunto
function criarAssunto() {
  let titulo = inputTitulo.value.trim();
  if (titulo) {
    let assunto = { titulo: titulo, descricao: "" };
    assuntos.push(assunto);
    console.log(assuntos);
    inputTitulo.value = '';
    atualizarGaleria();
  } else {
    console.log('O campo de título está vazio.');
  }
}

// Função para fechar o modal
function fecharModal() {
  modal.classList.remove('active');
  modalOverlay.classList.remove('active');
}

// Função para atualizar a descrição do assunto atual
function atualizarDescricao() {
  if (assuntoAtual !== undefined) {
    assuntos[assuntoAtual].descricao = modalTextarea.value;
    console.log(`Descrição atualizada para o assunto ${assuntoAtual}: ${modalTextarea.value}`);
  }
}

// Função para atualizar a galeria de assuntos
function atualizarGaleria() {
  const galeria = document.querySelector('.galeria-assuntos');
  galeria.innerHTML = '';

  const ul = document.createElement('ul');
  galeria.appendChild(ul);

  assuntos.forEach((assunto, index) => {
    const newLi = document.createElement('li');
    newLi.textContent = assunto.titulo;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', function() {
      removerAssunto(index);
    });

    newLi.appendChild(removeButton);
    newLi.addEventListener('click', function(event) {
      if (event.target !== removeButton) {
        abrirModal(assunto, index);
      }
    });

    ul.appendChild(newLi);
  });
}

// Função para abrir o modal com os dados do assunto
function abrirModal(assunto, index) {
  assuntoAtual = index;
  modalTitle.textContent = assunto.titulo;
  modalTextarea.value = assunto.descricao;
  modal.classList.add('active');
  modalOverlay.classList.add('active');
}

// Função para remover um assunto
function removerAssunto(index) {
  assuntos.splice(index, 1);
  atualizarGaleria();
}
