import {GeneradorNumeros} from "./GeneradorNumeros";

export class GeneradorMultiplicativo implements GeneradorNumeros {

    // Función que obtiene una secuencia de números aleatorios usando el Método Congruencial Multiplicativo.
    public async generarNumerosPseudoaleatorios(muestra: number, semilla: number, a: number, m: number, c: number): Promise<number[][]> {
        // Se define la matriz a retornar, que tiene por filas al par xi, rnd.
        let tabla : number[][] = [];
        for (let i = 0; i < muestra; i++) {
            // Obtenemos el xi.
            let x: number = (a * semilla) % m;
            // Obtenemos el rnd.
            let rnd: number = Number((x / m).toPrecision(4));
            // Guardamos en la matriz el par xi, rnd.
            tabla.push([i, x, rnd]);
            // Actualizamos el valor de la semilla.
            semilla = x;
        }
        return tabla;
    }
}