const dificuldade = 100
const marge = 5
var tempo = 100
function gerarConta(){
    number1 = Math.floor(Math.random() * dificuldade) + marge
    number2 = Math.floor(Math.random() * dificuldade) + marge
}

function atualizar(){
    if (document.getElementById("result").value == (number1 + number2)) {
            document.getElementById("descri").textContent = "acerto"
        } else {
            document.getElementById("descri").textContent = "erro"
        }
        document.getElementById("descri").style.display = "flex"
    gerarConta()
    document.getElementById("conta").textContent = `${number1} + ${number2}`;
}

 const timer = setInterval(() => {
    if(tempo > 0){
        tempo = tempo - 1;
    } else{
        tempo = 100
        atualizar() 

    }
    document.getElementById("tempo").value = tempo;
}, 100);

gerarConta()
document.getElementById("conta").textContent = `${number1} + ${number2}`;
document.getElementById("descri").style.display = "none"

document.getElementById("result").addEventListener("keydown", function (event) {

    
    if (event.key === "Enter") {
        
        atualizar()
        tempo = 100
        document.getElementById("result").value = ""
    }
});