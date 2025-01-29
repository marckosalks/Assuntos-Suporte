// Seleciona o botão de alternância
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Verifica se o usuário já tem uma preferência salva
if (localStorage.getItem('dark-mode') === 'enabled') {
  document.body.classList.add('dark-mode');
} else {
  darkModeToggle.textContent = '*';  // Caso não tenha preferência salva
}

// Adiciona um evento de clique ao botão
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Atualiza o texto do botão
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('dark-mode', 'enabled'); // Salva a preferência
  } else {

    localStorage.setItem('dark-mode', 'disabled'); // Salva a preferência
  }
});
