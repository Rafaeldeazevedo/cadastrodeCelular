import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  //Objeto Produto
  const produto = {
       codigo : 0,
       nome: '',
       marca: '',
       imagem: ''
       
       
  }

  //UseState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  //UseEffect
  useEffect(() =>{
       fetch("http://localhost:8080/listar")
       .then(retorno => retorno.json())
       .then(retorno_convertido => setProdutos(retorno_convertido));
  },  []);
  


//OBTENDO OS DADOS DO FORMULARIO
const aoDigitar = (e)=> {
setObjProduto({...objProduto, [e.target.name]: e.target.value});

}

//CADASTRAR PRODUTO
const cadastrar = ()=> {
  fetch('http://localhost:8080/cadastrar',{
    method:'post',
    body:JSON.stringify(objProduto),
    headers:{
      'content-type':'application/json',
     'Accept':'application/json'
    }
  })
 .then(retorno => retorno.json)
.then(retorno_convertido => {
   
  if(retorno_convertido.mensagem !== undefined){
    alert(retorno_convertido.mensagem);

  }else{
    setProdutos([...produtos, retorno_convertido]);
    alert('Produto Cadastrado com Sucesso!')
    limparFormulario();
  }
})
}

//REMOVER PRODUTO
const remover = ()=> {
  fetch('http://localhost:8080/remover/'+objProduto.codigo,{
    method:'delete',
    headers:{
      'content-type':'application/json',
     'Accept':'application/json'
    }
  })
 .then(retorno => retorno.json)
.then(retorno_convertido => {
   
  if(retorno_convertido.mensagem !== undefined){
    alert(retorno_convertido.mensagem);

  }else{
    
    //MENSAGEM 
    alert('Produto Removido com Sucesso!')
  }

  //Copia vetor de produto
  let vetorTemp = [...produtos];
 
  //índice 
    let indice = vetorTemp.findIndex((p) =>{
       return p.codigo === objProduto.codigo;
    });

    //Remover produto do vetor temp
    vetorTemp.splice(indice, 1);

    //ATUALZAR O VETOR DE PRODUTOS

    setProdutos(vetorTemp);

    //Limpar Formulario 

    limparFormulario();

})
}

//ALTERAR PRODUTO
const alterar = ()=> {
  fetch('http://localhost:8080/alterar',{
    method:'put',
    body:JSON.stringify(objProduto),
    headers:{
      'content-type':'application/json',
     'Accept':'application/json'
    }
  })
 .then(retorno => retorno.json)
.then(retorno_convertido => {
   
  if(retorno_convertido.mensagem !== undefined){
    alert(retorno_convertido.mensagem);

  }else{
    
    //MENSAGEM 
    alert('Produto Alterado com Sucesso!')
    
     //Copia vetor de produto
  let vetorTemp = [...produtos];
 
  //índice 
    let indice = vetorTemp.findIndex((p) =>{
       return p.codigo === objProduto.codigo;
    });

    //Remover produto do vetor temp
    vetorTemp[indice]= objProduto;

    //ATUALZAR O VETOR DE PRODUTOS

    setProdutos(vetorTemp);
    
    limparFormulario();
  }
})
}

//limpa formulario

const limparFormulario = ()=> {
  setObjProduto(produto);
  setBtnCadastrar(true);
}

//Selecionar Produto
const  selecionarProduto = (indice) => {
  setObjProduto(produtos[indice]);
  setBtnCadastrar(false);
}

  //retorno
  return (
    <div >
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar ={cadastrar} obj={objProduto} cancelar = {limparFormulario} remover = {remover} alterar = {alterar}/>
      <Tabela vetor={produtos} selecionar={selecionarProduto}/>
    </div>
  );
}








export default App;
