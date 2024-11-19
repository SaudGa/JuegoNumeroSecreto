let numeroSecreto = 0;
let numeroIntentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

//Esta es la función que me permite interactuar con el <h1> y el <p> y de esta manera hacer más dinamico el juego
function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

//Al refrescarse la página estás son las condiciones iniciales de los elementos HTML
function condicionesIniciales(){
    numeroSecreto = generarNumeroSecreto();
    asignarTextoElemento("h1", "Juego del número secreto");
    asignarTextoElemento("p", `Elige un número entre el 1 y el ${numeroMaximo}`);
    numeroIntentos = 1;
}

function limpiarCaja(){
    document.getElementById("numeroUs").value = ""
    
}

//Aquí verificamos el intento del usuario
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

//Aquí aplicamos recursividad para que el numero incognito no se repita
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

//Función que le asignamos al botón "Nuevo juego"
function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    document.getElementById("reiniciar").setAttribute('disabled', 'true');
}

condicionesIniciales()