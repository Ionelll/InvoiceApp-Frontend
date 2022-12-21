export interface Factura{
      _id:string,
      furnizor:string,
      client:string,
      nr:string,
      emisa:string,
      scadenta:string,
      tablerow:{articol:string,bucati:string,ppb:string}[],
      net:string,
      tva:string,
      total:string,
      emisade:string
}