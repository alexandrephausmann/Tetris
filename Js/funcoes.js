var retornoColisao 
var colidiuEsquerda
var colunaAux
var indoProAlem 

function criaTabuleiro(colunas,linhas){
    
    console.log("teste")
    let tr = "";
    let td = "";
    var table = document.createElement('table');
    var x = document.getElementsByClassName("corpo");
    x[0].innerHTML = "";

    for(let i=0;i<linhas;i++){

        tr = document.createElement('tr');
        tr.setAttribute('id', 'linha' + i.toString() );
        table.appendChild(tr);
        for(let x=0;x<colunas;x++){
            td = document.createElement('td');
            td.setAttribute('id', 'linha' + i.toString() + ' coluna' + x.toString()  );
            var px = 154/qtdLinhas;
            var width = 100;

          if(qtdLinhas == 20){
                px = 10;
                width = 0;
            }

            td.style.padding = px + "px";
            td.style.width = width + "px";
            table.appendChild(td);           

        }
    }

    x[0].appendChild(table);
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
    if(modoInvertido){
        manualSubida = true;
        subidaAutomatica()
        manualSubida = false;
    }else{
        peca.girarEsquerda();
    }
   
}else if (evt.keyCode == teclaEsquerda) {

    peca.andarEsquerda();
}else if (evt.keyCode == teclaDireita) {

    peca.andarDireita();
}else if (evt.keyCode == teclaBaixo) {
    
    if(modoInvertido){
        peca.girarEsquerda(); 
    }else{
        manual = true;
        descidaAutomatica()
        manual = false;
    }
    
}

console.log("chave pressionada" +evt.keyCode)

}

function descidaAutomatica(){

    if(modoInvertido){
       
        if(!finaldeJogo1 && !finaldeJogo2){
            subidaAutomatica();
        }else{
            if(!fimInvertido){
                setTimeout(function(){ alert("Fim de jogo " ); }, 50)
                fimInvertido = true;
            }
        }
           
    }else{
        if(!fimDeJogo && !finaldeJogo2){

            if(!manual){
                tempo = document.getElementById("tempo")
                
                tempo.innerHTML = parseInt(segundos);

                segundos = segundos + (velocidade/1000)
            }
            
            if(linhaAtual >= qtdLinhas){
                peca = pecaAleatoria();
                linhaAtual = 0;
            
            }
            
            var pecaAtual = []
            var novaPeca = []
            var colisao

            pecaAtual = mapearPeca(peca,peca.linha,peca.coluna)
        
            novaPeca = mapearNovaPeca(peca,peca.linha,peca.coluna)
        
            colisao = colisaoBaixo(novaPeca,"AUTOMATICO")
        
            if(!colisao){
                retirarPeca(pecaAtual)
                colocarPeca(novaPeca)
            }else{
                mudaStatusParado(pecaAtual)
                verificaFimDeJogo(novaPeca)
            }
            
            
            peca.addLinha();
            linhaAtual +=1
            quantidadeGiros = 0
            colidiuEsquerda = false
            testeGirandoAndando = 0
        }else{
            if(!fimNormal){
                finaldeJogo1 = true;
                setTimeout(function(){ alert("Fim de jogo " ); }, 50)
                fimNormal = true;
            }
        }
    }
    

}

function subidaAutomatica(){

    if(!finaldeJogo1){

        if(!manualSubida){
            tempo = document.getElementById("tempo")
       
            tempo.innerHTML =  parseInt(segundos)

            segundos = segundos + (velocidade/1000)
        }

        if(linhaAtual < 0){
            peca = pecaAleatoria();
            linhaAtual = qtdLinhas - 1;
            peca.setLinha(linhaAtual);
    
        }
        var pecaAtual = []
        var novaPeca = []
        var colisao

        pecaAtual = mapearPeca(peca,peca.linha,peca.coluna)
    
        novaPeca = mapearNovaPeca(peca,peca.linha-2,peca.coluna)
    
        colisao = colisaoCima(novaPeca,"AUTOMATICO")
    
        if(!colisao){
            retirarPeca(pecaAtual)
            colocarPeca(novaPeca)
        }else{
            mudaStatusParado(pecaAtual)
            verificaFimDeJogo(novaPeca)
        }
        
        
        peca.removeLinha();
        linhaAtual -=1
        quantidadeGiros = 0
        colidiuEsquerda = false
        testeGirandoAndando = 0
    }

}

function colisaoCima(proximaPeca,statsPeca){
    
    var pecaTeste;
    var retorno = false
    var ultimaColuna = "coluna" + qtdColunas
    var testeColisao = false
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
                    linhaAtual = -1;
                }
                
                retorno = true;
                
            }
        }else{
            if(statsPeca == "AUTOMATICO"){
                linhaAtual = -1;
            }
            retorno = true;
            testeColisao = true

        }
    }

    return retorno;

}



function verificaFimDeJogo(novaPeca){

    var pecaTeste;
    var ultimaColuna = "coluna" + qtdColunas
    var testeColisao = false
    var testeFimJogo = false
    var linhaFinal = 0;
    indoProAlem = false

    for(var nY = 0; nY<novaPeca.length;nY++){

        pecaTeste = document.getElementById(novaPeca[nY]);

        if((novaPeca[nY].indexOf("coluna-1") != -1) || novaPeca[nY].indexOf(ultimaColuna) != -1){
            indoProAlem = true
        }

        if(modoInvertido){
            linhaFinal = qtdLinhas - 2;
        }
        if((novaPeca[nY].indexOf("linha" + linhaFinal) != -1)){

            if(pecaTeste != null){
                    
                var status = pecaTeste.getAttribute("status");
                if(status == "parado"){
                    testeFimJogo = true;
                    pintarQuadrado(pecaTeste,peca.cor)
                    fimDeJogo = true; 
                    const audio=document.querySelector('.Galvao');
                    audio.play();

                    if(modoInvertido){
                        //pintarPeca(novaPeca);
                        finaldeJogo2 = true;
                    }
                }
            }
        }

    }

}

function girarPeca(statusNovo,statusAntigo){

    peca.setStatus(statusAntigo)

    var pecaAtual = []
    var novaPeca = []
    var colisao
    if(quantidadeGiros > 1){
        if(modoInvertido){
            pecaAtual = mapearPeca(peca,peca.linha,peca.coluna)
        }else{
            pecaAtual = mapearPeca(peca,peca.linha+1,peca.coluna)
        }
    }else{
        pecaAtual = mapearPeca(peca,peca.linha,peca.coluna)
    }
   
    peca.setStatus(statusNovo)

    if(modoInvertido){
        novaPeca = mapearNovaPeca(peca,peca.linha-1,peca.coluna)
    }else{
        novaPeca = mapearNovaPeca(peca,peca.linha,peca.coluna)
    }
   
    colisao = colisaoBaixo(novaPeca,"GIRAR")

    if(!colisao){
        retirarPeca(pecaAtual)
        colocarPeca(novaPeca)
    }else{
        if(!indoProAlem){
           
        mudaStatusParado(pecaAtual)
            
        }else{
            peca.setStatus(statusAntigo)
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

    if(quantidadeGiros > 0){
        if(modoInvertido){
            pecaAtual = mapearPeca(peca,peca.linha,peca.coluna)
        }else{
            pecaAtual = mapearPeca(peca,peca.linha + 1,peca.coluna)
        }
        
    
    }else{
        pecaAtual = mapearPeca(peca,peca.linha,peca.coluna)
    }

    peca.setColuna(novaColuna)
    
    verificadorVazio = verificaColunaVazia(novaColuna)
    
    if(quantidadeGiros > 0){
        if(modoInvertido){
            novaPeca = mapearNovaPeca(peca,peca.linha-1,peca.coluna)
        }else{
            novaPeca = mapearNovaPeca(peca,peca.linha,peca.coluna)
        }
        
    }else{
        novaPeca = mapearNovaPeca(peca,peca.linha-1,peca.coluna)
    }

    colisao = colisaoBordaEsquerda(novaPeca)

    if(!colisao || verificadorVazio){
        retirarPeca(pecaAtual)
        colocarPeca(novaPeca)
    }else{
        peca.setColuna(colunaAntiga)
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

    if(quantidadeGiros > 0){

        if(modoInvertido){
            pecaAtual = mapearPeca(peca,peca.linha ,peca.coluna)
        }else{
            pecaAtual = mapearPeca(peca,peca.linha + 1,peca.coluna)
        }
        
    }else{
        pecaAtual = mapearPeca(peca,peca.linha,peca.coluna)
    }

    peca.setColuna(novaColuna)
    
    verificadorVazio = verificaColunaVazia(novaColuna)
    
    if(quantidadeGiros > 0){

        if(modoInvertido){
            novaPeca = mapearNovaPeca(peca,peca.linha -1,peca.coluna)
        }else{
            novaPeca = mapearNovaPeca(peca,peca.linha,peca.coluna)
        }
  
    }else{
        novaPeca = mapearNovaPeca(peca,peca.linha-1,peca.coluna)
    }

    colisao = colisaoBordaDireita(novaPeca)

    if(!colisao || verificadorVazio){
        retirarPeca(pecaAtual)
        colocarPeca(novaPeca)
    }else{
        peca.setColuna(colunaAntiga)
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

    retirarLinhas(pecaParada)
    
}

function mapearPeca(peca,linhainicial,colunainicial){

    linhainicial = linhainicial - 1
    var colAux
    colAux = colunainicial 
    var MapPeca = [];

    for(var i=0;i < peca.id[peca.status].length;i++){

        for(var k=0;k<peca.id[peca.status][i].length;k++){
            
            if(linhainicial >= 0){

                if(peca.id[peca.status][i][k] == 1){  
                    MapPeca.push("linha"+linhainicial + " coluna" + colunainicial); 
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

    var colAux
    colAux = colunainicial 

    var pecaNova = [];

    for(var i=0;i < peca.id[peca.status].length;i++){

        for(var k=0;k<peca.id[peca.status][i].length;k++){

            if(peca.id[peca.status][i][k] == 1){              
                
                pecaNova.push("linha"+linhainicial + " coluna" + colunainicial);    
 
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
        if(pecaUnica != null){

            var teste = pecaUnica.getAttribute("status")
            if(teste != "parado"){   
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
    var testeColisao = false
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
            testeColisao = true

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

function retirarLinhas(pecaParada){

    var linhasRetiradas = []; 
    var quadradoTabuleiro;
    var statusQuadrado;
    var linhaCompleta = true;
    
    for(var nX = 0; nX<qtdLinhas;nX++){


        for(var nY = 0;nY<qtdColunas;nY++){
            quadradoTabuleiro = document.getElementById('linha' + nX.toString() + ' coluna' + nY.toString());
            statusQuadrado = quadradoTabuleiro.getAttribute('status')
            if(statusQuadrado != "parado"){
                linhaCompleta = false;
                break;
            }

        }
        if(linhaCompleta){
            linhasRetiradas.push(nX)
        }
        linhaCompleta = true;

    }

    if(linhasRetiradas.length > 0){
        
        console.log("Linha completa")
        var pontos
        var linhasTiradas
        var nivelJogo
        var nivelAntigo=nivel;

        const audioMoeda =document.querySelector('.Moeda');
        audioMoeda.play();
        
        pontos = document.getElementById("pontuacao")

        pontuacao = parseInt(pontuacao)  
        
        pontuacao = pontuacao + ((linhasRetiradas.length * 10) * linhasRetiradas.length)
        pontosVelocidade = pontosVelocidade + ((linhasRetiradas.length * 10) * linhasRetiradas.length);
        pontos.innerHTML = pontuacao;

        linhasTiradas = document.getElementById("linhas_eliminadas")

        linhasEliminadas = linhasEliminadas + linhasRetiradas.length

        linhasTiradas.innerHTML = linhasEliminadas;
        
        nivelJogo = document.getElementById("nivel_dificuldade")

        nivel = Math.trunc(linhasEliminadas/5);

        nivelJogo.innerHTML = nivel;

        if(pontosVelocidade >= 300){
            velocidade = velocidade - 25;
            if(velocidade < 50){
                velocidade = 50;
            }
            pontosVelocidade = 0;
            setInterval(descidaAutomatica, velocidade)
        }

        console.log("Linhas preenchidas " + linhasRetiradas.length)
        var quadrado;

        for(var j = 0;j<linhasRetiradas.length;j++){

            for(var nY = 0;nY<qtdColunas;nY++){

                quadrado = document.getElementById('linha' + linhasRetiradas[j].toString() + ' coluna' + nY.toString());

                retirarQuadrado(quadrado)
            }
        }

        restaurarTabuleiro(linhasRetiradas)
        
        if(peca.cor == "orange"){
            if(modoInvertido){
                modoInvertido = false;
                linhaAtual = qtdLinhas;
            }else{
                modoInvertido = true; 
                linhaAtual = - 1;
            }
            
            inverterTabuleiro();
            retirarQuadrado(pecaParada)
            
        }
    }
}

function retirarQuadrado(quadrado){

    if(quadrado != null){
     
        if(quadrado.style != undefined){
            quadrado.style.backgroundColor = "white";
            quadrado.removeAttribute("status")
        }
 
    }
}

function restaurarTabuleiro(linhasRetiradas){
    
    if(modoInvertido){
        restTabInvertido(linhasRetiradas);
        
    }else{
            
        var inicioLinha;
        var dadosLinha = []
        var dadosQuadrado = []
        var corQuadrado;
        var indiceLinha = 1;
        var linhasAbaixo = 1;
        var linhasAcima = 1;
        inicioLinha = linhasRetiradas[linhasRetiradas.length-1] - 1

        for(var j = inicioLinha;j>0;j--){
            if(linhasRetiradas[indiceLinha] == j){
                
                if(linhasRetiradas[indiceLinha] == (linhasRetiradas[indiceLinha-1] - 1 )){
                    linhasAbaixo = linhasAbaixo + 1  
                }
                if(linhasRetiradas[indiceLinha] == (linhasRetiradas[indiceLinha-1] + 1 )){
                    linhasAcima = linhasAcima + 1  
                }
                indiceLinha = indiceLinha + 1
                
            }else{
                for(var nY = 0;nY<qtdColunas;nY++){

                    quadradoTabuleiro = document.getElementById('linha' + j.toString() + ' coluna' + nY.toString());
                    statusQuadrado = quadradoTabuleiro.getAttribute('status')
                    if(statusQuadrado == "parado"){
                        corQuadrado = quadradoTabuleiro.style.backgroundColor
                        dadosQuadrado.push(corQuadrado,nY.toString())
        
                        dadosLinha.push(dadosQuadrado)

                        dadosQuadrado = []
                        retirarQuadrado(quadradoTabuleiro)
                    }
        
                }
                linhasAbaixo = verificarColunasAbaixo(j,linhasRetiradas)
                if(dadosLinha.length>0){
               
                    pintarAbaixo(j,linhasAbaixo,dadosLinha)
  
                }
                dadosLinha = []
                linhasAbaixo = 1;
            }    

        }

}

function restTabInvertido(linhasRetiradas){
    
    var inicioLinha;
    var dadosLinha = []
    var dadosQuadrado = []
    var corQuadrado;
    var indiceLinha = 1;
    var linhasAbaixo = 1;
    var linhasAcima = 1;

    inicioLinha = linhasRetiradas[0] + 1  

    for(var j = inicioLinha;j<qtdLinhas-1 ;j++){
        if(linhasRetiradas[indiceLinha] == j){

            if(linhasRetiradas[indiceLinha] == (linhasRetiradas[indiceLinha-1] + 1 )){
                linhasAcima = linhasAcima + 1  
            }
            indiceLinha = indiceLinha + 1
            
        }else{
            for(var nY = 0;nY<qtdColunas;nY++){

                quadradoTabuleiro = document.getElementById('linha' + j.toString() + ' coluna' + nY.toString());
                statusQuadrado = quadradoTabuleiro.getAttribute('status')
                if(statusQuadrado == "parado"){
                    corQuadrado = quadradoTabuleiro.style.backgroundColor
                    dadosQuadrado.push(corQuadrado,nY.toString())
    
                    dadosLinha.push(dadosQuadrado)

                    dadosQuadrado = []
                    retirarQuadrado(quadradoTabuleiro)
                }
    
            }
            linhasAcima = verificarColunasAcima(j,linhasRetiradas)
            
            if(dadosLinha.length>0){

                pintarAcima(j,linhasAcima,dadosLinha)
               
            }
            dadosLinha = []
            linhasAcima = 1;
        }    

    }

}



function verificarColunasAbaixo(j,linhasRetiradas){

    var cont = 0;

    for(var aux=0;aux<linhasRetiradas.length;aux++){
        if(j<linhasRetiradas[aux]){
            cont = cont + 1
        }
    }

    return cont

}

function verificarColunasAcima(j,linhasRetiradas){
    var cont = 0;

    for(var aux=0;aux<linhasRetiradas.length;aux++){
        if(j>linhasRetiradas[aux]){
            cont = cont + 1
        }
    }

    return cont

}

function pintarAcima(linhaAtual,linhaAcima,dadosLinha){

    var pintarLinha = linhaAtual - linhaAcima

    for(var nY = 0;nY<dadosLinha.length;nY++){

        quadradoTabuleiro = document.getElementById('linha' + pintarLinha + ' coluna' + dadosLinha[nY][1]);
        pintarQuadrado(quadradoTabuleiro,dadosLinha[nY][0])
    }

    }

}

function pintarAbaixo(linhaAtual,linhasAbaixo,dadosLinha){

    var pintarLinha = linhaAtual + linhasAbaixo

    for(var nY = 0;nY<dadosLinha.length;nY++){

        quadradoTabuleiro = document.getElementById('linha' + pintarLinha + ' coluna' + dadosLinha[nY][1]);
        pintarQuadrado(quadradoTabuleiro,dadosLinha[nY][0])
    }

}

function pintarQuadrado(quadradoTabuleiro,cor){

    quadradoTabuleiro.style.backgroundColor = cor;
    quadradoTabuleiro.setAttribute('status','parado');

}

function inverterTabuleiro(){

    var tabuleiroNormal =[];
    var dadosLinha = [];
    var dadosQuadrado = [];
    var dadosTabuleiro = [];
    var quadradoTabuleiro;
    var statusQuadrado;

    for(var nX = 0; nX<qtdLinhas;nX++){
        
        for(var nY = 0; nY<qtdColunas;nY++){

            quadradoTabuleiro = document.getElementById('linha' + nX.toString() + ' coluna' + nY.toString());
            statusQuadrado = quadradoTabuleiro.getAttribute('status')
            if(statusQuadrado == "parado"){
                corQuadrado = quadradoTabuleiro.style.backgroundColor
                dadosQuadrado.push(corQuadrado,nY.toString(),nX.toString())

                dadosLinha.push(dadosQuadrado)
                dadosQuadrado = []
                retirarQuadrado(quadradoTabuleiro)
            }
    
        }
        if(dadosLinha.length > 0){
            dadosTabuleiro.push(dadosLinha);
        }
        
        dadosLinha = []
    
    }

    inverterLinhas(dadosTabuleiro);

}

function  inverterLinhas(dadosTabuleiro){
    
    var quadradoTabuleiro;

    for(nI = 0;nI < dadosTabuleiro.length;nI++){

        for(nK = 0;nK < dadosTabuleiro[nI].length;nK++ ){

            var linha = parseInt(dadosTabuleiro[nI][nK][2]);
            linha = (linha - (qtdLinhas-1)) * -1  ;
            var coluna = parseInt(dadosTabuleiro[nI][nK][1]);

            var cor = dadosTabuleiro[nI][nK][0];

            quadradoTabuleiro = document.getElementById('linha' + linha + ' coluna' + coluna);
            pintarQuadrado(quadradoTabuleiro,cor)

        }


    } 
}