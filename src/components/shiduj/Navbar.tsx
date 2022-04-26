import React, { useContext, useState } from 'react'
import { MdDragHandle,MdClose } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { BsFillPencilFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import ShareButton from './share/ShareButton'
import { UserContext } from '../auth/UserContext';
import axios from "axios";
import { saveUserLocalStorage } from '../../helpers/login';
import { createSection, deleteSection, saveSectionLocalStorage, userSection } from '../../helpers/section';
import { contentCreate, deleteContentFromDataBase, sectionContent } from '../../helpers/content';
import { Content } from '../../interfaces/content.interface';
import { Section } from '../../interfaces/section.interface';
import { UpdateContent, UpdateSection, UpdateUser } from '../../helpers/updates';
import { createUser } from '../../helpers/signUp';
import { cropImage, uploadImage } from '../../helpers/uploads';
import { User } from '../../interfaces/user.interface';
import ModalCross from '../../assets/img/ModalCross.png';
import Fillicon from "../../assets/img/Fillicon.png";
import blockModal from "../../assets/img/blockModal.png";

interface NavbarProps {
    page: string;       
    reference?: any;
    history?: any;
    click?: any;
}

export const Navbar: React.FC<NavbarProps> = ({page, reference, history,click}) => {
    const backgroundColor = (page === 'shiduj' || page === 'save') ? 'blue-light' : 'grey';

    const { user, setUser, uiState, setUiState } = useContext(UserContext)
    const { section, setSection } = useContext(UserContext)
    const [ error, setError ] = useState<boolean>(false)
    const { contentDelete, setContentDelete } = useContext(UserContext);
    const { sectionDelete, setSectionDelete } = useContext(UserContext);
    const { imagesNewUser, setImagesNewUser } = useContext(UserContext);
    const [modalSignOut , setModalSignOut] = useState(false)
    const [inputsEmpty,setInputsEmpty] = useState<String[]>([]) 
    const [modalFillInputs, setModalFillInputs] = useState(false)
    const { isLoading } = uiState;

    const handleSave = async () => {
        setUiState({
            error: false,
            isLoading: true,
            message: "",
            isLogged: true
        });


        const { Nombre, Cumpleanos} = user;

        if ((Nombre === null || Nombre.trim().length === 0 ) ||
           (Cumpleanos === null || Cumpleanos.trim().length === 0)) {
            
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
            saveUserLocalStorage(user)

            if(section[0] === undefined){
                //Si la section no contiene elementos
                SaveChanges(section)
            };

            DeleteSectionAndContent();
        }
    }
        //Funciones Declaradas
    const DeleteSectionAndContent = async () => { 

        var promiseDelete = new Promise(async function(resolve, reject) {
            //Promesa de respuesta hasta que no termine no continuo la ejecucion del codigo
            if(contentDelete.length > 0){
                deleteContentFromDataBase(sectionDelete)
                contentDelete.length = 0
            }
            if(sectionDelete.length > 0){
                deleteSection(sectionDelete)
                section.filter(section => !sectionDelete.includes(section.ID))
                sectionDelete.length = 0
            }
            if(contentDelete.length === 0 && sectionDelete.length === 0){
                //Si ya elimine todo lo solicitado procedo al create
                resolve('Success')
            }
        })
        
        promiseDelete.then(function(value) { 
            //Si termino el proceso de eliminado value === success
            if(value === "Success"){
                CreateAndGet();
            }
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
                    //Create section
                    const newSection = await createSection(seccion)
                    seccion.ID = newSection.sectionID
                 }
                 else{
                    //Update
                    const sectionUpdated = await UpdateSection(seccion)
                    seccion = sectionUpdated
                 }

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
                (Nombre === null || Nombre === undefined || Nombre?.trim().length === 0 || Nombre === "John Doe") || 
                (Cumpleanos === null || Cumpleanos === undefined || Cumpleanos?.trim().length === 0) ||
                (Email === null || Email === undefined || Email?.trim().length === 0) ||
                (Password === null || Password === undefined || Password?.trim().length === 0))
            {
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
                setModalFillInputs(true)
                setUiState({...uiState, isLoading: false});
    
                setError(true);
                return;
            } else {            
    
                try{//New User Created
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
                            
                            seccion.IsDefault = false //Una vez guardada no es mas default
                            seccion.ID = sectionCreated.sectionID
                            
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
                        message: "Check the data",
                        isLogged: true
                    });
                    return setError(true);
                }
            }
            
        }
    const SaveImage = (userCreated:any) => {
        imagesNewUser.map(async (imagen,index) => {
            await uploadImage(imagen!, userCreated.idResume, index + 1); // Lo guardo en la base
        })
    }
    const CloseSession = () =>{
        setUser({} as User);
        setSection([]);
        setSectionDelete([]);
        setContentDelete([]);

        localStorage.removeItem('user');
        localStorage.removeItem('section');

        setUiState({isLogged: false, isLoading: false, error: false, message: ""});
    
    }

    return (
        <div className={`${backgroundColor} navbar`}> {/* esta es la cabecera, siempre igual. Solo cambia el color de fondo */}
            <div style={{'padding': '15px'}}>
                <div className="navbar__top">
                    <p className="navbar__top--title">MyShidduchResume.com</p> 
                    {
                        page === 'options' &&  /* icono que va a la derecha, este es una X, el siguiente es hamburguesa y se muestran segun la opcion que el usuario presiono */
                            <Link to="/shiduj">
                                <IoMdClose className="navbar__top--icon"/>
                            </Link>
                    }
                    {
                        ((page === 'shiduj' || page === 'save') && user.idResume) &&
                            <Link to="/options">
                                <MdDragHandle className="navbar__top--icon"/>
                            </Link>
                    }
                    {
                        (page === 'shiduj' && !user.idResume) &&
                            <MdClose className="navbar__top--icon" onClick={() => setModalSignOut(true)}/>
                            
                    }
                </div>

                {
                    // aca viene la parte de los botones que van debajo de la cabecera. Si esta en la pagina de edicion (shiduj), el boton es Save & Previe
                    // si presiona el boton de Save & Preview, el boton sera send & share
                    page !== 'options' &&   
                        <div className="navbar__bottom">
                            {
                                page === 'shiduj' 
                                    ? 
                                        !isLoading 
                                            ?
                                                <button 
                                                    onClick={user.idResume ? handleSave : handleCreate}
                                                    className="btn btn__blue navbar__bottom--button"
                                                >Save & Preview
                                                </button>
                                            :
                                                <button 
                                                    style={{'cursor':'default'}} 
                                                    className="btn btn__white navbar__bottom--button" 
                                                    disabled={isLoading}
                                                >Saving
                                                </button>
                                        

                                    : page === 'save' &&
                                        <div className="navbar__bottom--container">
                                            <Link to="/shiduj">
                                                <button className="navbar__bottom--pen"><BsFillPencilFill /></button>                                        
                                            </Link>
                                            
                                            <ShareButton />
                                        </div>
                            }
                        </div>
                }
                {
                    modalFillInputs &&
                    <div className="delete-modal">
                    <div style={{height:'350px'}} className="delete-box">
                    <div className={`red navbar`}> {/* esta es la cabecera,cambia el color de fondo */}
                            <div className="topModal">
                                <img alt="" height="60px"  src={blockModal}/>
                            </div>
                    </div>
                        <div className="ContentModal">
                            <b><p style={{fontWeight: 'normal',fontSize:'22px',textAlign:'left',marginBottom:'20px'}}>The following required sections have not been filled out</p></b>
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
                            <button style={{width:'250px',marginRight:'-70px'}} className="btn button-update" onClick={()=>setModalFillInputs(false)}>Got It!</button>
                        </div>
                    </div>
                </div>
                }

                {   modalSignOut && 
                 <div className="delete-modal">
                    <div className="delete-box">
                        <div className="text-container">
                            <img alt='' src={ModalCross}/>
                            <div className="ContentModal">
                                <b><p>If you leave now, your changes wont be saved</p></b> 
                            </div>
                        </div>
                    </div>
             
                 <div className="button-area">
                    <button className="btn button-cancel" onClick={()=>setModalSignOut(false)}>Cancel</button>
                    <button className="btn button-update" onClick={()=>CloseSession()}>Leave</button>
                 </div>        
                </div>
                }
            </div>
        </div>        
    )
}
