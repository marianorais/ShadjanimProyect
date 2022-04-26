import React, {useContext, useEffect, useState} from 'react'
import { History } from 'history';
import { Link, useLocation} from 'react-router-dom';
import { Redirect } from 'react-router'
import { SectionResumePreview } from '../components/shiduj/sections/SectionResumePreview';
import { Section } from '../interfaces/section.interface';
import { Images } from '../components/shiduj/images/Images';
import CryptoJS from "crypto-js"
import { User } from "./../interfaces/user.interface";
import { Content } from "./../interfaces/content.interface";
import {GetUser} from "./../helpers/updates";
import { userSection } from '../helpers/section';
import { sectionContent } from '../helpers/content';
import { UserContext } from '../components/auth/UserContext';
import { DateTime } from 'luxon';
import { MdDragHandle } from "react-icons/md";
import profilePadlock from '../assets/img/PadlockProfile.png';
import padlock from '../assets/img/PadLock.png';
import paint from '../assets/img/footer-paint.png';
import cloud from '../assets/img/footer-cloud.png';
import { DeleteBox } from '../components/shiduj/DeleteBox';
import {ProfileView} from './ProfileView';

export const ProfileHub: React.FC<{history: History}> = ({history}) => {
    const location = useLocation();

    //Elimino el ? y me quedo con el hash
    var hash = location.search.slice(1)

    //Desencripto el hash
    var bytes  = CryptoJS.AES.decrypt(hash, 'shidujKey');

    //Obtengo el Id del user
    var idUser = bytes.toString(CryptoJS.enc.Utf8)

    const { user, setUser, uiState, setUiState } = useContext(UserContext)
    const [userLocal,setUserLocal] = useState<User>(user) //Usuario de la persona que entra al profile view

    const [userLoad, setUserLoad] = useState(false)
    const [viewUserProfile,setViewUserProfile] = useState(false)

    const [sections,setSections] = useState<Section[]>();
    const [fecha, setFecha] = useState<string>('')
    const backgroundColor = 'blue-light';
    const { isLoading } = uiState;


    useEffect(() => { //carga info la primera vez 
        setUiState({isLogged: false, isLoading: true, message: '', error: false});
        GetUserData(idUser)
        GetSectionData(idUser)
    }, [])
    
    const GetUserData = async (id:any)=> {
        await GetUser(id).then((userResponse)=> 
        {
            //Response de la API

            if(userResponse.IsResumeBlock){
                //Si el usuario esta bloqueado se redirige 
                setUiState({isLogged: false, isLoading: false, message: '', error: false});
                history.push('./profileBlock');
            }
            setUser(userResponse);
            setUserLoad(true);
            if(userResponse.Cumpleanos !== undefined)
            {
                const fecha = DateTime.fromISO(userResponse?.Cumpleanos).toFormat('LL/dd/yyyy');   
                setFecha(fecha);  
            }
            setUiState({isLogged: false, isLoading: false, message: '', error: false});
        })
    }
    
    const GetSectionData = async (id:any)=> {
        let { error: resultSection, data: sections } = await userSection(id);
        if(!resultSection){//Secciones existentes
            for (const section of sections) {
            // trae los contenidos de cada seccion
                const content = await getContent(section);
                section.ContList = content;
            }
            setSections(sections);
        }
    }
    const getContent = async (section: Section): Promise<Content[]> => {        
        let {error: resultContent, data} = await sectionContent(section.ID);
        return data;        
    }

    return (
        <>
        { !userLoad ?
            //Loading
            <div className="spinner-container">
                <div className="loading-spinner"></div>
            </div>
            :
            //Not Loading

             !viewUserProfile ? 
              //Screen without Data
                <div className="shiduj-screen">
                    <div className={`${backgroundColor} navbar`}> {/* esta es la cabecera, siempre igual. Solo cambia el color de fondo */}
                        <div style={{'padding': '15px'}}>
                            <div className="navbar__top">                
                                <p className="navbar__top--title">MyShidduchResume.com</p> 
                                <Link to="/login" onClick={() => setUser(userLocal)}>
                                    <MdDragHandle className="navbar__top--icon"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='blockPage' style={{margin:'30%'}}>
                        <div style={{marginBottom:'5%'}}>
                            <img alt='' src={profilePadlock} className='section-options__btn--icon'/>
                        </div>
                        <b><p>{user?.Nombre}</p></b>
                        <b><p>Shidduch Resume</p></b>
                        <button style={{marginTop:'50%',width:'150px'}} className="btn__blue" onClick={() => setViewUserProfile(true)}>Click To View</button>
                    </div>
                </div>
             : 
                //Screen with Data
                <ProfileView history={history} userLocal={userLocal} sections={sections} />
        }
    </>
    )
}
