const inputTitulo = document.getElementById("input-titulo");
let assuntos = [];

export default function criarAssunto(){
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