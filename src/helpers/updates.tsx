import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../components/auth/UserContext"
import { Content } from "../interfaces/content.interface"
import { Section } from "../interfaces/section.interface"
import { User } from "../interfaces/user.interface"

export const UpdateUser = async (user: User): Promise<User> => {

    var showDate = false

    if(user.EdadoFecha === 1 ){
        showDate = true
    }
    //Update
    const {data} = await axios.post('https://shadjanim.jojma.com.ar/Api/User/Update',{
        userId: user.idResume,
        name: user.Nombre,
        //lastName: "",
        age: user.Edad,
        isDate: showDate,
        birthday: user.Cumpleanos,//"1982-06-11"
        height: user.Altura,
        country:user.Pais,
        gender: user.Sexo,
        isResumeBlock: user.IsResumeBlock,
        zipCode:user.ZipCode
    })
    var userEdit = {
        idResume: data.user.userID,
        Nombre: data.user.name,
        Cumpleanos: data.user.birthday,
        Edad: data.user.age,
        Pais: data.user.country,
        Altura: data.user.height,
        EdadoFecha: user.EdadoFecha,//Pasarlo a boolean
        Usuario: data.user.name + data.user.lastName,
        Password: user.Password,
        Imagen1:  user.Imagen1,
        Imagen2:  user.Imagen2,
        Imagen3:  user.Imagen3,
        SectionID: 0,
        Email: user.Email,
        Sexo: data.user.gender,
        ZipCode:user.ZipCode,
        IsResumeBlock:data.user.isResumeBlock,
    }
    data.user = [userEdit]
    if(data.ok){
        return data.data
    }
    return data
}
export const GetUser = async (idResume: number): Promise<User> => {

    //Update
    let isDate = 0
    const {data} = await axios.post('https://shadjanim.jojma.com.ar/Api/User/GetUser',{
        userId: idResume
    })
    if(data.user.isDate === true){
        isDate = 1
    }
    console.log(data)
        var userEdit = {
         idResume: data.user.userID,
         Nombre: data.user.name,
         Cumpleanos: data.user.birthday,
         Edad: data.user.age,
         Pais: data.user.country,
         Altura: data.user.height,
         EdadoFecha: isDate,//Hay que pasarlo a booleano
         Usuario: data.user.name + data.user.lastName,
         Password: data.user.password,
         Imagen1:  data.user.img1Base64,
         Imagen2: data.user.img2Base64,
         Imagen3:  data.user.img3Base64,
         SectionID: 0,
         Email: data.user.email,
         Sexo: data.user.gender,
         ZipCode:data.user.zipCode,
         IsResumeBlock:data.user.isResumeBlock,
    }
    data.user = userEdit
        if(data.ok){
          return data.user
        }
    return data
}
export const UpdateSection = async (section: Section): Promise<Section> => {
    var isEnable = true
    if(section.Enable === 0){
        isEnable = false
    }
    //Update
    const {data} = await axios.post('https://shadjanim.jojma.com.ar/Api/Section/Update',{
        sectionID: section.ID,
        title: section.Titulo,
        position: section.Posicion,
        isEnable: isEnable
    })
    const sectionUpdate = { //Adapto la respuesta de la API a la interface
        ID: section.ID,
        Titulo: data.data.title,
        Posicion: data.data.position,
        IsDefault:false,
        editDefault:false,
        Enable: section.Enable,
        Users_idResume: section.Users_idResume,
        ContList: section.ContList
    }
    data.data = sectionUpdate //Devuelvo las variables adaptadas a la interface
    if(!data.error){
        return data.data
    }
    else{
        ErrorUpdateSection()
    }
    return data.data
}
export const UpdateContent = async (content: Content): Promise<Content> => {
    let contentUpdated = content
    if(content.Tipo==="BULLET"){
        const {data} = await axios.post('https://shadjanim.jojma.com.ar/Api/Content/Update',{
            contentID: content.ID,
            value: content.Bullet
        })
        contentUpdated.Bullet = data.data.value
        return contentUpdated
    }
    if(content.Tipo==="TEXTO"){
        const {data} = await axios.post('https://shadjanim.jojma.com.ar/Api/Content/Update',{
            contentID: content.ID,
            value: content.Texto
        })
        contentUpdated.Texto = data.data.value
        return contentUpdated
    }
    else{
        const {data} = await axios.post('https://shadjanim.jojma.com.ar/Api/Content/Update',{
            contentID: content.ID,
            value: content.Contactos.replace(/ /g, '')  + ' ' + content.Texto //Separo el name del contacto
        })
        return contentUpdated
    }
}
const ErrorUpdateSection = () => {
    const { setUiState } = useContext(UserContext)
    return (
        setUiState({
            error: true,
            isLoading: false,
            message: "Section is does not exist",
            isLogged: true
        })
    )
}
