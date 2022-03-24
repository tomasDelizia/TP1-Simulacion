import { GeneradorLineal } from './GeneradorLineal';
import { GeneradorMultiplicativo } from './GeneradorMultiplicativo';
import { GeneradorNumeros } from './GeneradorNumeros';
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>Trabajo Práctico N° 1 de Simulación</h1>`;

const generadorLineal: GeneradorNumeros = new GeneradorLineal();
const generadorMultiplicativo: GeneradorNumeros = new GeneradorMultiplicativo();

const btnLineal: HTMLButtonElement = document.getElementById('btnLineal') as HTMLButtonElement;
const btnMultiplicativo: HTMLButtonElement = document.getElementById('btnMultiplicativo') as HTMLButtonElement;
const btnPrueba: HTMLButtonElement = document.getElementById('btnPrueba') as HTMLButtonElement;
const txtMuestra: HTMLInputElement = document.getElementById('txtMuestra') as HTMLInputElement;
const txtSemilla: HTMLInputElement = document.getElementById('txtSemilla') as HTMLInputElement;
const txtA: HTMLInputElement = document.getElementById('txtA') as HTMLInputElement;
const txtK: HTMLInputElement = document.getElementById('txtK') as HTMLInputElement;
const txtG: HTMLInputElement = document.getElementById('txtG') as HTMLInputElement;
const txtM: HTMLInputElement = document.getElementById('txtM') as HTMLInputElement;
const txtC: HTMLInputElement = document.getElementById('txtC') as HTMLInputElement;
const tablaNumeros: HTMLTableElement = document.getElementById('tablaNumeros') as HTMLTableElement;


txtA.addEventListener('input', e => {
    let a : number = 1 + 4 * Number(txtK.value);
    txtA.value = 'A = 1 + 4k = ' + a;
})

txtG.addEventListener('input', e => {
    let m : number =  Math.pow(2,Number(txtG.value));
    txtM.value = 'M = 2^g = ' + m;
})

btnLineal.addEventListener('click', async e => {

    let muestra: number = Number(txtMuestra.value);
    let semilla: number = Number(txtSemilla.value);
    let k: number = Number(txtK.value);
    let g: number = Number(txtG.value);
    let c: number = Number(txtC.value);

    // Si alguno de los parámetros no es ingresado por el usuario, se rechaza la petición.
    if (muestra == null || semilla == null || k == null || g == null || c == null)
        alert('Tiene que ingresar todos los datos');
    else {
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
    let muestra: number = Number(txtMuestra.value);
    let semilla: number = Number(txtSemilla.value);
    let k: number = Number(txtK.value);
    let g: number = Number(txtG.value);
    let c: number = 0;

    // Si alguno de los parámetros no es ingresado por el usuario, se rechaza la petición.
    if (muestra == null || semilla == null || k == null || g == null)
        alert('Tiene que ingresar todos los datos');
    else {
        const a: number = 1 + 4 * k;
        const m: number = Math.pow(2, g);
        const rndsLineal: number[][] =
            await generadorLineal.generarNumerosPseudoaleatorios(muestra, semilla, a, m, c);
        for (let i = 0; i < rndsLineal.length; i++) {
            agregarDatos(rndsLineal[i])
        }
    }
})

function agregarDatos(vec: number[]){
    let fila = tablaNumeros.insertRow();
    let celdaI = fila.insertCell();
    let celdaXi = fila.insertCell();
    let celdaRnd = fila.insertCell();
    celdaI.appendChild(document.createTextNode(String(vec[0])));
    celdaXi.appendChild(document.createTextNode(String(vec[1])));
    celdaRnd.appendChild(document.createTextNode(String(vec[2])));
}