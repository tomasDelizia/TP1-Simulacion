export class GeneradorCSV {
  public generarArchivo(vec: any[], nombreArchivo: string): void {
    let contenidoCSV: string = "data:text/csv;charset=utf-8,";

    for (let i: number = 0; i < vec.length; i++) {
      let fila: string = vec[i] + ",";
      contenidoCSV += fila + "\r\n";
    }

    var encodedUri: string = encodeURI(contenidoCSV);
    var link: HTMLAnchorElement = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", nombreArchivo + ".csv");
    document.body.appendChild(link); 
    link.click();
  }
}