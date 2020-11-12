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


function colocaPecaTabuleiro(peca,linhainicial,colunainicial){

    var colunaAux = colunainicial;
    /*Criar função para ver vetores vazios da peça e retornar o valor do ultimo vetor
    que contenha conteudo igual a "1"*/ 
    if (verificaEspaco(linhainicial)){

    }else{

        if(linhainicial > 0){
            var linhaAnterior = linhainicial -1;
            removerMovimentoAnterior(peca,linhaAnterior,3)
        }
    
        for(var i=0;i < peca.id[peca.status].length;i++){
    
            for(var k=0;k<peca.id[peca.status][i].length;k++){
    
                if(peca.id[peca.status][i][k] == 1){              
                    var elemento = document.getElementById("linha"+linhainicial + " coluna" + colunainicial);
                    mudaCorTabuleiro(elemento,peca.cor)
                }
                colunainicial += 1;
            }
            colunainicial = colunaAux;
            linhainicial += 1;
    
        }
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

function verificaEspaco(linhainicial){
    var lret = false 
    
    if(linhainicial >= (qtdLinhas - 1)){
        lret = true;
    }
    return lret;
}


function mudaCorTabuleiro(elemento,cor) {

    elemento.style.backgroundColor = cor;
}

function tiraElementoTabuleiro(elemento) {

    var cor = "white"
    elemento.style.backgroundColor = cor;
}


function teste(){

    //alert("teste")    
    colocaPecaTabuleiro(peca,linhaAtual,3);
  
    

    linhaAtual +=1

}