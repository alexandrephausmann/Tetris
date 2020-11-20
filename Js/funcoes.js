var retornoColisao 
var colidiuEsquerda
var colunaAux
var indoProAlem 

function criaTabuleiro(colunas,linhas){
    
    console.log("teste")
    let tr = "";
    let td = "";
  /*  var divLinha = ""; 
    var divColuna = ""; 
    var divJogo = "";*/
    var table = document.createElement('table');
    var x = document.getElementsByClassName("corpo");
    x[0].innerHTML = "";

    for(let i=0;i<linhas;i++){

       // divLinha = document.createElement('div');
        //divJogo.appendChild(divLinha);
        tr = document.createElement('tr');
        tr.setAttribute('id', 'linha' + i.toString() );
       // tr.setAttribute('onkeypress',"testeAndar()")
        table.appendChild(tr);
        for(let x=0;x<colunas;x++){
            td = document.createElement('td');
            td.setAttribute('id', 'linha' + i.toString() + ' coluna' + x.toString()  );
            //td.setAttribute('onkeypress',"testeAndar()")
            table.appendChild(td);           
            //divColuna = document.createElement('div');
           // divLinha.appendChild(divColuna);
        }
    }
   // document.body.appendChild(table);

    x[0].appendChild(table);

    //document.getElementByClassName("corpo").appendChild(divJogo);

}

function pecaAleatoria(){
    
    const pecaAleatoria = Math.floor(Math.random() * conjuntoPecas.length);
    return new Peca(
        conjuntoPecas[pecaAleatoria][0],
        conjuntoPecas[pecaAleatoria][1],
        conjuntoPecas[pecaAleatoria][2],
    );  
}


//Eventos de tecla para método onKD

document.onkeydown = onKD;

function onKD(evt) {

var teclaDireita = 39
var teclaEsquerda = 37
var teclaCima = 38
var teclaBaixo = 40

if (evt.keyCode == teclaCima) {

    peca.girarEsquerda();
}else if (evt.keyCode == teclaEsquerda) {

    peca.andarEsquerda();
}else if (evt.keyCode == teclaDireita) {

    peca.andarDireita();
}else if (evt.keyCode == teclaBaixo) {

    descidaAutomatica()
}

console.log("chave pressionada" +evt.keyCode)

}

function descidaAutomatica(){
 
    if(linhaAtual >= qtdLinhas){
        peca = pecaAleatoria();
        linhaAtual = 0;
    
    }
    
    var pecaAtual = []
    var novaPeca = []
    var colisao
/*
    if(testeGirar > 1){
        pecaAtual = mapearPeca(peca,peca.linha+1,peca.coluna)
    }else{
        pecaAtual = mapearPeca(peca,peca.linha,peca.coluna)
    }
    */

    pecaAtual = mapearPeca(peca,peca.linha,peca.coluna)

    novaPeca = mapearNovaPeca(peca,peca.linha,peca.coluna)

    colisao = colisaoBaixo(novaPeca,"AUTOMATICO")

    if(!colisao){
        retirarPeca(pecaAtual)
        colocarPeca(novaPeca)
    }else{
        mudaStatusParado(pecaAtual)
    }
    
    
    peca.addLinha();
    linhaAtual +=1
    testeGirar = 0
    colidiuEsquerda = false
    testeGirandoAndando = 0
    /*testeEsquerda = 0
    testeExtremidade = 0
    }

    retornoColisao = false
    colidiuEsquerda = false*/


}

function girarPeca(statusNovo,statusAntigo){

    peca.status = statusAntigo

    var pecaAtual = []
    var novaPeca = []
    var colisao
    if(testeGirar > 1){
        pecaAtual = mapearPeca(peca,peca.linha+1,peca.coluna)
    }else{
        pecaAtual = mapearPeca(peca,peca.linha,peca.coluna)
    }
   
    peca.status = statusNovo

    novaPeca = mapearNovaPeca(peca,peca.linha,peca.coluna)

    colisao = colisaoBaixo(novaPeca,"GIRAR")

    if(!colisao){
        retirarPeca(pecaAtual)
        colocarPeca(novaPeca)
    }else{
        if(!indoProAlem){
            mudaStatusParado(pecaAtual)
        }else{
            peca.status = statusAntigo
        }
        
    }

}

function movimentarEsquerda(colunaAntiga,novaColuna){

    if(linhaAtual >= qtdLinhas){
        peca = pecaAleatoria();
        linhaAtual = 0;
    
    }
    
    var pecaAtual = []
    var novaPeca = []
    var colisao
    var verificadorVazio = false;

    peca.coluna = colunaAntiga

    if(testeGirar > 0){

        pecaAtual = mapearPeca(peca,peca.linha + 1,peca.coluna)
    
    }else{
        pecaAtual = mapearPeca(peca,peca.linha,peca.coluna)
    }

    peca.coluna = novaColuna
    
    verificadorVazio = verificaColunaVazia(novaColuna)
    
    if(testeGirar > 0){
        novaPeca = mapearNovaPeca(peca,peca.linha,peca.coluna)
    }else{
        novaPeca = mapearNovaPeca(peca,peca.linha-1,peca.coluna)
    }

    colisao = colisaoBordaEsquerda(novaPeca)

    if(!colisao || verificadorVazio){
        retirarPeca(pecaAtual)
        colocarPeca(novaPeca)
    }else{
        peca.coluna = colunaAntiga
    }

}

function movimentarDireita(colunaAntiga,novaColuna){

    if(linhaAtual >= qtdLinhas){
        peca = pecaAleatoria();
        linhaAtual = 0;
    
    }
    
    var pecaAtual = []
    var novaPeca = []
    var colisao
    var verificadorVazio = false;

    peca.coluna = colunaAntiga

    if(testeGirar > 0){

        pecaAtual = mapearPeca(peca,peca.linha + 1,peca.coluna)
    
    }else{
        pecaAtual = mapearPeca(peca,peca.linha,peca.coluna)
    }

    peca.coluna = novaColuna
    
    verificadorVazio = verificaColunaVazia(novaColuna)
    
    if(testeGirar > 0){
        novaPeca = mapearNovaPeca(peca,peca.linha,peca.coluna)
    }else{
        novaPeca = mapearNovaPeca(peca,peca.linha-1,peca.coluna)
    }

    colisao = colisaoBordaDireita(novaPeca)

    if(!colisao || verificadorVazio){
        retirarPeca(pecaAtual)
        colocarPeca(novaPeca)
    }else{
        peca.coluna = colunaAntiga
    }

}

function verificaColunaVazia(novaColuna){

    var verificadorNulo = false;
    var aux;
    var cont = 0;

    if(novaColuna == -1){
        aux = 0; 
    }else if(novaColuna == -2){
        aux = 1;
    }else if(novaColuna == qtdColunas ){
        aux = peca.id[peca.status][i].length - 1
    }else if(novaColuna == qtdColunas + 1 ){
        aux = peca.id[peca.status][i].length - 2
    }

    if(novaColuna < 0)
    {
        for(var i=0;i < peca.id[peca.status].length;i++){

            for(var k=0;k<peca.id[peca.status][i].length;k++){
               
                if(k == aux){
                    if(peca.id[peca.status][i][aux] == 0){              
                        
                    cont = cont + 1
                    
                    }   
                }           
            }
        }
        
        if(cont == peca.id[peca.status].length ){              
                
        verificadorNulo = true
        }
        
    }
    return verificadorNulo
}

function mudaStatusParado(pecaParada){

    var pecaPara; 
    
    for(var nX = 0; nX<pecaParada.length;nX++){

        pecaPara = document.getElementById(pecaParada[nX]);
        if(pecaPara != null){
            pecaPara.setAttribute('status','parado');
        }
    }
    
}

function mapearPeca(peca,linhainicial,colunainicial){
    
    console.log("Peça primaria:Linha inicial: " + linhainicial)
    console.log("Peça primaria:Coluna inicial: " + colunainicial)

    linhainicial = linhainicial - 1
    var colAux
    colAux = colunainicial 
    var MapPeca = [];

    for(var i=0;i < peca.id[peca.status].length;i++){

        for(var k=0;k<peca.id[peca.status][i].length;k++){
            
            if(linhainicial >= 0){

                if(peca.id[peca.status][i][k] == 1){  

                    MapPeca.push("linha"+linhainicial + " coluna" + colunainicial); 
                    console.log("Peça primaria: linha"+linhainicial + " coluna" + colunainicial);  
                }    

            }
            colunainicial += 1;           
        }
        colunainicial = colAux;
        linhainicial += 1;
    }

    return MapPeca;

}

function mapearNovaPeca(peca,linhainicial,colunainicial){

    console.log("Peça secundaria:Linha inicial: " + linhainicial)
    console.log("Peça secundaria:Coluna inicial: " + colunainicial)

    var colAux
    colAux = colunainicial 
/* alguma logica pra salvar a peça quando tenta girar na extremidade
    if(colunainicial < 0){
        colunainicial = 0
    }
*/
    var pecaNova = [];

    for(var i=0;i < peca.id[peca.status].length;i++){

        for(var k=0;k<peca.id[peca.status][i].length;k++){

            if(peca.id[peca.status][i][k] == 1){              
                
                pecaNova.push("linha"+linhainicial + " coluna" + colunainicial);    
                console.log("Peça secundaria: linha"+linhainicial + " coluna" + colunainicial);      
                
            }
            colunainicial += 1;           
        }
        colunainicial = colAux;
        linhainicial += 1;
    }

    return pecaNova;

}

function retirarPeca(pecaRetirada){

    var pecaUnica; 
    
    for(var nX = 0; nX<pecaRetirada.length;nX++){

        pecaUnica = document.getElementById(pecaRetirada[nX]);
        var teste = pecaUnica.getAttribute("status")
        if(teste != "parado"){
            if(pecaUnica != null){
                var cor = "white"
                pecaUnica.style.backgroundColor = cor;
                pecaUnica.removeAttribute("status")
            }
        }    
    }
    
}

function colocarPeca(pecaColocada){
    
    var pecaPosta 

    for(var nX = 0; nX<pecaColocada.length;nX++){

        pecaPosta = document.getElementById(pecaColocada[nX]);
        pecaPosta.style.backgroundColor = peca.cor;
        pecaPosta.setAttribute('status','movimento');

    }

}

function colisaoBaixo(proximaPeca,statsPeca){
    
    var pecaTeste;
    var retorno = false
    var ultimaColuna = "coluna" + qtdColunas
    indoProAlem = false

    for(var nY = 0; nY<proximaPeca.length;nY++){

        pecaTeste = document.getElementById(proximaPeca[nY]);

        if((proximaPeca[nY].indexOf("coluna-1") != -1) || proximaPeca[nY].indexOf(ultimaColuna) != -1){
            indoProAlem = true
        }

        if(pecaTeste != null){
            var corFundo = window.getComputedStyle(pecaTeste);
            var status = pecaTeste.getAttribute("status");
            if((corFundo.backgroundColor!="rgb(255, 255, 255)" && status == "parado" ) || (corFundo.backgroundColor== null)){
                if(statsPeca == "AUTOMATICO"){
                    linhaAtual = qtdLinhas;
                }
                
                retorno = true;
                
            }
        }else{
            if(statsPeca == "AUTOMATICO"){
                linhaAtual = qtdLinhas;
            }
            retorno = true;

        }
    }

    return retorno;

}

function colisaoBordaEsquerda(novaPeca){

    var pecaTeste;
    var retorno = false
    colidiuEsquerda = false;

    for(var nY = 0; nY<novaPeca.length;nY++){

        pecaTeste = document.getElementById(novaPeca[nY]);

        if(pecaTeste != null){
            var corFundo = window.getComputedStyle(pecaTeste);
            var status = pecaTeste.getAttribute("status");
            if((corFundo.backgroundColor!="rgb(255, 255, 255)" && status == "parado" ) || (corFundo.backgroundColor== null)){
                colidiuEsquerda = true;
                break;
            }
        }else{
            colidiuEsquerda = true;
            break;
        }
    }

    return colidiuEsquerda;

}

function colisaoBordaDireita(novaPeca){

    var pecaTeste;
    var retorno = false
    colidiuEsquerda = false;

    for(var nY = 0; nY<novaPeca.length;nY++){

        pecaTeste = document.getElementById(novaPeca[nY]);

        if(pecaTeste != null){
            var corFundo = window.getComputedStyle(pecaTeste);
            var status = pecaTeste.getAttribute("status");
            if((corFundo.backgroundColor!="rgb(255, 255, 255)" && status == "parado" ) || (corFundo.backgroundColor== null)){
                colidiuEsquerda = true;
                break;
            }
        }else{
            colidiuEsquerda = true;
            break;
        }
    }

    return colidiuEsquerda;

}
