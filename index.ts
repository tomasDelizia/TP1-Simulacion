import { Chart } from 'chart.js';
import { GeneradorLineal } from './GeneradorLineal';
import { GeneradorMultiplicativo } from './GeneradorMultiplicativo';
import { GeneradorNumeros } from './GeneradorNumeros';
import './style.css';
import { TestChiCuadrado } from './TestChiCuadrado';

const generadorLineal: GeneradorNumeros = new GeneradorLineal();
const generadorMultiplicativo: GeneradorNumeros = new GeneradorMultiplicativo();

// Definición de botones de la interfaz de usuario.
const btnLineal: HTMLButtonElement = document.getElementById('btnLineal') as HTMLButtonElement;
const btnMultiplicativo: HTMLButtonElement = document.getElementById('btnMultiplicativo') as HTMLButtonElement;
const btnLimpiar: HTMLButtonElement = document.getElementById('btnLimpiar') as HTMLButtonElement;
const btnPrueba: HTMLButtonElement = document.getElementById('btnPrueba') as HTMLButtonElement;
const btnGenerarGrafico: HTMLButtonElement = document.getElementById('btnGenerarGrafico') as HTMLButtonElement;

// Definición de los cuadros de texto de la interfaz de usuario.
const txtMuestra: HTMLInputElement = document.getElementById('txtMuestra') as HTMLInputElement;
const txtSemilla: HTMLInputElement = document.getElementById('txtSemilla') as HTMLInputElement;
const txtA: HTMLInputElement = document.getElementById('txtA') as HTMLInputElement;
const txtK: HTMLInputElement = document.getElementById('txtK') as HTMLInputElement;
const txtG: HTMLInputElement = document.getElementById('txtG') as HTMLInputElement;
const txtM: HTMLInputElement = document.getElementById('txtM') as HTMLInputElement;
const txtC: HTMLInputElement = document.getElementById('txtC') as HTMLInputElement;

// Definición de las tablas de la interfaz de usuario.
const tablaNumeros: HTMLTableElement = document.getElementById('tablaNumeros') as HTMLTableElement;
const tablaChi: HTMLTableElement = document.getElementById('tablaChi') as HTMLTableElement;

// Definición del histograma de frecuencias.
const histograma: HTMLCanvasElement = document.getElementById('histograma') as HTMLCanvasElement;

const ResultHipotesis: HTMLInputElement = document.getElementById('ResultHipotesis') as HTMLInputElement;

let randoms: number[];
let frec: string[];

// Observador que alerta al usuario de un valor incorrecto del parámetro N.
txtMuestra.addEventListener('input', () => {
    if (Number(txtMuestra.value) < 0)
        alert('El valor de la muestra debe ser mayor a cero')
});

txtK.addEventListener('input', calcularA)

// Función que calcula el valor de A y lo muestra por pantalla.
function calcularA(): void {
    let a: number = 1 + 4 * Number(txtK.value);
    txtA.value = '1 + 4k = ' + a;
}

txtG.addEventListener('input', calcularG)

function calcularG() {
    let m: number =  Math.pow(2, Number(txtG.value));
    txtM.value = '2' + 'm&supg;' + ' = ' + m;
}

btnLineal.addEventListener('click', async e => {
    randoms = [];
    limpiarTabla(tablaNumeros);
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
    limpiarTabla(tablaNumeros);

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
    limpiarTabla(tablaNumeros);
    limpiarParametros();
})

btnPrueba.addEventListener('click', () => {
    frec = [];
    let prueba: TestChiCuadrado = new TestChiCuadrado();
    let numeros: number[] = [
        0.15, 0.22 , 0.41 , 0.65 , 0.84 , 0.81 , 0.62 , 0.45 , 0.32 , 0.07 , 0.11 , 0.29 , 0.58 , 0.73 , 0.93 , 0.97 , 0.79 , 0.55, 0.35 , 0.09 , 0.99 , 0.51 , 0.35 , 0.02 , 0.19 , 0.24 , 0.98 , 0.10 , 0.31 , 0.17 
      ];
    prueba.pruebaChi(5, numeros);
    for (let i = 0; i < prueba.getTabla().length; i++) {
        frec.push(prueba.getTabla()[i][1]);
        agregarDatosChi(prueba.getTabla()[i])
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

function limpiarTabla(tabla: HTMLTableElement) {
    for(let i: number = tablaNumeros.rows.length; i > 1; i--) {
        tabla.deleteRow(i - 1);
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

btnGenerarGrafico.addEventListener('click', async e => {
    datosGrafico();
})

function datosGrafico() {
    console.log(frec)
    var ctx= histograma.getContext("2d");
    var myCharte= new Chart(ctx,{
        type:"bar",
        data:{
            labels:['col1','col2','col3', 'col4', 'col5'],
            datasets:[{
                label:'Num datos',
                data:frec,
                backgroundColor:[
                    'rgb(66, 134, 244,0.5)',
                    'rgb(74, 135, 72,0.5)',
                    'rgb(229, 89, 50,0.5)'
                ]
            }]
        },
        options:{
            scales:{
                yAxes:{
                    beginAtZero:true
                }
            }
        }
    });
}
