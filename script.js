const button = document.getElementById("add");
const input = document.getElementById("input");
let assuntos = [];

button.addEventListener('click', function criarAssunto() {
    let valorInput = input.value.trim();
    if (valorInput) {
        assuntos.push(valorInput); 
        console.log(assuntos);
        input.value = ''; 

        criarElemento();
    } else {
        console.log('O campo de entrada está vazio.');
    }
});

function criarElemento() {
   
    const galeria = document.querySelector('.galeria-assuntos');
    galeria.innerHTML = ''; 

    //crio a ul
    const ul = document.createElement('ul');
    galeria.appendChild(ul);

    // percorro meio array e crio a li
    assuntos.forEach((valor) => {
        const newLi = document.createElement('li');
        newLi.textContent = valor;
        ul.appendChild(newLi);

        // adiciona um evento de click ao elemento criado
        newLi.addEventListener('click',testando);
    });
}


function testando(){
    console.log('teste')
}
