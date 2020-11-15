var retornoColisao 

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


function descerPecaTabuleiro(peca,linhainicial,colunainicial){

    var colunaAux = colunainicial;

    if((linhainicial > 0) && (linhainicial < qtdLinhas)){
        var linhaAnterior = linhainicial -1;
        removerMovimentoAnterior(peca,linhaAnterior,3)
    }

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

                    colisaoAbaixo(proximoElemento,elemento)
                
                    mudaCorTabuleiro(elemento,peca.cor)
                }
            }
            colunainicial += 1;
        }
        colunainicial = colunaAux;
        linhainicial += 1;
        peca.addLinha();

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
        peca.addLinha();

    }

}

function colisaoAbaixo(elemento,elementoAtual){
  
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
        elemento.style.backgroundColor = cor;
        elemento.removeAttribute("status")
        elemento.removeAttribute("style")
    }
}

function teste(){

    //alert("teste")   
    if(linhaAtual >= qtdLinhas){
        peca = pecaAleatoria();
        linhaAtual = 0;
        descerPecaTabuleiro(peca,peca.linha,peca.coluna);
    } else{
        descerPecaTabuleiro(peca,linhaAtual,peca.coluna);
    }
    
    linhaAtual +=1
    retornoColisao = false

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

if (evt.keyCode == 37) {

    peca.girarEsquerda();
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
