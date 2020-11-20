var fimDeJogo = false 
var girar = false
var statusOriginal = 1
var verificadorNulo = false
var verificaGirada = false
var lPrimeiraVez = true
var testeExtremidade = 0
var testeGirar = 0
var testeEsquerda = 0
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

//setInterval(descerPeca, 500)

setInterval(descidaAutomatica, 500)

//colocaPecaTabuleiro(peca,0,3);


/*
var elemento = document.getElementById("linha0 coluna7")

mudaCorTabuleiro(elemento,peca.cor);*/