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
const btnGenerarGrafico: HTMLButtonElement = document.getElementById('btnGenerarGrafico') as HTMLButtonElement;

// Definición de los cuadros de texto de la interfaz de usuario.
const txtMuestra: HTMLInputElement = document.getElementById('txtMuestra') as HTMLInputElement;
const txtSemilla: HTMLInputElement = document.getElementById('txtSemilla') as HTMLInputElement;
const txtA: HTMLInputElement = document.getElementById('txtA') as HTMLInputElement;
const txtK: HTMLInputElement = document.getElementById('txtK') as HTMLInputElement;
const txtG: HTMLInputElement = document.getElementById('txtG') as HTMLInputElement;
const txtM: HTMLInputElement = document.getElementById('txtM') as HTMLInputElement;
const txtC: HTMLInputElement = document.getElementById('txtC') as HTMLInputElement;
const txtResultHipotesis: HTMLTextAreaElement = document.getElementById('txtResultHipotesis') as HTMLTextAreaElement;

// Definición de las tablas de la interfaz de usuario.
const tablaNumeros: HTMLTableElement = document.getElementById('tablaNumeros') as HTMLTableElement;
const tablaChiCuadrado: HTMLTableElement = document.getElementById('tablaChiCuadrado') as HTMLTableElement;

// Definición del combo box para seleccionar la cantidad de intervalos.
const cboCantIntervalos: HTMLSelectElement = document.getElementById('cboCantIntervalos') as HTMLSelectElement;

// Definición del histograma de frecuencias.
const histograma: HTMLCanvasElement = document.getElementById('histograma') as HTMLCanvasElement;
const areaHistograma = histograma.getContext('2d');
let grafico: Chart;

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
    if (txtMuestra.value == "" || txtSemilla.value == "" || txtK.value == "" || txtG.value == "" || txtC.value == "") {
        alert('Tiene que ingresar todos los parámetros.');
    }
    else {
        const muestra: number = Number(txtMuestra.value);
        const semilla: number = Number(txtSemilla.value);
        const k: number = Number(txtK.value);
        const g: number = Number(txtG.value);
        const c: number = Number(txtC.value);
        const a: number = 1 + 4 * k;
        const m: number = Math.pow(2, g);
        await generador.generarNumerosPseudoaleatorios(muestra, semilla, a, m, c);
        for (let i: number = 0; i < generador.getEnteros().length; i++) {
            agregarFilaATabla(
                [i, generador.getEnteros()[i], generador.getRnds()[i]], tablaNumeros);
        }
        cboCantIntervalos.disabled = false;
        btnPruebaChiCuadrado.disabled = false;
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
    if (txtMuestra.value == "" || txtSemilla.value == "" || txtK.value == "" || txtG.value == "") {
        alert('Tiene que ingresar todos los parámetros (excepto C).');
    }
    else {
        const muestra: number = Number(txtMuestra.value);
        const semilla: number = Number(txtSemilla.value);
        const k: number = Number(txtK.value);
        const g: number = Number(txtG.value);
        const c: number = 0;
        const a: number = 3 + 8 * k;
        const m: number = Math.pow(2, g);
        await generador.generarNumerosPseudoaleatorios(muestra, semilla, a, m, c);
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
    cboCantIntervalos.disabled = true;
    btnPruebaChiCuadrado.disabled = true;
    btnGenerarGrafico.disabled = true;
    if (grafico != null)
        grafico.destroy();
})

// Dispara la prueba de Chi Cuadrado.
btnPruebaChiCuadrado.addEventListener('click', async () => {
    // Limpiamos la tabla para volver a llenarla.
    limpiarTabla(tablaChiCuadrado);
    const cantIntervalos: number = Number(cboCantIntervalos.value);
    if (cboCantIntervalos.value == '0')
        alert('Seleccione una cantidad de intervalos válida.');
    else {
        await testChiCuadrado.pruebaChiCuadrado(cantIntervalos, generador.getRnds());
        for (let i: number = 0; i < testChiCuadrado.getTabla().length; i++) {
            agregarFilaATabla(testChiCuadrado.getTabla()[i], tablaChiCuadrado);
        }
        txtResultHipotesis.value = testChiCuadrado.validarHipotesis();
        btnGenerarGrafico.disabled = false;
    }
})

// Función que borra los parámetros ingresados por el usuario.
function limpiarParametros(): void {
    txtA.value = '1 + 4k = ';
    txtC.value = '';
    txtG.value = '';
    txtK.value = '';
    txtM.value = '2ᵍ = ';
    txtMuestra.value = '';
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
    grafico = new Chart(areaHistograma, {
        type:'bar',
        data:{
            labels: testChiCuadrado.getIntervalos(),
            datasets:[{
                label: 'Frecuencias observadas',
                data: testChiCuadrado.getFrecuenciasObservadas(),
                backgroundColor: 'rgb(66, 134, 244,0.5)'
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