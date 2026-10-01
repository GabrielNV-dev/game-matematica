var modo = "normal"
let timer

document.querySelectorAll(".modo").forEach(function (elemento) {
    elemento.addEventListener("click", function (event) {
        modo = elemento.id
        document.body.style.backgroundColor = "black"
        if (modo == "ultima vida") { vida = 1 }
        else if (modo == "técnico") { }
        if (modo == "voltar") { window.location.reload() }
        document.querySelectorAll(".modo").forEach(function (botoes) { botoes.style.display = "none" })
        document.getElementById("classico").style.display = "flex"
        iniciarTimer();
        gerarConta()
        if (operador == "/") {
            document.getElementById("conta").textContent = `${(number1 * number2)} ${operador} ${number2}`;
        } else {
            document.getElementById("conta").textContent = `${number1} ${operador} ${number2}`;
        }

        if (modo == "contra tempo") { } else { document.getElementById("vida").textContent = "❤️ ".repeat(vida) }
        document.getElementById("descri").style.display = "none"
        
        if (modo == "ilimitado") {  document.getElementById("voltar").style.display = "flex" }

    })
})

var dificuldade = 10
var marge = 2
var velocidade = 100
var tempo = 100
var vida = 3

var serie = 0
var acerto = 0
var erros = 0

const operadores = ["+", "-", "x", "/"]
var operador = operadores[Math.floor(Math.random() * operadores.length)]

function encerrar() {
    clearTimeout(timer);

    document.getElementById("conta").style.display = "none"
    document.getElementById("descri").style.display = "none"
    document.getElementById("morte").style.display = "flex"
    document.getElementById("result").style.display = "none"

    document.getElementById("voltar").style.display = "flex"
}

function gerarConta() {
    operador = operadores[Math.floor(Math.random() * operadores.length)];
    number1 = Math.floor(Math.random() * (dificuldade - (dificuldade * 0.7))) + 2
    number2 = Math.floor(Math.random() * (dificuldade - (dificuldade * 0.7))) + 2

    if (operador == "-") {
        number1 = Math.floor(Math.random() * dificuldade) + marge
        number2 = Math.floor(Math.random() * dificuldade) + marge

        if (number1 < number2) {
            [number1, number2] = [number2, number1]
        }
    }
    else if (operador == "x") {
        number1 = Math.floor(Math.random() * (dificuldade - (dificuldade / 2))) + 2
        number2 = Math.floor(Math.random() * (dificuldade - (dificuldade / 2))) + 2
    } else if (operador == "/") {
        number1 = Math.floor(Math.random() * (dificuldade - (dificuldade * 0.7))) + 2
        number2 = Math.floor(Math.random() * (dificuldade - (dificuldade * 0.7))) + 2
    }
    else {
        number1 = Math.floor(Math.random() * dificuldade) + marge
        number2 = Math.floor(Math.random() * dificuldade) + marge
    }
}

function resolverConta(number1, number2) {
    if (operador == "+") { return (number1 + number2) }
    if (operador == "-") { return (number1 - number2) }
    if (operador == "x") { return (number1 * number2) }
    if (operador == "/") { return ((number1 * number2) / number2) }
}

function atualizar() {

    if (document.getElementById("result").value == resolverConta(number1, number2)) {
        document.getElementById("descri").textContent = "acerto"
        dificuldade = dificuldade + 4

        if (modo == "contra tempo") { tempo = tempo + 30 } else { velocidade = velocidade - 1 }
        acerto++
        serie++
    } else {
        document.getElementById("descri").textContent = "erro"
        if (modo == "ilimitado") {} else {vida--}
        dificuldade = dificuldade - 2
        velocidade = 100
        serie = 0
        erros++
    }
    if (modo == "contra tempo") { } else { document.getElementById("vida").textContent = "❤️ ".repeat(vida) }
    document.getElementById("descri").style.display = "flex"
    gerarConta()
    document.getElementById("info").textContent = `acertos: ${acerto}   série: ${serie}   erros: ${erros}`;
    if (operador == "/") {
        document.getElementById("conta").textContent = `${(number1 * number2)} ${operador} ${number2}`;
    } else {
        document.getElementById("conta").textContent = `${number1} ${operador} ${number2}`;
    }

}
function iniciarTimer() {
    timer = setTimeout(iniciarTimer, velocidade);

    if (vida == 0) {
        encerrar()
    }
    if (tempo > 0) {
        tempo--;
    } else {
        if (modo == "contra tempo") { } else { tempo = 100 }
        atualizar();
    }
    document.getElementById("tempo").value = tempo;
}
document.getElementById("result").addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        atualizar()
        if (modo == "contra tempo") { } else { tempo = 100 }
        document.getElementById("result").value = ""
    }
});