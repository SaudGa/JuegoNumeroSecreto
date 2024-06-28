let numeroSecreto = 0;
let numeroIntentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function verificarIntento() {
    let numeroUsuario = parseInt(document.getElementById("numeroUs").value);
    if (numeroUsuario === numeroSecreto){
        //El usuario acertó
        asignarTextoElemento("p", `Felicidades, acertaste en ${numeroIntentos} ${numeroIntentos === 1 ? "vez" : "veces"}`);
        document.getElementById("reiniciar").removeAttribute("disabled")
    } else {
        //El usuario no acertó
        if (numeroUsuario > numeroSecreto){ 
            asignarTextoElemento("p", "El número secreto es menor");
        } else {
            asignarTextoElemento("p", "El número secreto es mayor");
        }
        numeroIntentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja(){
    document.getElementById("numeroUs").value = ""
    
}
//Aquí aplicamos la recursividad (llamar una función dentro de la misma):
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles')
    } else {
        if ( listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }

   
}

function condicionesIniciales(){
    numeroSecreto = generarNumeroSecreto();
    asignarTextoElemento("h1", "Juego del número secreto");
    asignarTextoElemento("p", `Elige un número entre el 1 y el ${numeroMaximo}`);
    numeroIntentos = 1;
}

function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    document.getElementById("reiniciar").setAttribute('disabled', 'true');
}

condicionesIniciales()