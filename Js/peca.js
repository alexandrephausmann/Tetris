class Peca {
    constructor(id, cor,status) {
        this.id = id; 
        this.cor = cor;
        this.status = status;
        this.coluna = 3;
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

        console.log("status " + status)
        console.log("qntd status " + peca.id.length)

        if(statusNumerico == peca.id.length ) {
          console.log("entrou no if")
          statusNumerico = statusNumerico % peca.id.length;
        }
        
        girar = true;
        this.status = parseInt(statusNumerico);
      
        testeGirar = testeGirar + 1
        //descerPeca("Girando")
        
        girarPeca(statusNumerico,statusAntigo)

        if(verificaGirada){
          this.status = statusAntigo;  
        }

      }

      andarEsquerda(){

        var colunaAntiga = parseInt(this.coluna)
        var novaColuna = parseInt(this.coluna)
        novaColuna = novaColuna - 1 
        
        this.coluna = novaColuna;
        movimentarEsquerda(colunaAntiga,novaColuna)

      }

      andarDireita(){

        var colunaAntiga = parseInt(this.coluna)
        var novaColuna = parseInt(this.coluna)
        novaColuna = novaColuna + 1 
        this.coluna = novaColuna;
        movimentarDireita(colunaAntiga,novaColuna)
        verificaGirada = false;
      }

}