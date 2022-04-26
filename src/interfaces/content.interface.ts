export interface Content {
    ID: number;
    Tipo: string;
    Bullet: string;
    Texto: string;
    Contactos: string;
    IsDefault: boolean;
    WasEditedDefault:boolean;
    SectionID: number;
    Section_Users_idResume: number;
}

export type ContentGetResponse = {
    error:boolean,
    data: Content[];
}
export type ContentCreateResponse = {
    error:boolean,
    contentID: number;
}