export class TestChiCuadrado {
  // Tabla de distribución Chi Cuadrado con p = 0.95, para grados de libertad entre 1 y 30.
  private tablaChiCuadrado: number[] = [
    3.841, 5.991, 7.815, 9.488, 11.07, 12.592, 14.067, 15.507, 16.919, 18.307,
    19.675, 21.026, 22.362, 23.685, 24.996, 26.296, 27.587, 28.869, 30.144, 31.41,
    32.671, 33.924, 35.172, 36.415, 37.652, 38.885, 40.113, 41.337, 42.557, 43.773,
  ];
  private v: number;
  private tabla: string[][];
  private estadisticoAcum: number

  public pruebaChi(cantIntervalos: number, rnds: number[]): number {
    let limInferior: number = 0;
    const anchoIntervalo: number = 1 / cantIntervalos;
    const frecEsperada: number = rnds.length / cantIntervalos;
    this.estadisticoAcum = 0;
    this.tabla = [];
    this.v = cantIntervalos-1;
    for (let i: number = 0; i < cantIntervalos; i++) {
      let limSuperior: number = limInferior + anchoIntervalo;
      let frecObservada = this.contarEnIntervalo(rnds, limInferior, limSuperior);
      let estadistico : number = (Math.pow((frecObservada-frecEsperada),2)) / frecEsperada;
      this.estadisticoAcum += estadistico;
      this.tabla.push([
        limInferior.toFixed(2) + ' - ' + limSuperior.toFixed(2),
        frecObservada.toString(),
        frecEsperada.toString(),
        estadistico.toFixed(4).toString(),
        this.estadisticoAcum.toFixed(4).toString(),
      ]);
      limInferior = limSuperior;
    }
    return this.estadisticoAcum;
  }

  public contarEnIntervalo(rnds : number[], limInferior: number, limSuperior: number ): number{
    let cont : number = 0;
    for (let i: number = 0; i < rnds.length; i++){
      if(rnds[i] >= limInferior && rnds[i] < limSuperior)
        cont++;
    }
    return cont
  }

  public validarHipotesis(): boolean{
    // si el estadistico calculado es mayor al tabulado se rechaza la hipotesis nula 
    if(this.estadisticoAcum > this.tablaChiCuadrado[this.v-1])
      return false
  }

  public getTabla(): string[][] {
    return this.tabla;
  }
}