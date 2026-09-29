var dificuldade = 3
var marge = 2
var velocidade = 100
var tempo = 100
const operadores = ["+", "-", "x", "/"]
var operador = operadores[Math.floor(Math.random() * operadores.length)]

function gerarConta(){
    number1 = Math.floor(Math.random() * dificuldade) + marge
    number2 = Math.floor(Math.random() * dificuldade) + marge
    operador = operadores[Math.floor(Math.random() * operadores.length)];
}

function resolverConta(){
    if(operador == "+"){ return number1 + number2}
    if(operador == "-"){ return number1 - number2}
    if(operador == "X"){ return number1 * number2}
    if(operador == "/"){ return (number1*number2) / number2}
}

function atualizar(){
    if (document.getElementById("result").value == resolverConta()) {
            document.getElementById("descri").textContent = "acerto"
            dificuldade = dificuldade + 5
            marge = marge + 1
            velocidade = velocidade - 1
            console.log(dificuldade + " " + marge  + " " + velocidade)
        } else {
            document.getElementById("descri").textContent = "erro"
            dificuldade = 10
            marge = 2
            velocidade = 100
        }
        document.getElementById("descri").style.display = "flex"
    gerarConta()
    document.getElementById("conta").textContent = `${(number1*number2)} ${operador} ${number2}`;
}

function iniciarTimer() {
    if (tempo > 0) {
        tempo--;
    } else {
        tempo = 100
        atualizar();
    }

    document.getElementById("tempo").value = tempo;

    setTimeout(iniciarTimer, velocidade);
}
iniciarTimer();

gerarConta()
document.getElementById("conta").textContent = `${(number1*number2)} ${operador} ${number2}`;
document.getElementById("descri").style.display = "none"

document.getElementById("result").addEventListener("keydown", function (event) {

    
    if (event.key === "Enter") {
        
        atualizar()
        tempo = 100
        document.getElementById("result").value = ""
    }
});