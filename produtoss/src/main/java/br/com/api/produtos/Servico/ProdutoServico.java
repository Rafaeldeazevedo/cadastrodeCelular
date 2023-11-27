package br.com.api.produtos.Servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.api.produtos.Repositorio.ProdutoRepositorio;
import br.com.api.produtos.modelo.ProdutoModelo;
import br.com.api.produtos.modelo.RespostaModelo;

@Service
public class ProdutoServico {
    
@Autowired
private ProdutoRepositorio pr;

@Autowired
private RespostaModelo rm;

//Metodo para listar todos os produtos 
public Iterable<ProdutoModelo> listar(){
    return pr.findAll();
}

//METODO PARA CADASTRAR ou ALTERAR PRODUTOS
public ResponseEntity<?> cadastrarAlterar(ProdutoModelo pm, String acao){

    if(pm.getNome().equals("")){
        rm.setMensagem("O produto é obrigatorio");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);


    }else if (pm.getMarca().equals("")) {
        rm.setMensagem("o nome da marca é obrigatorio");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);

    }else{
         if(acao.equals("cadastrar")){
            return new ResponseEntity<ProdutoModelo>(pr.save(pm), HttpStatus.CREATED);
         }else{
            return new ResponseEntity<ProdutoModelo>(pr.save(pm), HttpStatus.OK);
         }
        
        }

}


//METODO PARA REMOVER PRODUTO 

public ResponseEntity<RespostaModelo> remover(long codigo){

            pr.deleteById(codigo);
            
            rm.setMensagem("o produto foi removido com sucesso");

            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);

}



}







