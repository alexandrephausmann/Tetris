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
      
      addColuna(){
        this.coluna = parseInt(this.coluna )+ 1
      }

      girarEsquerda(){
        status = parseInt(this.status)+ 1
        console.log("status " + status)
        console.log("qntd status " + peca.id.length/*this.id.length*/)
        if(status == peca.id.length ) {
          console.log("entrou no if")
          status = status % peca.id.length;
        }
        girar = true;
        this.status = status;
        
        testeGirar = testeGirar + 1
        descerPeca("Girando")

        //this.limparPeca()
      }

      andarEsquerda(){

        var coluna = parseInt(this.coluna) - 1
        //if(coluna >= 0){
          if(!colidiuEsquerda){
            
            this.coluna = coluna;
            testeEsquerda = testeEsquerda + 1
            descerPeca("Esquerda")
    
          }
        //}

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