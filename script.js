const operacaoAnteriorTexto = document.querySelector('#operacao_anterior');
const operacaoAtualTexto = document.querySelector('#operacao_atual');
const botoes = document.querySelectorAll('#botoes_container');
let operacaoAtual;

function adicionarDigito(digito) {
    if (digito == "." && operacaoAtualTexto.innerText.includes(".")) {
        return;
    }
    operacaoAtual = digito;
    atualizarTela();
}

function calcular(operacao) {
    if (operacaoAtualTexto.innerText === "" && operacao != "C") {
        if (operacaoAnteriorTexto != "") {
            mudarOperacao(operacao);
        }
        return;
    }
    let resultado = ""; 
    let atual = +operacaoAtualTexto.innerText;
    let anterior = +operacaoAnteriorTexto.innerText.split(" ")[0];

    switch (operacao) {
        case "+":
            resultado = anterior + atual;
            atualizarTela(resultado, operacao, atual, anterior)
            break;
        case "-":
            resultado = anterior - atual;
            atualizarTela(resultado, operacao, atual, anterior)
            break;
        case "X":
            resultado = anterior * atual;
            atualizarTela(resultado, operacao, atual, anterior)
            break;
        case "/":
            resultado = anterior / atual;
            atualizarTela(resultado, operacao, atual, anterior)
            break;
        case "%":
            if (anterior != "") {
                resultado = (anterior / 100) * atual;
            } else {
                resultado = (anterior / 100);
            }
            atualizarTela(resultado, operacao, atual, anterior)
            break;
        case "del":
           deletarDigito();
            break;
        case "C":
            limparTela();
            break;
        case "=":
           igual();
            break;
        default:
            return;
    }
    return resultado;
}


function atualizarTela(
    resultado = null, //resultado da operação
    operacao = null, //operação
    atual = null,
    anterior = null) {

    if (operacao == null) {
        operacaoAtualTexto.innerText += operacaoAtual;
        return;
    }
    if (anterior === 0 || anterior === null) {
        resultado = atual;
    }
    if(operacao == "%"){
        operacaoAnteriorTexto.innerText = `${resultado} ${operacao} X`;
    }else{
         operacaoAnteriorTexto.innerText = `${resultado} ${operacao}`;
    }
   
    operacaoAtualTexto.innerText = " ";

}

function mudarOperacao(operacao) {
    const operacoesMatematicas = ["+", "-", "X", "/", "%"];

    if (!operacoesMatematicas.includes(operacao)) {
        return;
    }
    operacaoAnteriorTexto.innerText = operacaoAnteriorTexto.innerText.slice(0, -1) + operacao; //retira ultimo caractere e concatena nova operação
}

function deletarDigito() {
    if (operacaoAtualTexto != "") {
        operacaoAtualTexto.innerText = operacaoAtualTexto.innerText.slice(0, -1);
    }
}

function limparTela() {
    operacaoAtualTexto.innerText = "";
    operacaoAnteriorTexto.innerText = "";
}

function igual(){
    const operacao = operacaoAnteriorTexto.innerText.split(" ")[1];
    resultado = calcular(operacao);
    if(resultado != null){
       operacaoAtualTexto.innerText = resultado; 
    }
    operacaoAnteriorTexto.innerText = "";
}


botoes.forEach(bt => {
    bt.addEventListener("click", (e) => {
        const valor = e.target.value;

        if (+valor >= 0 || valor === ".") {
            adicionarDigito(valor);
        }
        else {
            calcular(valor);
        }
    })
});