export class TestChiCuadrado {
  // Tabla de distribución Chi Cuadrado con p = 0.95, para grados de libertad entre 1 y 30.
  private tablaChiCuadrado: number[] = [
    3.841, 5.991, 7.815, 9.488, 11.07, 12.592, 14.067, 15.507, 16.919, 18.307,
    19.675, 21.026, 22.362, 23.685, 24.996, 26.296, 27.587, 28.869, 30.144, 31.41,
    32.671, 33.924, 35.172, 36.415, 37.652, 38.885, 40.113, 41.337, 42.557, 43.773,
  ];

  public pruebaChi(cantIntervalos: number, rnds: number[]): number {
    let limInferior: number = 0;
    const anchoIntervalo: number = 1 / cantIntervalos;
    const frecEsperada: number = rnds.length / cantIntervalos;
    let tabla : string[][] = [];
    for (let i: number = 0; i < cantIntervalos; i++) {
      let limSuperior: number = limInferior + anchoIntervalo;
      tabla.push([
        limInferior + '-' + limSuperior,
        //contarEnIntervalo(rnds, limInf, limSup)
      ]);
      limInferior = limSuperior;
    }
    return 0;
  }
}