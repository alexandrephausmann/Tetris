function criaTabuleiro(colunas,linhas){
    
    console.log("teste")
    let tr = "";
    let td = "";
  /*  var divLinha = ""; 
    var divColuna = ""; 
    var divJogo = "";*/
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    var x = document.getElementsByClassName("corpo");
    x[0].innerHTML = "";

    for(let i=0;i<linhas;i++){

       // divLinha = document.createElement('div');
        //divJogo.appendChild(divLinha);
        tr = document.createElement('tr');
        tr.setAttribute('id', 'linha' + i.toString() );
        table.appendChild(tr);
        for(let x=0;x<colunas;x++){
            td = document.createElement('td');
            td.setAttribute('id', 'linha' + i.toString() + ' coluna' + x.toString()  );
            table.appendChild(td);           
            //divColuna = document.createElement('div');
           // divLinha.appendChild(divColuna);
        }
    }
    table.appendChild(tbody);

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

    for(var i=0;i < peca.id[peca.status].length;i++){

        for(var k=0;k<peca.id[peca.status][i].length;k++){

            if(peca.id[peca.status][i][k] == 1){              
                if (linhainicial < qtdLinhas){
                    var elemento = document.getElementById("linha"+linhainicial + " coluna" + colunainicial);
                    var proximaLinha = linhainicial + 1 ;
                    var proximoElemento = document.getElementById("linha"+ proximaLinha + " coluna" + colunainicial);
                    colisaoAbaixo(proximoElemento)
                
                    mudaCorTabuleiro(elemento,peca.cor)
                }
            }
            colunainicial += 1;
        }
        colunainicial = colunaAux;
        linhainicial += 1;

    }
    

}

function removerMovimentoAnterior(peca,linhainicial,colunainicial){

    var colunaAux = colunainicial;

    for(var i=0;i < peca.id[peca.status].length;i++){

        for(var k=0;k<peca.id[peca.status][i].length;k++){
 
            var elemento = document.getElementById("linha"+linhainicial + " coluna" + colunainicial);
            tiraElementoTabuleiro(elemento)
            colunainicial += 1;
        }
        colunainicial = colunaAux;
        linhainicial += 1;

    }

}

function colisaoAbaixo(elemento){

    if(elemento != null){
        var corFundo = window.getComputedStyle(elemento);
        if((corFundo.backgroundColor!="rgb(255, 255, 255)" && elemento.status == "parado") || (corFundo.backgroundColor== null)){
            linhaAtual = qtdLinhas;
        }
    }else{
        linhaAtual = qtdLinhas;
    }

    
}


function mudaCorTabuleiro(elemento,cor) {

    elemento.style.backgroundColor = cor;
    elemento.setAttribute('status','movimento');

}

function tiraElementoTabuleiro(elemento) {
    
    if(elemento != null){
        var cor = "white"
        elemento.style.backgroundColor = cor;
    }
}

function teste(){

    //alert("teste")    
    descerPecaTabuleiro(peca,linhaAtual,3);
    linhaAtual +=1

}