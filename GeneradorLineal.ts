import {GeneradorNumeros} from "./GeneradorNumeros";

export class GeneradorLineal implements GeneradorNumeros {

    // Función que obtiene una secuencia de números aleatorios usando el Método Congruencial Lineal.
    public async generarNumerosPseudoaleatorios(muestra: number, semilla: number, a: number, m: number, c: number): Promise<number[][]> {
        // Se define la matriz a retornar, que tiene por columnas los i, los xi y los rnd.
        let tabla : number[][] = [];
        for (let i = 0; i < muestra; i++) {
            // Obtenemos el xi.
            let x: number = (a * semilla + c) % m;
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