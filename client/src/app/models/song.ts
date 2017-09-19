//export permite que esta clase sea importada en otro fichero
export class Song{
   constructor(
     public _id: string,
     public number: string,
     public name: string,
     public file: string,
     public album: string
   ){}
}
