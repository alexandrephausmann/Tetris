var retornoColisao 
var colidiuEsquerda

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


function descerPecaTabuleiro(peca,linhainicial,colunainicial,statusPeca){

    var colunaAux = colunainicial;

    if((linhainicial > 0) && (linhainicial < qtdLinhas)){
        var linhaAnterior = linhainicial -1;
        if(statusPeca =="Esquerda"){
            colunainicial = colunainicial + 1
                
        }
        if(testeGirar > 1){
            removerMovimentoAnterior(peca,linhainicial,colunainicial)
        }else{
            removerMovimentoAnterior(peca,linhaAnterior,colunainicial)
        }
        
        linhaAnterior = peca.coluna
    }

    if(girar){
        
        var status = parseInt(peca.status) + 1

        console.log("status " + status)
        console.log("qntd status " + peca.id.length/*this.id.length*/)
        if(status == peca.id.length ) {
          console.log("entrou no if 3 ")
          status = status % peca.id.length;
        }

        if(statusOriginal == 0){
            peca.status = 0
            statusOriginal = 1
        }else{
            peca.status = status
        }
        
        girar = false
    }
    /*if(statusPeca =="Esquerda"){
        linhainicial = linhainicial - 1
    }
*/
    /*
    Criar objeto contendo a peça no movimento atual
    */ 
   var pecaAtual = [];

    for(var i=0;i < peca.id[peca.status].length;i++){

        for(var k=0;k<peca.id[peca.status][i].length;k++){

            if(peca.id[peca.status][i][k] == 1){              
                if (linhainicial < qtdLinhas){
                    var elemento = document.getElementById("linha"+linhainicial + " coluna" + colunainicial);
                    var proximaLinha = linhainicial + 1 ;
                    var proximoElemento = document.getElementById("linha"+ proximaLinha + " coluna" + colunainicial);
                    pecaAtual.push("linha"+linhainicial + " coluna" + colunainicial);
      
                    if(statusPeca =="Esquerda"){
                        var colunaEsquerda = colunainicial - 1
                        var elementoEsquerda = document.getElementById("linha"+linhainicial + " coluna" + colunaEsquerda );
                        colisaoEsquerda(elementoEsquerda)
                    }else{
                        colisaoAbaixo(proximoElemento)
                    }
                    
                    mudaCorTabuleiro(elemento,peca.cor)
                }
            }
            colunainicial += 1;           
        }
        colunainicial = colunaAux;
        linhainicial += 1;
        /*if(!girar){
            peca.addLinha();
        }*/
        
    }

    if(retornoColisao){
        for(var k=0;k<pecaAtual.length;k++){
            elemento = document.getElementById(pecaAtual[k]);
            mudaStatusParado(elemento);
        }    
    }
    

}


function removerMovimentoAnterior(peca,linhainicial,colunainicial){

    var colunaAux = colunainicial;

    if(girar){
        
        var status = parseInt(peca.status) - 1

        console.log("status 2 " + status)
        console.log("qntd status 2 " + peca.id.length/*this.id.length*/)
        if(status<0 ) {
          console.log("entrou no if 2")
          peca.status = peca.id.length - 1
          statusOriginal = 0
        }else{
            peca.status = status;
        }

    }
    for(var i=0;i < peca.id[peca.status].length;i++){

        for(var k=0;k<peca.id[peca.status][i].length;k++){
            
            if(peca.id[peca.status][i][k] == 1){ 
                var elemento = document.getElementById("linha"+linhainicial + " coluna" + colunainicial);
                //var testekkk = document.getElementById("linha"+linhainicial + " coluna" + colunainicial).onkeypress = function() {testeAndar()};
                tiraElementoTabuleiro(elemento)
            }
            colunainicial += 1;
            
        }
        colunainicial = colunaAux;
        linhainicial += 1;
        /*if(!girar){
            peca.addLinha();
        }*/
        

    }

}

function colisaoAbaixo(elemento){
  
    if(elemento != null){
        var corFundo = window.getComputedStyle(elemento);
        var status = elemento.getAttribute("status");
        if((corFundo.backgroundColor!="rgb(255, 255, 255)" && status == "parado" ) || (corFundo.backgroundColor== null)){
            linhaAtual = qtdLinhas;
            retornoColisao = true;
        }
    }else{
        linhaAtual = qtdLinhas;
        retornoColisao = true;
    }

}

function colisaoEsquerda(elemento){
  
    if(elemento != null){
        var corFundo = window.getComputedStyle(elemento);
        var status = elemento.getAttribute("status");
        if((corFundo.backgroundColor!="rgb(255, 255, 255)" && status == "parado" ) || (corFundo.backgroundColor== null)){
            //linhaAtual = qtdLinhas;
            colidiuEsquerda = true;
        }
    }else{
        //linhaAtual = qtdLinhas;
        colidiuEsquerda = true;
    }

}

function mudaCorTabuleiro(elemento,cor) {

    elemento.style.backgroundColor = cor;
    elemento.setAttribute('status','movimento');

}

function mudaStatusParado(elemento){

    elemento.setAttribute('status','parado');

}

function tiraElementoTabuleiro(elemento) {
    
    if(elemento != null){
       var cor = "white"
        //elemento.removeAttribute("style")
        elemento.style.backgroundColor = cor;
        elemento.removeAttribute("status")
        //elemento.removeAttribute("style")
    }
}

function descerPeca(statusPeca = "normal"){

    //alert("teste")   
    if(linhaAtual >= qtdLinhas){
        peca = pecaAleatoria();
        linhaAtual = 0;
        descerPecaTabuleiro(peca,peca.linha,peca.coluna,"normal");
    } else{
        descerPecaTabuleiro(peca,peca.linha,peca.coluna,statusPeca);
    }
    
    if(statusPeca == "normal"){
        peca.addLinha();
        linhaAtual +=1
        testeGirar = 0
        testeEsquerda = 0
    }

    retornoColisao = false
    colidiuEsquerda = false
    

}

function testeAndar(){
    console.log("Peça andou");
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
}


console.log("chave pressionada" +evt.keyCode)
//var tq = peca.encostado(tabuleiro);
//var aa = tq & 2;
//var bb = tq & 4;
//if (evt.keyCode == 39 && bb == 0) peca.x++;
//if (evt.keyCode == 37 && aa == 0) peca.x--;
//if (evt.keyCode == 40) avancarJogo();
//desenharTudo();
}
