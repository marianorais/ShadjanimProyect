import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../components/auth/UserContext";
import { ErrorBox } from "../components/shiduj/ErrorBox";
import { User, UserResponse, UserCreationRequest } from "../interfaces/user.interface";



export const signUp = async (newUser: User): Promise<{idCreated: number, error: boolean}> => {
    // const newUserRequest: UserCreationRequest = {
    //     op: 'CREATE',
    //     data_op: newUser
    // }
    // const { data } = await axios.post('http://localhost:9016/Users', { ...newUserRequest } );
    const {data} = await axios.post('https://shadjanim.jojma.com.ar/Api/User/Create',{email:newUser.Email,password:newUser.Password,gender:newUser.Sexo,birthday:newUser.Cumpleanos})
    console.log(data)

    return data;
}

export const createUser = async (newUser: User): Promise<UserResponse> => {

    var showDate = false

    if(newUser.EdadoFecha === 1 ){
        showDate = true
    }
    const {data} = await axios.post('https://shadjanim.jojma.com.ar/Api/User/Create',{
        userId: newUser.idResume,
        name: newUser.Nombre,
        lastName: "",
        age: newUser.Edad,
        isDate: showDate,
        birthday: newUser.Cumpleanos,//"1982-06-11"
        email: newUser.Email,
        password: newUser.Password,
        height: newUser.Altura,
        country:newUser.Pais,
        gender: newUser.Sexo,
        imagen1:newUser.Imagen1,
        imagen2:newUser.Imagen2,
        imagen3:newUser.Imagen3,
        img1Base64:newUser.Imagen1,
        img2Base64:newUser.Imagen2,
        img3Base64:newUser.Imagen3,
        isResumeBlock: newUser.IsResumeBlock,
        zipCode:newUser.ZipCode,
    })
    var userEdit = {
        idResume: data.user.userID,
        Nombre: data.user.name,
        Cumpleanos: data.user.birthday,
        Edad: data.user.age,
        Pais: data.user.country,
        Altura: data.user.height,
        EdadoFecha: newUser.EdadoFecha,//Pasarlo a boolean
        Usuario: data.user.name + data.user.lastName,
        Password: newUser.Password,
        Imagen1:  newUser.Imagen1,
        Imagen2:  newUser.Imagen2,
        Imagen3:  newUser.Imagen3,
        SectionID: 0,
        Email: newUser.Email,
        Sexo: data.user.gender,
        ZipCode: data.user.zipCode,
        IsResumeBlock:data.user.isResumeBlock,
    }
    data.user = userEdit
    return data
}