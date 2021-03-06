import { Chart } from 'chart.js';
import { GeneradorCSV } from './GeneradorCSV';
import { GeneradorLineal } from './GeneradorLineal';
import { GeneradorMultiplicativo } from './GeneradorMultiplicativo';
import { GeneradorNumeros } from './GeneradorNumeros';
import './style.css';
import { TestChiCuadrado } from './TestChiCuadrado';

// El generador de números aleatorios.
let generador: GeneradorNumeros;

// El test de Chi Cuadrado.
let testChiCuadrado: TestChiCuadrado;

// Definición de botones de la interfaz de usuario.
const btnLineal: HTMLButtonElement = document.getElementById('btnLineal') as HTMLButtonElement;
const btnMultiplicativo: HTMLButtonElement = document.getElementById('btnMultiplicativo') as HTMLButtonElement;
const btnLimpiar: HTMLButtonElement = document.getElementById('btnLimpiar') as HTMLButtonElement;
const btnPruebaChiCuadrado: HTMLButtonElement = document.getElementById('btnPruebaChiCuadrado') as HTMLButtonElement;
const btnPruebaChiLineal: HTMLButtonElement = document.getElementById('btnPruebaChiLineal') as HTMLButtonElement;
const btnGenerarGrafico: HTMLButtonElement = document.getElementById('btnGenerarGrafico') as HTMLButtonElement;
const btnDescargarSerie: HTMLButtonElement = document.getElementById('btnDescargarSerie') as HTMLButtonElement;

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
const histogramaFrecOb: HTMLCanvasElement = document.getElementById('histogramaFrecOb') as HTMLCanvasElement;
const areaHistogramaFrecOb = histogramaFrecOb.getContext('2d');
let graficoFrecOb: Chart;
const histogramaFrecEsp: HTMLCanvasElement = document.getElementById('histogramaFrecEsp') as HTMLCanvasElement;
const areaHistogramaFrecEsp = histogramaFrecEsp.getContext('2d');
let graficoFrecEsp: Chart;

// Definición de los parámetros para los generadores.
let cantNumeros: number;
let semilla: number;
let k: number;
let g: number;
let c: number;
let a: number;
let m: number;

// Definición de los parámetros para la prueba de Chi Cuadrado.
let tamMuestra: number;
let cantIntervalos: number;

// Definición del generador de archivos CSV.
const generadorCSV: GeneradorCSV = new GeneradorCSV();

// Detecta que el valor de K es ingresado por teclado y calcula A.
txtK.addEventListener('input', calcularA)

// Función que calcula el valor de A y lo muestra por pantalla.
function calcularA(): void {
    a = 1 + 4 * Number(txtK.value);
    txtA.value = a.toString();
}

// Detecta que el valor de G es ingresado por teclado y calcula M.
txtG.addEventListener('input', calcularG);

// Función que calcula el valor de G y lo muestra por pantalla.
function calcularG(): void {
    m = Math.pow(2, Number(txtG.value));
    txtM.value = m.toString();
}

function validarParametros(): boolean {
    if (txtCantNumeros.value == "" || txtSemilla.value == "" || txtK.value == "" || txtG.value == "" || txtC.value == "") {
        alert('Tiene que ingresar todos los parámetros solicitados.');
        return false;
    };
    cantNumeros = Number(txtCantNumeros.value);
    semilla = Number(txtSemilla.value);
    k = Number(txtK.value);
    g = Number(txtG.value);
    c = Number(txtC.value);
    if (cantNumeros <= 0 || semilla <= 0 || k <= 0 || g <= 0 || c <= 0) {
        alert('Debe ingresar únicamente valores enteros positivos.');
        return false;
    };
    return true;
}

// Dispara la generación de números pseudoaleatorios por el Método Congruencial Lineal.
btnLineal.addEventListener('click', async () => {
    // Limpiamos la tabla para volver a llenarla.
    limpiarTabla(tablaNumeros);
    // Iniciamos el generador de números pseudoaleatorios.
    generador = new GeneradorLineal();
    // Si alguno de los parámetros no se ingresa correctamente, se rechaza la petición.
    if (!validarParametros())
        return;
    else {
        await generador.generarNumerosPseudoaleatorios(cantNumeros, semilla, a, m, c);
        for (let i: number = 0; i < generador.getEnteros().length; i++) {
            agregarFilaATabla(
                [i, generador.getEnteros()[i], generador.getRnds()[i]], tablaNumeros);
        }
    }
});

// Dispara la generación de números pseudoaleatorios por el Método Congruencial Multiplicativo.
btnMultiplicativo.addEventListener('click', async e => {
    // Mostramos el valor del parámetro c como 0.
    txtC.value = '1';
    // Limpiamos la tabla para volver a llenarla.
    limpiarTabla(tablaNumeros);
    // Iniciamos el generador de números pseudoaleatorios.
    generador = new GeneradorMultiplicativo();
    // Si alguno de los parámetros no se ingresa correctamente, se rechaza la petición.
    if (!validarParametros())
        return;
    else {
        txtC.value = '0';
        c = 0;
        a = 3 + 8 * k;
        await generador.generarNumerosPseudoaleatorios(cantNumeros, semilla, a, m, c);
        for (let i: number = 0; i < generador.getEnteros().length; i++) {
            agregarFilaATabla(
                [i, generador.getEnteros()[i], generador.getRnds()[i]], tablaNumeros);
        }
    }
});

// Limpia la tabla y los parámetros ingresados al tocar el botón Limpiar.
btnLimpiar.addEventListener('click', () => {
    limpiarTabla(tablaNumeros);
    limpiarTabla(tablaChiCuadrado);
    limpiarParametros();
    btnGenerarGrafico.disabled = true;
    btnDescargarSerie.disabled = true;
    limpiarGraficos();
})

function limpiarGraficos(): void {
    if (graficoFrecOb != null)
        graficoFrecOb.destroy();
    if (graficoFrecEsp != null)
        graficoFrecEsp.destroy();
}

// Dispara la prueba de Chi Cuadrado usando el generador de JavaScript.
btnPruebaChiCuadrado.addEventListener('click', async () => {
    // Limpiamos la tabla, los gráfico y el resultado de una prueba anterior.
    limpiarTabla(tablaChiCuadrado);
    limpiarGraficos();
    txtResultHipotesis.value = '';
    btnGenerarGrafico.disabled = true;
    btnDescargarSerie.disabled = true;

    const cantIntervalos: number = Number(cboCantIntervalos.value);
    const tamMuestra: number = Number(txtMuestraChi.value);
    if (cboCantIntervalos.value == '0' || txtMuestraChi.value == "")
        alert('Ingrese los parámetros requeridos.');
    else {
        testChiCuadrado = new TestChiCuadrado();
        await testChiCuadrado.pruebaChiCuadrado(cantIntervalos, tamMuestra);
        for (let i: number = 0; i < testChiCuadrado.getTabla().length; i++) {
            agregarFilaATabla(testChiCuadrado.getTabla()[i], tablaChiCuadrado);
        }
        txtResultHipotesis.value = testChiCuadrado.validarHipotesis();
        btnGenerarGrafico.disabled = false;
        btnDescargarSerie.disabled = false;
    }
})

function validarParametrosPruebaChi(): boolean {
    cantIntervalos = Number(cboCantIntervalos.value);
    tamMuestra = Number(txtMuestraChi.value);
    txtCantNumeros.value = tamMuestra.toString();
    if (cantIntervalos == 0) {
        alert('Seleccione la cantidad de intervalos.');
        return false;
    }
    if (txtMuestraChi.value == "") {
        alert('Ingrese el tamaño de la muestra.');
        return false;
    }
    if (tamMuestra <= 0) {
        alert('La muestra debe ser mayor a cero.');
        return false;
    }
    return true;
}

// Dispara la prueba de Chi Cuadrado usando el Generador Congruencial Mixto.
btnPruebaChiLineal.addEventListener('click', async () => {
    // Limpiamos la tabla, los gráfico y el resultado de una prueba anterior.
    limpiarTabla(tablaChiCuadrado);
    limpiarGraficos();
    txtResultHipotesis.value = '';
    btnGenerarGrafico.disabled = true;
    btnDescargarSerie.disabled = true;
    
    if (!validarParametrosPruebaChi() || !validarParametros())
        return;
    else {
        testChiCuadrado = new TestChiCuadrado();
        generador = new GeneradorLineal();
        //await generador.generarNumerosPseudoaleatorios(tamMuestra, 1, 1664525, 4294967296, 1013904223);

        await generador.generarNumerosPseudoaleatorios(tamMuestra, semilla, a, m, c);

        await testChiCuadrado.pruebaChiCuadradoLineal(cantIntervalos, tamMuestra, generador.getRnds());
        for (let i: number = 0; i < testChiCuadrado.getTabla().length; i++) {
            agregarFilaATabla(testChiCuadrado.getTabla()[i], tablaChiCuadrado);
        }
        txtResultHipotesis.value = testChiCuadrado.validarHipotesis();
        btnGenerarGrafico.disabled = false;
        btnDescargarSerie.disabled = false;
    }
})

// Función que borra los parámetros ingresados por el usuario.
function limpiarParametros(): void {
    txtCantNumeros.value = '';
    txtA.value = '';
    txtC.value = '';
    txtG.value = '';
    txtK.value = '';
    txtM.value = '';
    txtMuestraChi.value = '';
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
    let filaHTML: HTMLTableRowElement = tabla.getElementsByTagName('tbody')[0].insertRow();
    for (let i: number = 0; i < fila.length; i++) {
        let celda = filaHTML.insertCell();
        celda.appendChild(document.createTextNode(String(fila[i])));
    }
}

// Dispara la generación del histograma.
btnGenerarGrafico.addEventListener('click', generarGrafico);

// Función que genera el histograma de frecuencias a partir de la serie de números pseudoaleatorios producida.
function generarGrafico(): void {
    limpiarGraficos();
    graficoFrecOb = new Chart(areaHistogramaFrecOb, {
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

    graficoFrecEsp = new Chart(areaHistogramaFrecEsp, {
        type:'bar',
        data:{
            labels: testChiCuadrado.getIntervalos(),
            datasets:[{
                label: 'Frecuencias esperadas',
                data: testChiCuadrado.getFrecuenciasEsperadas(),
                backgroundColor: '#F87272'
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

// Dispara la generación de un archivo csv 
btnDescargarSerie.addEventListener('click', generarArchivo);

// Genera un archivo CSV que contiene los números aleatorios generados.
function generarArchivo(): void {
    generadorCSV.generarArchivo(testChiCuadrado.getRnds(), 'Serie');
}