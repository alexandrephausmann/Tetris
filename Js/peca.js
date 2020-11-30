class Peca {
    constructor(id, cor,status) {
        this.id = id; 
        this.cor = cor;
        this.status = status;
        this.coluna = (qtdColunas /2) -2;
        this.linha = 0;
      }

      setStatus(status){
        this.status = status;
      }

      setColuna(coluna){
        this.coluna = coluna;
      }

      setLinha(linha){
        this.linha = linha;
      }

      addLinha(){
        this.linha = parseInt(this.linha)+ 1
      }
      
      addColuna(){
        this.coluna = parseInt(this.coluna )+ 1
      }

      removeLinha(){
       
        this.linha = parseInt(this.linha)- 1
        
      }

      removeColuna(){
        this.coluna = parseInt(this.coluna )- 1
      }

      girarEsquerda(){
        var status 
        var statusNumerico

        if(typeof this.status === 'string'){
          status = this.status
          var statusNumerico = parseInt(status)
          statusNumerico = statusNumerico + 1  
        }else{
          statusNumerico = this.status + 1
        }
        var statusAntigo = parseInt(this.status)

        if(statusNumerico == peca.id.length ) {
          statusNumerico = statusNumerico % peca.id.length;
        }
        
        girar = true;
        this.status = parseInt(statusNumerico);
      
        quantidadeGiros = quantidadeGiros + 1
      
        girarPeca(statusNumerico,statusAntigo)

      }

      andarEsquerda(){

        var colunaAntiga = parseInt(this.coluna)
        var novaColuna = parseInt(this.coluna)
        novaColuna = novaColuna - 1 
        
        movimentarEsquerda(colunaAntiga,novaColuna)

      }

      andarDireita(){

        var colunaAntiga = parseInt(this.coluna)
        var novaColuna = parseInt(this.coluna)
        novaColuna = novaColuna + 1 
        
        movimentarDireita(colunaAntiga,novaColuna)
      }

}