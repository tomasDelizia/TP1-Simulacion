import { GeneradorLineal } from './GeneradorLineal';
import { GeneradorMultiplicativo } from './GeneradorMultiplicativo';
import { GeneradorNumeros } from './GeneradorNumeros';
import './style.css';
import { TestChiCuadrado } from './TestChiCuadrado';

const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>Trabajo Práctico N° 1 de Simulación</h1>`;

const generadorLineal: GeneradorNumeros = new GeneradorLineal();
const generadorMultiplicativo: GeneradorNumeros = new GeneradorMultiplicativo();

const btnLineal: HTMLButtonElement = document.getElementById('btnLineal') as HTMLButtonElement;
const btnMultiplicativo: HTMLButtonElement = document.getElementById('btnMultiplicativo') as HTMLButtonElement;
const btnLimpiar: HTMLButtonElement = document.getElementById('btnLimpiar') as HTMLButtonElement;
const btnPrueba: HTMLButtonElement = document.getElementById('btnPrueba') as HTMLButtonElement;
const txtMuestra: HTMLInputElement = document.getElementById('txtMuestra') as HTMLInputElement;
const txtSemilla: HTMLInputElement = document.getElementById('txtSemilla') as HTMLInputElement;
const txtA: HTMLInputElement = document.getElementById('txtA') as HTMLInputElement;
const txtK: HTMLInputElement = document.getElementById('txtK') as HTMLInputElement;
const txtG: HTMLInputElement = document.getElementById('txtG') as HTMLInputElement;
const txtM: HTMLInputElement = document.getElementById('txtM') as HTMLInputElement;
const txtC: HTMLInputElement = document.getElementById('txtC') as HTMLInputElement;
const ResultHipotesis: HTMLInputElement = document.getElementById('ResultHipotesis') as HTMLInputElement;
const tablaNumeros: HTMLTableElement = document.getElementById('tablaNumeros') as HTMLTableElement;
const tablaChi: HTMLTableElement = document.getElementById('tablaChi') as HTMLTableElement;

let randoms: number[];


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
    randoms = [];
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
        let c: number = Number(txtC.value);

        const a: number = 1 + 4 * k;
        const m: number = Math.pow(2, g);
        const rndsLineal: number[][] =
            await generadorLineal.generarNumerosPseudoaleatorios(muestra, semilla, a, m, c);
        for (let i = 0; i < rndsLineal.length; i++) {
            randoms.push(rndsLineal[i][2]);
            agregarDatos(rndsLineal[i]);
        }
    }
})

btnMultiplicativo.addEventListener('click', async e => {
    randoms = [];
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

        const a: number = 3 + 8 * k;
        const m: number = Math.pow(2, g);
        const rndsMultiplicativo: number[][] =
            await generadorMultiplicativo.generarNumerosPseudoaleatorios(muestra, semilla, a, m, c);
        for (let i = 0; i < rndsMultiplicativo.length; i++) {
            randoms.push(rndsMultiplicativo[i][2]);
            agregarDatos(rndsMultiplicativo[i])
        }
    }
})

btnLimpiar.addEventListener('click', () => {
    limpiarTabla();
    limpiarParametros();
})

btnPrueba.addEventListener('click', () => {
    let prueba: TestChiCuadrado = new TestChiCuadrado();
    let numeros: number[] = [
        0.15, 0.22 , 0.41 , 0.65 , 0.84 , 0.81 , 0.62 , 0.45 , 0.32 , 0.07 , 0.11 , 0.29 , 0.58 , 0.73 , 0.93 , 0.97 , 0.79 , 0.55, 0.35 , 0.09 , 0.99 , 0.51 , 0.35 , 0.02 , 0.19 , 0.24 , 0.98 , 0.10 , 0.31 , 0.17 
      ];
    prueba.pruebaChi(5, numeros);
    for (let i = 0; i < prueba.tabla.length; i++) {
        agregarDatosChi(prueba.tabla[i])
    } 
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

function agregarDatosChi(vec: string[]){
    let fila = tablaChi.insertRow();
    for (let i: number = 0; i < 5; i++) {
        let celda = fila.insertCell();
        celda.appendChild(document.createTextNode(String(vec[i])));
    }
}