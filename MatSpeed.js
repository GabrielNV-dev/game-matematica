var modo = "normal"
let timer
document.querySelectorAll(".modo").forEach(function (elemento) {
    elemento.addEventListener("click", function (event) {
        modo = elemento.id
        document.querySelectorAll(".modo").forEach(function (botoes) {botoes.style.display = "none"})
        document.getElementById("classico").style.display = "flex"
        iniciarTimer();
        
    })
})

var dificuldade = 10
var marge = 2
var velocidade = 100
var tempo = 100
var vida = 3

if(modo == "ultima vida"){vida = 1}
else if(modo == "técnico"){}
else if(modo == "ilimitado"){}
var serie = 0
var acerto = 0
var erros = 0

const operadores = ["+", "-", "x", "/"]
var operador = operadores[Math.floor(Math.random() * operadores.length)]

function encerrar(){
    clearTimeout(timer);
    document.getElementById("morte").style.display = "flex"
}

function gerarConta() {
    operador = operadores[Math.floor(Math.random() * operadores.length)];
    if (operador == "x") {
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
                
        if(modo == "contra tempo"){tempo = tempo + 30}else{velocidade = velocidade - 1}
        acerto++
        serie++
    } else {
        document.getElementById("descri").textContent = "erro"
        vida--
        dificuldade = dificuldade - 2
        velocidade = 100
        serie = 0
        erros++
    }
    document.getElementById("vida").textContent = "❤️ ".repeat(vida)
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
    if (tempo > 0) {
        tempo--;
    } else {
        if(modo == "contra tempo"){}else{tempo = 100}
        atualizar();
    }

    document.getElementById("tempo").value = tempo;

    timer = setTimeout(iniciarTimer, velocidade);
}


gerarConta()
if (operador == "/") {
    document.getElementById("conta").textContent = `${(number1 * number2)} ${operador} ${number2}`;
} else {
    document.getElementById("conta").textContent = `${number1} ${operador} ${number2}`;
}


document.getElementById("vida").textContent = "❤️ ".repeat(vida)
document.getElementById("descri").style.display = "none"
document.getElementById("result").addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        if (vida == 0){
            encerrar()
        }
        console.log(vida)
        atualizar()
        if(modo == "contra tempo"){}else{tempo = 100}
        document.getElementById("result").value = ""
    }
});