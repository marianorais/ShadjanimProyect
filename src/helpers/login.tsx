import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../components/auth/UserContext";
import { /* Content, ContentResponse, Section, SectionResponse,  */User, UserLoginResponse } from "../interfaces/user.interface";


export const login = async (email: string, password: string): Promise<UserLoginResponse> => {
    var userEdit = {}

    let isDate = 0
    const { data } = await axios.post('https://shadjanim.jojma.com.ar/Api/User/Login', {email: email, password: password});
    
    if(data.user === null){
        //Si no existe el usuario devuelvo null
        return data
    }
    if(data.user.isDate === true){
        isDate = 1
    }

    userEdit = {
            idResume: data.user.userID,
            Nombre: data.user.name,
            Cumpleanos: data.user.birthday,
            Edad: data.user.age,
            Pais: data.user.country,
            Altura: data.user.height,
            EdadoFecha: isDate,
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
    data.user = [userEdit]
    
    return data
}
export const deleteUser = async (userID:number):Promise<UserLoginResponse> => {
    const {data} = await axios.post('https://shadjanim.jojma.com.ar/Api/User/Delete?userID=' + userID.toString())
    return data
}

export const saveUserLocalStorage = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const getUserLocalStorage = (): User | undefined => {
    if (localStorage.getItem('user')) {
        const user: User = JSON.parse(localStorage.getItem('user')!);
        return user;
    }
}