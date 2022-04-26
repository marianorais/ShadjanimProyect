import axios from "axios";
import { History } from "history";
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../auth/UserContext';
import { deleteUser, saveUserLocalStorage } from '../../helpers/login';
import { createSection, saveSectionLocalStorage } from '../../helpers/section';
import ShareButton from './share/ShareButton';
import { ErrorBox } from './ErrorBox';
import { Section } from '../../interfaces/section.interface';
import {userSection} from './../../helpers/section';
import {contentCreate, sectionContent} from './../../helpers/content';
import { Content } from '../../interfaces/content.interface';
import { UpdateContent, UpdateSection, UpdateUser } from "../../helpers/updates";
import validator from 'validator';
import { createUser } from "../../helpers/signUp";
import { DeleteBox } from "./DeleteBox";
import { User } from "../../interfaces/user.interface";
import { cropImage, uploadImage } from "../../helpers/uploads";
import Fillicon from "../../assets/img/Fillicon.png";
import blockModal from "../../assets/img/blockModal.png";

interface ActionProps {
    page: string,
    history?: History
}

export const ActionButtons:React.FC<ActionProps> = ({page, history}) => {
    const { user, setUser, uiState, setUiState } = useContext(UserContext)
    const { section, setSection } = useContext(UserContext)
    const { contentDelete, setContentDelete } = useContext(UserContext);
    const { sectionDelete, setSectionDelete } = useContext(UserContext);
    const { imagesNewUser,setImagesNewUser } = useContext(UserContext);

    const [ error, setError ] = useState<boolean>(false)
    const [modalDeleteResume,setModalDeleteResume] = useState(false)
    const { isLoading } = uiState;
    const [fillInputs, setFillInputs] = useState(false)
    const [inputsEmpty,setInputsEmpty] = useState<String[]>([]) 
    const backgroundColor =  'red' 


    const handleSignOut = () => {
        //borra el usuario 
        deleteUser(user.idResume) 

        setUser({} as User);
        setSection([]);
        setSectionDelete([]);
        setContentDelete([]);

        localStorage.removeItem('user');
        localStorage.removeItem('section');

        setUiState({isLogged: false, isLoading: false, error: false, message: ""});
        setModalDeleteResume(false)

    }

    const handleSave = async () => {
        setUiState({
            error: false,
            isLoading: true,
            message: "",
            isLogged: true
        });

        const { Nombre, Cumpleanos} = user;
        //const {} = section;
        //const {} = uiState;
        if ((Nombre === null || Nombre.trim().length === 0) || (Cumpleanos === null || Cumpleanos.trim().length === 0)) {
            setUiState({
                error: true,
                isLoading: false,
                message: 'You must fill in the required fields'
            })

            setError(true);
        } else {//aca se deberia guardar la informacion
            try {
                await UpdateUser(user)
            } catch (error) {
                setUiState({
                    error: true,
                    isLoading: false,
                    message: "Something went wrong",
                    isLogged: true
                });
                return setError(true);
            }

            setUser(user);
            saveUserLocalStorage(user);

            if(section[0] === undefined){
                //Si la section no contiene elementos
                SaveChanges(section)
            }

            DeleteSectionAndContent();

        }
    }
        //Funciones Declaradas
    const DeleteSectionAndContent = async () => { 

        var promiseDelete = new Promise(async function(resolve, reject) {
            //Promesa de respuesta hasta que no termine no continuo la ejecucion del codigo
            if(contentDelete.length > 0){
                const { data } = await axios.post('https://shadjanim.jojma.com.ar/Api/Content/Delete',contentDelete)
                contentDelete.length = 0
            }
            if(sectionDelete.length > 0){
                const { data } = await axios.post('https://shadjanim.jojma.com.ar/Api/Section/Delete',sectionDelete)
                section.filter(section => !sectionDelete.includes(section.ID))
                sectionDelete.length = 0
            }
            if(contentDelete.length === 0 && sectionDelete.length === 0){
                //Si ya elimine todo lo solicitado procedo al create
                resolve('Success')
            }
        })
        promiseDelete.then(function(value) { //Si termino el proceso de eliminado value === success
            if(value === "Success"){
                CreateAndGet();
            }
            }, function(reason) {
            console.log(reason); // Error!
        });
    }
    const CreateAndGet = () => { 
        var promiseCreate = new Promise(function(resolve, reject) { //Promesa de respuesta
            for(var i=0;i<section.length;i++){
                //Ordeno la lista
                section[i].Posicion = i
              }

                section.map(async (seccion,index)=>{
                 if(seccion.ID<1 && seccion.ID > 0){
                    //Create
                    const newSection = await createSection(seccion)
                    
                    seccion.ID = newSection.sectionID
                 }
                 else{
                     //Update
                    const sectionUpdated = await UpdateSection(seccion)

                    seccion = sectionUpdated
                 }
                //Contenidos de la seccion
                seccion.ContList.map(async contenido=>{
                    contenido.SectionID = seccion.ID //Vuelvo a asignarle el ID por si la section fue creada
                    if(contenido.ID<1 && contenido.ID>0){
                        const newContent = await contentCreate(contenido)
                        contenido.ID = newContent.contentID 
                    }
                    else{
                        const contentUpdated = await UpdateContent(contenido)
                        contenido.ID = contentUpdated.ID
                    }
                    if(seccion.ID === section[section.length - 1].ID && contenido.ID === seccion.ContList[seccion.ContList.length - 1].ID ){ 
                        //Si es el ultimo elemento de toda la lista termino proceso
                        resolve("Success")

                    }
                })
                
                if(seccion.ID === section[section.length - 1].ID && seccion.ContList.length === 0){ 
                    //Si es el ultimo elemento de toda la lista termino proceso
                    resolve("Success")
                }
            })
        })
        promiseCreate.then(async function(value) { //Si termino el proceso value === success
            if(value === "Success"){ 
                var aux = 0
                let { error: resultSection, data: sections } = await userSection(user.idResume);
                if(!resultSection){//Secciones existentes
                    for (const section of sections) {
                        // trae los contenidos de cada seccion
                        const content = await getContent(section);
                        section.ContList = content;
                        aux = aux + 1
                    }
                    if(aux === sections.length){
                        //Si ya recorri todas las secciones guardo los cambios
                        SaveChanges(sections)
                    }
                }
            }
        }, function(reason) {
            console.log(reason); // Error!
        });
    }
            
    const getContent = async (section: Section): Promise<Content[]> => {        
        let {error: resultContent, data} = await sectionContent(section.ID);
        return data;        
    }
    const SaveChanges = (sections:any) => {
        setUiState({...uiState, isLoading: false});
        setSection(sections);
        saveSectionLocalStorage(sections);
        history!.push('/save');
    }

        //New User 
    const handleCreate = async () => {

        setUiState({
            error: false,
            isLoading: true,
            message: "",
            isLogged: true
        });
        const { Nombre, Cumpleanos, Email, Password } = user;

        if (
            (Nombre === null || Nombre === undefined || Nombre?.trim().length === 0 || 
             Nombre === "John Doe") ||
            (Cumpleanos === null || Cumpleanos === undefined || Cumpleanos?.trim().length === 0) ||
            (Email === null || Email === undefined || Email?.trim().length === 0) ||
            (Password === null || Password === undefined || Password?.trim().length === 0))
        {
            console.log(Nombre)
            inputsEmpty.length = 0
            if(Nombre === null || Nombre === undefined || Nombre?.trim().length === 0 || Nombre === "John Doe"){
                //Verifico el campo vacio
                inputsEmpty.push("Your Name")
            }
            if(Cumpleanos === null || Cumpleanos === undefined || Cumpleanos?.trim().length === 0){
                //Verifico el campo vacio
                inputsEmpty.push("Birthday")
            }
            if(Email === null || Email === undefined || Email?.trim().length === 0){
                //Verifico el campo vacio
                inputsEmpty.push("Email")
            }
            if(Password === null || Password === undefined || Password?.trim().length === 0){
                //Verifico el campo vacio
                inputsEmpty.push("Password")
            }
            setFillInputs(true)
            setUiState({...uiState, isLoading: false});

            setError(true);
            return;
        } else {            

            try{//New User Created

                //Modifico valores default
                DefaultValues(user)
                const response = await createUser(user)
                if(response.ok === false){
                    //El user Ya existe
                    setUiState({
                        error: true,
                        isLoading: false,
                        message: "The email already exists",
                        isLogged: true
                    });
                    return setError(true);
                }
                const userCreated = response.user

                setUser(userCreated)
                saveUserLocalStorage(userCreated)
                SaveImage(userCreated) //Guardo imagen en la base

                cropImage(userCreated.Imagen1, userCreated.idResume,1) //Update image with canvas
                cropImage(userCreated.Imagen2, userCreated.idResume,2) //Update image with canvas
                cropImage(userCreated.Imagen3, userCreated.idResume,3) //Update image with canvas
                
                section.filter((s=>s.IsDefault && s.editDefault === false))
                .map((seccion)=>{
                    //Elimino las secciones default no editadas
                    section.splice(section.indexOf(seccion),1)
                })

                if(section[0] === undefined){
                    //Si la section no contiene elementos
                    SaveChanges(section)
                }
                
                var promiseSection = new Promise(function(resolve, reject) { //Promesa de respuesta

                    for(var i=0;i<section.length;i++){
                        //Ordeno la lista
                        section[i].Posicion = i
                      }
                    section.map(async seccion=>{
                        
                        seccion.Users_idResume = userCreated.idResume
                        
                        const sectionCreated = await createSection(seccion)

                        seccion.ID = sectionCreated.sectionID
                        seccion.IsDefault = false
                        
                        seccion.ContList.map(async contenido=>{
                            contenido.SectionID = seccion.ID //Le asigno el nuevo ID de la section
                            if(contenido.ID<1 && contenido.ID>0){
                                const newContent = await contentCreate(contenido)
                                contenido.ID = newContent.contentID // Le asigno el nuevo ID del contenido
                            }
                            if(seccion.ID === section[section.length - 1].ID && contenido.ID === seccion.ContList[seccion.ContList.length - 1].ID ){ 
                                //Si es el ultimo elemento de toda la lista termino proceso
                                resolve("Success")
                            }
                        })
                        if(seccion.ID === section[section.length - 1].ID && seccion.ContList.length === 0){ 
                            //Si es el ultimo elemento de toda la lista termino proceso
                            resolve("Success")
                        }
                    })

                })
                promiseSection.then(function(value) { //Si termino el proceso value === success
                    if(value === "Success"){
                        setSection(section)
                        saveSectionLocalStorage(section)
                        history!.push('/save');
                    }
                  }, function(reason) {
                    console.log(reason); // Error!
                  });
            } catch(error){
                setUiState({
                    error: true,
                    isLoading: false,
                    message: "Check the Data",
                    isLogged: true
                });
                return setError(true);
            }
        }
        
    }
    const SaveImage = (userCreated:any) => {
        imagesNewUser.map(async (imagen:any,index:any) => {
            await uploadImage(imagen!, userCreated.idResume, index + 1); // Lo guardo en la base
        })
    }
    
    // capta el valor de los inputs que son usados en la creacion de un usuario. Para nombre de usuario y contraseña
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputType = event.target.name;
        const value = event.target.value;

        if (inputType === 'Email' && !validator.isEmail(value)) {
            setUser({
                ...user,
                [inputType]: ''
            })
            return;
        }

        if (inputType === 'Password' && !value.length) {
            setUser({
                ...user,
                [inputType]: ' '
            })
            return;
        }
        setUser({
            ...user,
            [inputType]: value
        })
    }
    const DefaultValues = (user:any) => {
        //Change default values
        if(user.Pais === "Miami, Florida"){
            user.Pais = ""
        }
        if(user.Altura === "5.4"){
            user.Altura = "0"
        }
        if(user.ZipCode === 33101){
            user.ZipCode = 0
        }
    }

    return (
        <div className="actions">
                {
                    error &&
                        <ErrorBox error={uiState.error} isLoading={uiState.isLoading} message={uiState.message}/>
                }

                {   // Inputs usados solo al momento de crear un nuevo usuario
                    (!user.idResume && history?.location.pathname === '/shiduj') &&
                    <div className="safe-secure">
                        <span className="safe-secure__title">Safe & Secure</span>
                        <input placeholder='Email'    name="Email" type="email" className="safe-secure__input" onChange={handleInputChange}/>
                        <input placeholder='Password' name="Password" type="password" className="safe-secure__input" onChange={handleInputChange}/>
                    </div>
                }
                {
                    modalDeleteResume &&
                    <Link to="/login">
                        <DeleteBox
                            title='Delete User Account'
                            message='Are you sure you want to delete your user Account?'
                            onCancelClicked={() => setModalDeleteResume(false)}
                            onConfirmClicked={() => handleSignOut()}
                        />                                    
                    </Link>
                }
                {
                    fillInputs &&
                    
                    <div className="delete-modal">
                        <div style={{height:'350px'}} className="delete-box">
                        <div className={`${backgroundColor} navbar`}> {/* esta es la cabecera,cambia el color de fondo */}
                                <div className="topModal">
                                    <img alt="" height="60px"  src={blockModal}/>
                                </div>
                        </div>
                            <div className="ContentModal">
                                <p style={{fontWeight: 'normal',fontSize:'22px',textAlign:'left',marginBottom:'20px'}}>The following required sections have not been filled out</p>
                                {inputsEmpty.map((input)=>{
                                        return (
                                            <div className="listModal">
                                                <img alt='' src={Fillicon}/>  
                                                <p>{input}</p>
                                            </div>
                                        )
                                    })}
                            </div>
                            <div style={{right:'150px',marginTop: '2%'}} className="button-area">
                                <button style={{width:'250px',marginRight:'-70px'}} className="btn button-update" onClick={()=>setFillInputs(false)}>Got It!</button>
                            </div>
                        </div>
                    </div>
                }

                {
                    page === 'shiduj' 
                        ?
                            <div className="actions__buttons actions__buttons--2">

                                {
                                    !isLoading 
                                        ? <button className="btn__blue" onClick={user.idResume ? handleSave : handleCreate}>Save & Preview</button>
                                        : <button style={{'cursor':'default'}} className="btn__white" disabled={isLoading}>Saving</button>

                                }

                            </div>
                        :
                            <div>
                                <div className="actions__buttons actions__buttons--3">                                
                                    <ShareButton />
                                    
                                    <Link to="/shiduj">
                                        <button className="btn__edit">Edit</button>
                                    </Link>
                                    
                                    <button className="btn__delete" onClick={()=>setModalDeleteResume(true)} disabled={!user.idResume}>Delete this resume</button>
    
                                    <hr />
                                </div>
                            </div>

                }
        </div>
    )
}