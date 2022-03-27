/**
 * Divide el vector e intercambia valores.
 *
 * @param {number[]} vec
 * @param {number} [izq=0]
 * @param {number} [der=array.length - 1]
 * @returns {number}
 */
 function partition(vec: number[], izq: number = 0, der: number = vec.length - 1): number {
  const pivot: number = vec[Math.floor((der + izq) / 2)];
  let i: number = izq;
  let j: number = der;

  while (i <= j) {
    while (vec[i] < pivot) {
      i++;
    }

    while (vec[j] > pivot) {
      j--;
    }

    if (i <= j) {
      [vec[i], vec[j]] = [vec[j], vec[i]];
      i++;
      j--;
    }
  }

  return i;
}

/**
 * Implementación Quicksort
 *
 * @param {number[]} vec
 * @param {number} [izq=0]
 * @param {number} [der=array.length - 1]
 * @returns {number[]}
 */
export function quickSort(vec: number[], izq: number = 0, der: number = vec.length - 1): number[] {
  let index: number;
  if (vec.length > 1) {
    index = partition(vec, izq, der);

    if (izq < index - 1) {
      quickSort(vec, izq, index - 1);
    }

    if (index < der) {
      quickSort(vec, index, der);
    }
  }
  return vec;
}

// Función que encuentra el primer índice de un vector cuyo valor es >= a un valor x.
function indiceMenor(vec: number[], x: number): number {
    let menor: number = 0;
    let mayor: number = vec.length - 1;
    while (menor <= mayor) {
        let medio: number = Math.floor((menor + mayor) / 2);
        if (vec[medio] >= x)
          mayor = medio - 1;
        else
            menor = medio + 1;
    }
    return menor;
}
   
// Función que encuentra el primer índice de un vector cuyo valor es < a un valor y.
function indiceMayor(vec: number[], y: number): number {
    let menor: number = 0;
    let mayor = vec.length - 1;
    while (menor <= mayor)
    {
        let medio: number = Math.floor((menor + mayor) / 2);
        if (vec[medio] < y)
            menor = medio + 1;
        else
            mayor = medio - 1;
    }
    return mayor;
}
   
// Función que cuenta los elementos de un vector en un rango dado.
export function contarEnRango(vec: number[], limInf: number, limSup: number): number {
    // Iniciar contador.
    let contador: number = 0;
    contador = indiceMayor(vec, limSup) -
            indiceMenor(vec, limInf) + 1;
    return contador;
}