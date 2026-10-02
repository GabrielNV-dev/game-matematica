var modo = "normal"
let timer
function comecar() {
    document.body.style.backgroundColor = "black"
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
}

let avancado = 0
let nivel = "facil"
let tempo_ref = 100
let contagem = [1, 1, 1, 1]
var operadores = ["+", "-", "x", "/"]

document.querySelectorAll(".configs").forEach(function (elemento) {
    elemento.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            modo = elemento.id

            if (modo == "config-tempo") { tempo = elemento.value; tempo_ref = elemento.value }
            else if (modo == "config-dificuldade") { dificuldade = elemento.value }
            else if (modo == "config-vida") { vida = elemento.value }


            document.getElementById("infos").textContent = `Vida: ${vida} | Tempo: ${tempo}s | Dificuldade: ${nivel}`
        }
    })
})


document.querySelectorAll(".ativo").forEach(function (elemento) {
    elemento.addEventListener("click", function (event) {
        modo = elemento.id

        if (modo == "+") { if (contagem[0] == 1) { contagem[0] = 0; document.getElementById("+").style.backgroundColor = "rgb(248, 12, 12)"; document.getElementById("+").textContent = "N"; } else { ; contagem[0] = 1; document.getElementById("+").style.backgroundColor = "rgb(9, 255, 9)"; document.getElementById("+").textContent = "S" } }
        else if (modo == "-") { if (contagem[1] == 1) { contagem[1] = 0; document.getElementById("-").style.backgroundColor = "rgb(248, 12, 12)"; document.getElementById("-").textContent = "N" } else { ; contagem[1] = 1; document.getElementById("-").style.backgroundColor = "rgb(9, 255, 9)"; document.getElementById("-").textContent = "S" } }
        else if (modo == "x") { if (contagem[2] == 1) { contagem[2] = 0; document.getElementById("x").style.backgroundColor = "rgb(248, 12, 12)"; document.getElementById("x").textContent = "N"; } else { ; contagem[2] = 1; document.getElementById("x").style.backgroundColor = "rgb(9, 255, 9)"; document.getElementById("x").textContent = "S" } }
        else if (modo == "/") { if (contagem[3] == 1) { contagem[3] = 0; document.getElementById("/").style.backgroundColor = "rgb(248, 12, 12)"; document.getElementById("/").textContent = "N"; } else { ; contagem[3] = 1; document.getElementById("/").style.backgroundColor = "rgb(9, 255, 9)"; document.getElementById("/").textContent = "S" } }

        let operadoresAtivos = operadores.filter(
            (operador, indice) => contagem[indice] === 1
        );
    })
})

document.querySelectorAll(".configuracao").forEach(function (elemento) {
    elemento.addEventListener("click", function (event) {
        modo = elemento.id

        if (modo == "facil") { vida = 3; tempo = 100; tempo_ref = 100; dificuldade = 10; nivel = "facil" }
        else if (modo == "medio") { vida = 3; tempo = 90; tempo_ref = 100; dificuldade = 20; nivel = "médio" }
        else if (modo == "dificil") { vida = 2; tempo = 70; tempo_ref = 100; dificuldade = 40; nivel = "dificil" }
        else if (modo == "avancado") { if (avancado == 0) { document.getElementById("configuracoes-avancadas").style.display = "flex"; document.getElementById("avancado").textContent = "avançado ^"; avancado = 1 } else { document.getElementById("configuracoes-avancadas").style.display = "none"; document.getElementById("avancado").textContent = "avançado ↓"; avancado = 0 } }
        else if (modo == "avancado") { document.getElementById("configuracoes-avancadas").style.display = "flex" }
        else if (modo == "jogar") { document.getElementById("configuracoes").style.display = "none"; comecar() }

        document.getElementById("infos").textContent = `Vida: ${vida} | Tempo: ${tempo}s | Dificuldade: ${nivel}`
    })
})
document.querySelectorAll(".modo").forEach(function (elemento) {
    elemento.addEventListener("click", function (event) {
        modo = elemento.id
        if (modo == "ultima vida") { vida = 1 }
        else if (modo == "voltar") { window.location.reload() }
        if (modo == "tecnico") {
            document.getElementById("configuracoes").style.display = "flex"
        } else { comecar() }
        document.querySelectorAll(".modo").forEach(function (botoes) { botoes.style.display = "none" })
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
    let operadoresAtivos = operadores.filter(
        (operador, indice) => contagem[indice] === 1
    );
    operador = operadoresAtivos[Math.floor(Math.random() * operadoresAtivos.length)];
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
        if (modo == "ilimitado" || modo == "contra tempo") { } else { vida-- }
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


    if (modo == "ilimitado") { document.getElementById("voltar").style.display = "flex" }
    timer = setTimeout(iniciarTimer, velocidade);
    console.log(vida)
    if (vida <= 0) {
        encerrar()
    }
    if (tempo > 0) {
        tempo--;
    } else {
        if (modo == "contra tempo") { } else { tempo = tempo_ref }
        atualizar();
    }
    document.getElementById("tempo").value = tempo;
}
document.getElementById("result").addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        atualizar()

        if (modo == "contra tempo") { } else { tempo = tempo_ref }
        document.getElementById("result").value = ""
    }
});