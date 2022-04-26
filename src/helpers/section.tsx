
import axios from "axios";
import { Section, SectionResponse,SectionCreateResponse } from "../interfaces/section.interface";
import { sectionContent } from "../helpers/content";
import { useContext } from "react";
import { UserContext } from "../components/auth/UserContext";


export const userSection = async (idResume: number): Promise<SectionResponse> => {
    var userSections:any = []
    
    const { data } = await axios.post('https://shadjanim.jojma.com.ar/Api/Section/GetSectionsByUserID', {
        //Get
        UserID: idResume
    })
    data.data.map((seccion:any)=>{ //Adapto las variables de la respuesta de la API a nuestra interface de Section
        var section = {
            ContList: [],
            Enable: 0,
            ID: seccion.sectionID,
            IsDefault: false,
            Posicion: seccion.position,
            Titulo: seccion.title,
            Users_idResume: seccion.userID
        }
        userSections.push(section)
    })
    data.data = userSections
    return data
}


export const deleteSection = async (sectionList: number[]): Promise<any> => {
    const { data } = await axios.post('https://shadjanim.jojma.com.ar/Api/Section/Delete',sectionList)
    console.log(data)
    return; 
}

export const createSection = async (section: Section): Promise<SectionCreateResponse> => {
        const { data } = await axios.post('https://shadjanim.jojma.com.ar/Api/Section/Create', {
            Title: section.Titulo,
            Position: section.Posicion,
            UserID: section.Users_idResume
        })
        // var newSection = {
        //     CantidadDatos: 0,
        //     ContList: [],
        //     Enable: 0,
        //     ID: data.sectionID,
        //     IsDefault: false,
        //     Posicion: section.Posicion,
        //     Titulo: section.Titulo,
        //     Users_idResume: section.Users_idResume
        // }
        
        // data.sectionID = newSection //Devuelvo la seccion entera
        if(!data.error){
            return data;
        }
        else{
            ErrorApi()
        }
        return data;
}

export const saveSectionLocalStorage = (section: Section[]) => {
    localStorage.setItem('section', JSON.stringify(section));
}

export const getSectionLocalStorage = (): Section[] | undefined => {
    if (localStorage.getItem('section')) {
        const section: Section[] = JSON.parse(localStorage.getItem('section')!);
        return section;
    }
}

const ErrorApi = () => {
    const { setUiState } = useContext(UserContext)
    return (
        setUiState({
        error: true,
        isLoading: false,
        message: "Something was wrong",
        isLogged: true
        })
    )
    
}