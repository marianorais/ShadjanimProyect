import axios from "axios";
import { userInfo } from "os";
import { useContext } from "react";
import { UserContext } from "../components/auth/UserContext";
import { Content, ContentCreateResponse, ContentGetResponse } from "../interfaces/content.interface";
import { Section } from "../interfaces/section.interface";

export const sectionContent = async (idSection: number): Promise<ContentGetResponse> => {
    const { data } = await axios.post('https://shadjanim.jojma.com.ar/Api/Content/GetContentsBySectionID',{
        "SectionID":idSection
    })
    var contenidosSection:any = []

    data.data.map((contenido:any)=>{ //Adapto las variables de la respuesta a mi content interface
            var content = {
                ID: contenido.contentID,
                Tipo: contenido.type,
                Bullet: contenido.value,
                Texto: contenido.value,
                Contactos: contenido.value,
                IsDefault: false,
                WasEditedDefault:false,
                SectionID: contenido.sectionID,
                Section_Users_idResume: 0
            }
            if(contenido.type === "CONTACT"){
                //Separo el name del contact
                 var texto = contenido.value.split(" ")[1]
                 var contact = contenido.value.split(" ")[0]
                 
                 if(texto === undefined){
                     texto = contenido.value
                 }

                 if(contact === undefined){
                    contact = contenido.value
                 }
                 
                 content = {
                     ID: contenido.contentID,
                     Tipo: contenido.type,
                     Bullet: contenido.value,
                     Texto: texto,
                     Contactos: contact,
                     IsDefault: false,
                     WasEditedDefault:false,
                     SectionID: contenido.sectionID,
                     Section_Users_idResume: 0
                }
            }
            contenidosSection.push(content)
    })
    data.data = contenidosSection
  
    return data;
}

export const contentCreate = async (content:Content):Promise<ContentCreateResponse> => {
    if(content.Tipo === "TEXTO"){
        const { data } = await axios.post('https://shadjanim.jojma.com.ar/Api/Content/Create', {
            SectionID: content.SectionID,
            Type: content.Tipo,
            Value: content.Texto
        })
        return data
    }
    if(content.Tipo === "BULLET"){
        const { data } = await axios.post('https://shadjanim.jojma.com.ar/Api/Content/Create', {
            SectionID: content.SectionID,
            Type: content.Tipo,
            Value: content.Bullet
        })
        return data
    }
    else{
        const { data } = await axios.post('https://shadjanim.jojma.com.ar/Api/Content/Create', {
            SectionID: content.SectionID,
            Type: content.Tipo,
            Value: content.Contactos.replace(/ /g, '')  + ' ' + content.Texto //Separo el name del contacto
        })
        return data
    }
}

export const deleteContentFromDataBase = async (contentList: number[]): Promise<any> => {   
    const { data } = await axios.post('https://shadjanim.jojma.com.ar/Api/Content/Delete',contentList)
    return;
}

export const deleteContent = (section: Section[], idSection: number, contentId: number): Section[] => {
    const sectionAux = section.map(seccion => {
        if (seccion.ID === idSection) {
            const index = seccion.ContList.findIndex(cont => cont.ID === contentId)
            seccion.ContList.splice(index, 1);
        }

        return seccion;
    });

    return sectionAux;
}

export const addContent = (section: Section[], content: Content, value: string, idContent: number, fieldName?: string): Section[] => {
    // fieldName sirve para el caso en el cual se quiera ingresar datos de contacto. Puede ingresar nombre 
    // y numero de contacto o email. Cada uno de estos se guarda en distintos campos en la tabla. Sabemos donde
    // guardarlos segun el valor de fieldName.
    const sectionAux = section.map(seccion => {
        if (seccion.ID === content?.SectionID) {    
            const index = seccion.ContList.findIndex(cont => cont.ID === idContent)

            switch (content.Tipo) {
                case 'BULLET':
                    seccion.ContList[index].Bullet = value;
                    break;
                case 'TEXTO':
                    seccion.ContList[index].Texto = value;
                    break;
                case 'CONTACT':
                    if (fieldName === 'name') {
                        seccion.ContList[index].Texto = value;
                    } else if (fieldName === 'number') {
                        seccion.ContList[index].Contactos = value;
                    }
                    break;
            }
            
        }
        return seccion;
    })

    return sectionAux;
}
