export interface GeneradorNumeros {
  generarNumerosPseudoaleatorios
  (muestra : number, semilla : number, a : number, m : number, c : number): Promise<number[][]>;
}