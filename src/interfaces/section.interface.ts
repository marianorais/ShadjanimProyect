import { Content } from "./content.interface"

export interface Section {
    ID: number,
    Titulo: string,
    IsDefault: boolean,
    Posicion: number,
    editDefault:boolean,
    Enable: number,
    Users_idResume: number,
    ContList: Content[]
}
export type SectionContextState = {
    section: Section,
    setSection: (section: Section)=>void;
}

export type SectionResponse = {
    error: boolean,
    data: Section[]
}

export type SectionCreateResponse = {
    error: boolean,
    sectionID: number
}
