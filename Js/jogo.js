var fimDeJogo = false 
var girar = false
var statusOriginal = 1
var verificadorNulo = false
var verificaGirada = false
var lPrimeiraVez = true
var testeExtremidade = 0
var modoInvertido = false;
let peca;

const conjuntoPecas = [
    [I,'red',0],
    [J,'green',0],
    [L,'yellow',0],
    [O,'blue',0],
    [T,'magenta',0],
    [W,'cyan',0],
    [E,'orange',0],
];

var finaldeJogo1 = false;
var finaldeJogo2 = false;
var fimNormal = false;
var fimInvertido = false;

var testeGirar = 0
var testeEsquerda = 0
var pontuacao = 0;
var linhasEliminadas = 0;
var linhaAtual = 0;
var nivel = 0;
var qtdLinhas;
var qtdColunas;
var segundos = 0;
var velocidade = 500;
var pontosVelocidade = 0;

var qtdLinhas = 20
var qtdColunas = 10 

var manual = false;
var manualSubida = false;

function gameStart(qtdCol,qtdLin) {

qtdLinhas = qtdLin
qtdColunas = qtdCol

    criaTabuleiro(qtdColunas,qtdLinhas)
    
    peca = pecaAleatoria();

    descidaAutomatica();


}
setInterval(descidaAutomatica, velocidade)