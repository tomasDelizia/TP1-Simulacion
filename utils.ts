function getPivot(vec: number[], izq: number, der: number): number {
  return vec[Math.floor((der + izq) / 2)];
}

// Implementación del algoritmo QuickSort en Typescript.
export function quickSort(vec: number[], izq: number = 0, der: number = vec.length - 1): number[] {
  let pivot: number = getPivot(vec, izq, der);

  let i: number = izq;
  let j: number = der;

  while (i <= j) {
    while (vec[i] < pivot && i < der) {
      i++;
    }

    while (vec[j] > pivot && j > izq) {
      j--;
    }

    if (i <= j) {
      [vec[i], vec[j]] = [vec[j], vec[i]];
      i++;
      j--;
    }
  }

  if (izq < j) {
    quickSort(vec, izq, j);
  }

  if (i < der) {
    quickSort(vec, i, der);
  }
  return vec;
}

// Función que encuentra el primer índice de un vector cuyo valor es >= a un valor x.
function indiceMenor(vec: number[], x: number): number {
    let izq: number = 0;
    let der: number = vec.length - 1;
    while (izq <= der) {
        let medio: number = Math.floor((izq + der) / 2);
        if (vec[medio] >= x)
          der = medio - 1;
        else
            izq = medio + 1;
    }
    return izq;
}
   
// Función que encuentra el primer índice de un vector cuyo valor es < a un valor y.
function indiceMayor(vec: number[], y: number): number {
    let izq: number = 0;
    let der = vec.length - 1;
    while (izq <= der)
    {
        let medio: number = Math.floor((izq + der) / 2);
        if (vec[medio] < y)
            izq = medio + 1;
        else
            der = medio - 1;
    }
    return der;
}
   
// Función que cuenta los elementos de un vector en un rango dado.
export function contarEnRango(vec: number[], limInf: number, limSup: number): number {
    // Iniciar contador.
    let contador: number = 0;
    contador = indiceMayor(vec, limSup) -
            indiceMenor(vec, limInf) + 1;
    return contador;
}

// Función que añade un elemento a un vector en orden.
//export function addInOrder(vec: number[], x: number, n: number = vec.length): number//[] {
//  let izq: number = 0;
//  let der: number = n - 1;
//  let pos: number = n;
//  while (izq <= der) {
//    let medio: number = Math.floor((izq + der) / 2);
//    if (x == vec[medio]) {
//      pos = medio;
//      break;
//    }
//    if (x < vec[medio])
//        der = medio - 1;
//    else
//        izq = medio + 1;
//  }
//  if (izq > der)
//      pos = izq; 
//  vec.splice(pos, 0, x);
//  return vec;
//}