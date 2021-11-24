const form = document.querySelector('form');

function prevenirEvento() {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const inputPeso = e.target.querySelector('#peso');
        const inputAltura = e.target.querySelector('#altura');

        const peso = Number(inputPeso.value);
        const altura = Number(inputAltura.value);

        if (!peso || (peso < 0 || peso > 600)) {
            mostrarResultado("Peso inválido", false);
            return;
        }
        if (!altura || (altura < 0 || altura > 3) ) {
            mostrarResultado("Altura inválida", false);
            return;
        }

        if (peso && altura) {
            const imc = calcularImc(peso, altura);
            if (altura < 3 || peso < 600) {
                if (imc < 18.5) mostrarResultado(`O IMC ${imc.toFixed(2)} KG/m², portanto está abaixo do peso.`, true);
                if (imc >= 18.5 && imc < 25) mostrarResultado(`O IMC ${imc.toFixed(2)} KG/m², portanto está com o peso normal.`, true);
                if (imc >= 25 && imc < 30) mostrarResultado(`O IMC ${imc.toFixed(2)} KG/m², portanto está com sobrepeso.`, true);
                if (imc >= 30 && imc < 35) mostrarResultado(`O IMC ${imc.toFixed(2)} KG/m², portanto está com obesidade grau 1.`, true);
                if (imc >= 35 && imc < 40) mostrarResultado(`O IMC ${imc.toFixed(2)} KG/m², portanto está com obesidade grau 2.`, true);
                if (imc >= 40) mostrarResultado(`O IMC ${imc.toFixed(2)} KG/m², portanto está com obesidade grau 3.`, true);
            }
        }
    });
}

function novoElemento(tagName, className) {
    const elemento = document.createElement(tagName);
    elemento.className = className;
    return elemento;
}

function calcularImc(peso, altura) {
    const imc = peso / (altura * altura);
    return imc;

}

function criarParagrafo(className) {
    const p = novoElemento('p', className);
    return p;
}

function mostrarResultado(msg, validar) {
    const resultado = document.querySelector("#resultado")
    resultado.innerHTML = msg;
    const p = criarParagrafo('resultado-paragrafo');
    resultado.appendChild(p);
    if (validar) {
        resultado.classList.add("positivo");
        resultado.classList.remove("negativo");
        return;
    } else {
        resultado.classList.add("positivo");
        resultado.classList.add("negativo");
    }
}

function startAllFunctions() {
    prevenirEvento();
    calcularImc();
}

startAllFunctions();