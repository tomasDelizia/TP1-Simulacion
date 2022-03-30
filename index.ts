import { Chart } from 'chart.js';
import { GeneradorLineal } from './GeneradorLineal';
import { GeneradorMultiplicativo } from './GeneradorMultiplicativo';
import { GeneradorNumeros } from './GeneradorNumeros';
import './style.css';
import { TestChiCuadrado } from './TestChiCuadrado';

// El generador de números aleatorios.
let generador: GeneradorNumeros;

// El test de Chi Cuadrado.
let testChiCuadrado: TestChiCuadrado = new TestChiCuadrado();

// Definición de botones de la interfaz de usuario.
const btnLineal: HTMLButtonElement = document.getElementById('btnLineal') as HTMLButtonElement;
const btnMultiplicativo: HTMLButtonElement = document.getElementById('btnMultiplicativo') as HTMLButtonElement;
const btnLimpiar: HTMLButtonElement = document.getElementById('btnLimpiar') as HTMLButtonElement;
const btnPruebaChiCuadrado: HTMLButtonElement = document.getElementById('btnPruebaChiCuadrado') as HTMLButtonElement;
const btnPruebaChiLineal: HTMLButtonElement = document.getElementById('btnPruebaChiLineal') as HTMLButtonElement;
const btnGenerarGrafico: HTMLButtonElement = document.getElementById('btnGenerarGrafico') as HTMLButtonElement;

// Definición de los cuadros de texto de la interfaz de usuario.
const txtCantNumeros: HTMLInputElement = document.getElementById('txtCantNumeros') as HTMLInputElement;
const txtSemilla: HTMLInputElement = document.getElementById('txtSemilla') as HTMLInputElement;
const txtA: HTMLInputElement = document.getElementById('txtA') as HTMLInputElement;
const txtK: HTMLInputElement = document.getElementById('txtK') as HTMLInputElement;
const txtG: HTMLInputElement = document.getElementById('txtG') as HTMLInputElement;
const txtM: HTMLInputElement = document.getElementById('txtM') as HTMLInputElement;
const txtC: HTMLInputElement = document.getElementById('txtC') as HTMLInputElement;
const txtResultHipotesis: HTMLTextAreaElement = document.getElementById('txtResultHipotesis') as HTMLTextAreaElement;
const txtMuestraChi: HTMLInputElement = document.getElementById('txtMuestraChi') as HTMLInputElement;


// Definición de las tablas de la interfaz de usuario.
const tablaNumeros: HTMLTableElement = document.getElementById('tablaNumeros') as HTMLTableElement;
const tablaChiCuadrado: HTMLTableElement = document.getElementById('tablaChiCuadrado') as HTMLTableElement;

// Definición del combo box para seleccionar la cantidad de intervalos.
const cboCantIntervalos: HTMLSelectElement = document.getElementById('cboCantIntervalos') as HTMLSelectElement;

// Definición del histograma de frecuencias.
const histograma1: HTMLCanvasElement = document.getElementById('histograma1') as HTMLCanvasElement;
const areaHistograma1 = histograma1.getContext('2d');
let grafico1: Chart;
const histograma2: HTMLCanvasElement = document.getElementById('histograma2') as HTMLCanvasElement;
const areaHistograma2 = histograma2.getContext('2d');
let grafico2: Chart;

// Detecta que el valor de K es ingresado por teclado y calcula A.
txtK.addEventListener('input', calcularA)

// Función que calcula el valor de A y lo muestra por pantalla.
function calcularA(): void {
    let a: number = 1 + 4 * Number(txtK.value);
    txtA.value = '1 + 4k = ' + a;
}

// Detecta que el valor de G es ingresado por teclado y calcula M.
txtG.addEventListener('input', calcularG);

// Función que calcula el valor de G y lo muestra por pantalla.
function calcularG(): void {
    let g: number = Math.pow(2, Number(txtG.value));
    txtM.value = "2ᵍ = " + g;
}

// Dispara la generación de números pseudoaleatorios por el Método Congruencial Lineal.
btnLineal.addEventListener('click', async () => {
    // Limpiamos la tabla para volver a llenarla.
    limpiarTabla(tablaNumeros);
    // Iniciamos el generador de números pseudoaleatorios.
    generador = new GeneradorLineal();
    // Si alguno de los parámetros no es ingresado por el usuario, se rechaza la petición.
    if (txtCantNumeros.value == "" || txtSemilla.value == "" || txtK.value == "" || txtG.value == "" || txtC.value == "") {
        alert('Tiene que ingresar todos los parámetros necesarios.');
    }
    else {
        const cantNumeros: number = Number(txtCantNumeros.value);
        const semilla: number = Number(txtSemilla.value);
        const k: number = Number(txtK.value);
        const g: number = Number(txtG.value);
        const c: number = Number(txtC.value);
        const a: number = 1 + 4 * k;
        const m: number = Math.pow(2, g);
        await generador.generarNumerosPseudoaleatorios(cantNumeros, semilla, a, m, c);
        for (let i: number = 0; i < generador.getEnteros().length; i++) {
            agregarFilaATabla(
                [i, generador.getEnteros()[i], generador.getRnds()[i]], tablaNumeros);
        }
    }
})

// Dispara la generación de números pseudoaleatorios por el Método Congruencial Multiplicativo.
btnMultiplicativo.addEventListener('click', async e => {
    // Mostramos el valor del parámetro c como 0.
    txtC.value = '0';
    // Limpiamos la tabla para volver a llenarla.
    limpiarTabla(tablaNumeros);
    // Iniciamos el generador de números pseudoaleatorios.
    generador = new GeneradorMultiplicativo();
    // Si alguno de los parámetros no es ingresado por el usuario, se rechaza la petición.
    if (txtCantNumeros.value == "" || txtSemilla.value == "" || txtK.value == "" || txtG.value == "") {
        alert('Tiene que ingresar todos los parámetros (excepto C).');
    }
    else {
        const cantNumeros: number = Number(txtCantNumeros.value);
        const semilla: number = Number(txtSemilla.value);
        const k: number = Number(txtK.value);
        const g: number = Number(txtG.value);
        const c: number = 0;
        const a: number = 3 + 8 * k;
        const m: number = Math.pow(2, g);
        await generador.generarNumerosPseudoaleatorios(cantNumeros, semilla, a, m, c);
        for (let i: number = 0; i < generador.getEnteros().length; i++) {
            agregarFilaATabla(
                [i, generador.getEnteros()[i], generador.getRnds()[i]], tablaNumeros);
        }
    }
})

// Limpia la tabla y los parámetros ingresados al tocar el botón Limpiar.
btnLimpiar.addEventListener('click', () => {
    limpiarTabla(tablaNumeros);
    limpiarTabla(tablaChiCuadrado);
    limpiarParametros();
    btnGenerarGrafico.disabled = true;
    limpiarGrafico();
})

function limpiarGrafico(): void {
    if (grafico1 != null)
        grafico1.destroy();
    if (grafico2 != null)
        grafico2.destroy();
}

// Dispara la prueba de Chi Cuadrado usando el generador de JavaScript.
btnPruebaChiCuadrado.addEventListener('click', async () => {
    // Limpiamos la tabla para volver a llenarla.
    limpiarTabla(tablaChiCuadrado);
    limpiarGrafico();
    const cantIntervalos: number = Number(cboCantIntervalos.value);
    const tamMuestra: number = Number(txtMuestraChi.value);
    if (cboCantIntervalos.value == '0' || txtMuestraChi.value == "")
        alert('Ingrese los parámetros requeridos.');
    else {
        await testChiCuadrado.pruebaChiCuadrado(cantIntervalos, tamMuestra);
        for (let i: number = 0; i < testChiCuadrado.getTabla().length; i++) {
            agregarFilaATabla(testChiCuadrado.getTabla()[i], tablaChiCuadrado);
        }
        txtResultHipotesis.value = testChiCuadrado.validarHipotesis();
        btnGenerarGrafico.disabled = false;
    }
})

// Dispara la prueba de Chi Cuadrado usando el Generador Congruencial Mixto.
btnPruebaChiLineal.addEventListener('click', async () => {
    // Limpiamos la tabla para volver a llenarla.
    limpiarTabla(tablaChiCuadrado);
    limpiarGrafico();
    const cantIntervalos: number = Number(cboCantIntervalos.value);
    const tamMuestra: number = Number(txtMuestraChi.value);
    if (cboCantIntervalos.value == '0' || txtMuestraChi.value == "")
        alert('Ingrese los parámetros requeridos.');
    else {
        generador = new GeneradorLineal();
        await generador.generarNumerosPseudoaleatorios(tamMuestra, 1, 1664525, 4294967296, 1013904223);
        await testChiCuadrado.pruebaChiCuadradoLineal(cantIntervalos, tamMuestra, generador.getRnds());
        for (let i: number = 0; i < testChiCuadrado.getTabla().length; i++) {
            agregarFilaATabla(testChiCuadrado.getTabla()[i], tablaChiCuadrado);
        }
        txtResultHipotesis.value = testChiCuadrado.validarHipotesis();
        btnGenerarGrafico.disabled = false;
    }
})

// Función que borra los parámetros ingresados por el usuario.
function limpiarParametros(): void {
    txtCantNumeros.value = '';
    txtA.value = '1 + 4k = ';
    txtC.value = '';
    txtG.value = '';
    txtK.value = '';
    txtM.value = '2ᵍ = ';
    txtSemilla.value = '';
    cboCantIntervalos.value = "0";
    txtResultHipotesis.value = "";
}

// Función que elimina todas las filas de la tabla HTML excepto los encabezados.
function limpiarTabla(tabla: HTMLTableElement) {
    for(let i: number = tabla.rows.length; i > 1; i--) {
        tabla.deleteRow(i - 1);
    }
}

// Agregar una fila a una tabla html a partir de un vector pasado por parámetro.
function agregarFilaATabla(fila: any[], tabla: HTMLTableElement) {
    let filaHTML: HTMLTableRowElement = tabla.insertRow();
    for (let i: number = 0; i < fila.length; i++) {
        let celda = filaHTML.insertCell();
        celda.appendChild(document.createTextNode(String(fila[i])));
    }
}

// Dispara la generación del histograma.
btnGenerarGrafico.addEventListener('click', generarGrafico);

// Función que genera el histograma de frecuencias a partir de la serie de números pseudoaleatorios producida.
function generarGrafico(): void {
    grafico1 = new Chart(areaHistograma1, {
        type:'bar',
        data:{
            labels: testChiCuadrado.getIntervalos(),
            datasets:[{
                label: 'Frecuencias observadas',
                data: testChiCuadrado.getFrecuenciasObservadas(),
                backgroundColor: '#F8C471'
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

    grafico2 = new Chart(areaHistograma2, {
        type:'bar',
        data:{
            labels: testChiCuadrado.getIntervalos(),
            datasets:[{
                label: 'Frecuencias esperada',
                data: testChiCuadrado.getFrecuenciasEsperadas(),
                backgroundColor: '#F8C471'
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