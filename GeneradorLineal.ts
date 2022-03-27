import {GeneradorNumeros} from "./GeneradorNumeros";

export class GeneradorLineal implements GeneradorNumeros {
    // La secuencia de números enteros usados para generar la secuencia pseudoaleatoria.
    private secuenciaEnteros: number[];
    // La secuencia de números pseudoaleatorios a generar.
    private secuenciaRnds: number[];

    // Función que obtiene una secuencia de números aleatorios usando el Método Congruencial Lineal.
    public async generarNumerosPseudoaleatorios(muestra: number, semilla: number, a: number, m: number, c: number): Promise<any> {
        // Inicializamos los vectores.
        this.secuenciaEnteros = [];
        this.secuenciaRnds = [];
        for (let i: number = 0; i < muestra; i++) {
            // Obtenemos el xi.
            let xi: number = (a * semilla + c) % m;
            // Obtenemos el rnd.
            let rnd: number = Number((xi / m).toPrecision(4));
            // Guardamos los elementos en sus respectivos vectores.
            this.secuenciaEnteros.push(xi);
            this.secuenciaRnds.push(rnd);
            // Actualizamos el valor de la semilla.
            semilla = xi;
        }
    }

    public getEnteros(): number[] {
        return this.secuenciaEnteros;
    }

    public getRnds(): number[] {
        return this.secuenciaRnds;
    }
}