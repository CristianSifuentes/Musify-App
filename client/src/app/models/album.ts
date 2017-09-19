//export permite que esta clase sea importada en otro fichero
export class Album{
   constructor(
     public _id: string,
     public description: string,
     public year: string,
     public image: string,
     public artist: string
   ){}
}
