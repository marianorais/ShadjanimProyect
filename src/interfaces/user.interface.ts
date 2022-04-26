import { Section } from "./section.interface"

export interface User {
    idResume: number,
    Nombre: string,
    Cumpleanos: string,
    Edad: number,
    Pais: string,
    Altura: string,
    EdadoFecha: number,
    Usuario: string,
    Password: string,
    Imagen1: string,
    Imagen2: string,
    Imagen3: string,
    Section_ID: number,
    Email: string,
    Sexo: string,
    ZipCode:number,
    IsResumeBlock:boolean,
}

export type UserContextState = {
    //Global Data
    user: User,
    setUser: (user: User) => void,
    section: Section[],
    setSection: (section: Section[]) => void,
    sectionDelete:number[],
    setSectionDelete:(sectionDelete:number[]) => void,
    contentDelete : number[],
    setContentDelete:(contentDelete:number[]) => void,
    imagesNewUser : File[],
    setImagesNewUser : (imagesNewUser: File[]) => void;
}
export type UserLoginResponse = {
    ok: boolean,
    user: User[]
}

export type UserResponse = {
    ok: boolean,
    user: User
}
export type UserCreationRequest = {
    op: string,
    data_op: User
}

