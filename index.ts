import { GeneradorLineal } from './GeneradorLineal';
import { GeneradorMultiplicativo } from './GeneradorMultiplicativo';
import { GeneradorNumeros } from './GeneradorNumeros';
import './style.css';

const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>Trabajo Práctico N° 1 de Simulación</h1>`;

const generadorLineal: GeneradorNumeros = new GeneradorLineal();
const generadorMultiplicativo: GeneradorNumeros = new GeneradorMultiplicativo();

const btnLineal: HTMLButtonElement = document.getElementById('btnLineal') as HTMLButtonElement;
const btnMultiplicativo: HTMLButtonElement = document.getElementById('btnMultiplicativo') as HTMLButtonElement;
const btnLimpiar: HTMLButtonElement = document.getElementById('btnLimpiar') as HTMLButtonElement;
const txtMuestra: HTMLInputElement = document.getElementById('txtMuestra') as HTMLInputElement;
const txtSemilla: HTMLInputElement = document.getElementById('txtSemilla') as HTMLInputElement;
const txtA: HTMLInputElement = document.getElementById('txtA') as HTMLInputElement;
const txtK: HTMLInputElement = document.getElementById('txtK') as HTMLInputElement;
const txtG: HTMLInputElement = document.getElementById('txtG') as HTMLInputElement;
const txtM: HTMLInputElement = document.getElementById('txtM') as HTMLInputElement;
const txtC: HTMLInputElement = document.getElementById('txtC') as HTMLInputElement;
const tablaNumeros: HTMLTableElement = document.getElementById('tablaNumeros') as HTMLTableElement;



txtK.addEventListener('input', calcularA)

function calcularA() {
    let a: number = 1 + 4 * Number(txtK.value);
    txtA.value = '1 + 4k = ' + a;
}

txtG.addEventListener('input', calcularG)

function calcularG() {
    let m: number =  Math.pow(2, Number(txtG.value));
    txtM.value = '2^g = ' + m;
}

btnLineal.addEventListener('click', async e => {
    limpiarTabla();
    // Si alguno de los parámetros no es ingresado por el usuario, se rechaza lapetición.
    if (txtMuestra.value == "" || txtSemilla.value == "" || txtK.value == "" || txtG.value == "" || txtC.value == "") {
        alert('Tiene que ingresar todos los parámetros.');
    }
    else {
        let muestra: number = Number(txtMuestra.value);
        let semilla: number = Number(txtSemilla.value);
        let k: number = Number(txtK.value);
        let g: number = Number(txtG.value);
        let c: number = 0;

        const a: number = 1 + 4 * k;
        const m: number = Math.pow(2, g);
        const rndsLineal: number[][] =
            await generadorLineal.generarNumerosPseudoaleatorios(muestra, semilla, a, m, c);
        for (let i = 0; i < rndsLineal.length; i++) {
            agregarDatos(rndsLineal[i])
        }
    }
})

btnMultiplicativo.addEventListener('click', async e => {
    limpiarTabla();

    // Si alguno de los parámetros no es ingresado por el usuario, se rechaza lapetición.
    if (txtMuestra.value == "" || txtSemilla.value == "" || txtK.value == "" || txtG.value == "") {
        alert('Tiene que ingresar todos los parámetros.');
    }
    else {
        console.log(txtMuestra.value)
        let muestra: number = Number(txtMuestra.value);
        let semilla: number = Number(txtSemilla.value);
        let k: number = Number(txtK.value);
        let g: number = Number(txtG.value);
        let c: number = 0;

        const a: number = 1 + 4 * k;
        const m: number = Math.pow(2, g);
        const rndsMultiplicativo: number[][] =
            await generadorMultiplicativo.generarNumerosPseudoaleatorios(muestra, semilla, a, m, c);
        for (let i = 0; i < rndsMultiplicativo.length; i++) {
            agregarDatos(rndsMultiplicativo[i])
        }
    }
})

btnLimpiar.addEventListener('click', () => {
    limpiarTabla();
    limpiarParametros();
})

function limpiarParametros() {
    txtA.value = '';
    txtC.value = '';
    txtG.value = '';
    txtK.value = '';
    txtM.value = '';
    txtMuestra.value = '';
    txtSemilla.value = '';
}

function limpiarTabla() {
    for(let i: number = tablaNumeros.rows.length; i > 1; i--) {
        tablaNumeros.deleteRow(i - 1);
    }
}

function agregarDatos(vec: number[]){
    let fila = tablaNumeros.insertRow();
    for (let i: number = 0; i < 3; i++) {
        let celda = fila.insertCell();
        celda.appendChild(document.createTextNode(String(vec[i])));
    }
}