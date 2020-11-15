class Peca {
    constructor(id, cor,status) {
        this.id = id; 
        this.cor = cor;
        this.status = status;
        this.coluna = 3;
        this.linha = 0;
      }

      addLinha(){
        this.linha = parseInt(this.linha)+ 1
      }

      girarEsquerda(){
        status = parseInt(this.status)+ 1
        console.log("status " + status)
        console.log("qntd status " + peca.id.length/*this.id.length*/)
        if(status == peca.id.length ) {
          console.log("entrou no if")
          status = status % peca.id.length;
        }
        this.status = status;
        
       // removerMovimentoAnterior(peca,this.linha,this.coluna)

        //this.limparPeca()
      }

      limparPeca(){

      console.log("entrouuu")
        for(var k=0;k<pecaAtual.length;k++){
          elemento = document.getElementById(pecaAtual[k]);
          
          if(elemento != null){
            var cor = "white"
            elemento.style.backgroundColor = cor;
            elemento.removeAttribute("status")
            elemento.removeAttribute("style")
         }
       }    

      }
}