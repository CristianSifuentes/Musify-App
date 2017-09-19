//export permite que esta clase sea importada en otro fichero
export class User{
   constructor(
     public _id: string,
     public name: string,
     public surname: string,
     public email: string,
     public password: string,
     public role: string,
     public image: string
   ){}
}
