var fimDeJogo = false 
var pontuacao;
var linhaAtual = 0;
var qtdLinhas;
var qtdColunas;
//comecarJogo();
qtdLinhas = 20
qtdColunas = 10

criaTabuleiro(qtdColunas,qtdLinhas)

const conjuntoPecas = [
    [I,'red',0],
    [J,'green',0],
    [L,'yellow',0],
    [O,'blue',0],
    [T,'purple',0],
    [W,'cyan',0],
    [E,'orange',0],
];

let peca = pecaAleatoria();

setInterval(teste, 1000)
//colocaPecaTabuleiro(peca,0,3);


/*
var elemento = document.getElementById("linha0 coluna7")

mudaCorTabuleiro(elemento,peca.cor);*/