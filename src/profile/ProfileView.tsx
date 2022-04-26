import React, {useContext, useEffect, useState} from 'react'
import { MdDragHandle } from "react-icons/md";
import { History } from 'history';
import { Redirect } from 'react-router'
import { SectionResumePreview } from '../components/shiduj/sections/SectionResumePreview';
import { Section } from '../interfaces/section.interface';
import { Images } from '../components/shiduj/images/Images';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import CryptoJS from "crypto-js"
import { User } from "./../interfaces/user.interface";
import { Content } from "./../interfaces/content.interface";
import {GetUser} from "./../helpers/updates";
import { userSection } from '../helpers/section';
import { sectionContent } from '../helpers/content';
import { UserContext } from '../components/auth/UserContext';
import { DateTime } from 'luxon';
import padlock from '../assets/img/PadLock.png';
import paint from '../assets/img/footer-paint.png';
import cloud from '../assets/img/footer-cloud.png';


// import {MdOutlinePalette} from ''


export const ProfileView: React.FC<{history: History,userLocal:User,sections?:Section[] }> = ({history,userLocal,sections}) => {

    const { user, setUser, uiState, setUiState } = useContext(UserContext);
    const backgroundColor = 'blue-light';
    const [fecha, setFecha] = useState<string>('')

    useEffect(()=>{
        const fecha = DateTime.fromISO(user?.Cumpleanos).toFormat('LL/dd/yyyy');   
        setFecha(fecha);  
    },[])

    return (
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
                    <div className='save'>
                        <div className='save__basic-details'>
                            <div className='save__basic-details--top'>
                                <p className='title'>{ user?.Nombre }</p>
                                <p className='content'>{ user?.Pais }</p>
                            </div>

                            <hr />

                            <div className='save__basic-details--bottom'>
                                {Number(user?.Altura) > 0 &&
                                <div>
                                    <p className='title-2'>Height</p>
                                    <span>{user?.Altura}</span>
                                </div>
                                }
                                <div className={(user!== undefined && Number(user?.Altura)>0)? "right":"left"}>
                                    {
                                        user?.EdadoFecha === 1 
                                            ?
                                                <>
                                                <p className='title-2'>DOB</p>
                                                <span className='content-description'>{fecha}</span>
                                                </>
                                            :
                                                <>
                                                <p className='title-2'>AGE</p>
                                                <span className='content-description'>{user?.Edad}</span>
                                                </>
                                    }
                                </div>
                            </div>
                            {(user?.ZipCode!== undefined && user?.ZipCode>0) &&
                            //Muestro el zipcode si es mas de 0
                            <div >
                                <p className='title-3 right'>ZipCode</p>
                                <span className='content-description right'>{user?.ZipCode}</span>
                            </div> 
                            }

                            {/* Para mostrar todas las secciones creadas hasta el momento */}
                            <div className='save__resume'>
                                {
                                    sections?.map((section:any) => {
                                        return <SectionResumePreview section={section} key={section.ID}/>
                                    })
                                }
                            </div>

                        </div>
                    </div>

                    <Images />
                    
                    <div style={{marginTop:"10%",width:"100%"}} className={`${backgroundColor} navbar`}>
                        <div style={{'padding': '15px'}}>
                            <div className="navbar__top">
                                <b><p className="navbar__top--title">Private Shidduch Resumes</p></b>
                            </div>
                            <div style={{marginTop:'5%'}}>
                                <div style={{justifyContent:'center',marginLeft:'-40px'}} className='navbar__top'>
                                    <img src={padlock} alt="" className="section__title--icon" style={{marginLeft:"-15%"}}/>
                                        <p className="navbar__top--title">Privacy Controls</p>
                                </div>
                                <div style={{justifyContent:'center',marginLeft:'-47px'}} className='navbar__top'>
                                    <img src={cloud} alt="" className="" style={{marginLeft:"-10%"}}/>    
                                        <p className="navbar__top--title">Stays up to date</p>
                                </div>
                                <div style={{justifyContent:'center',marginLeft:'-15px'}} className='navbar__top'>    
                                    <img src={paint} alt="" className="" style={{marginLeft:"10%"}}/>
                                        <p className="navbar__top--title">Choose from beautiful templates</p>
                                </div>
                            </div>
                            <div>
                                <Link to='/login'>
                                    <button 
                                    className="btn__blue" 
                                    style={{marginLeft:'50px', marginTop:'5%',width:"270px"}}
                                    onClick={() => setUser(userLocal)}>
                                        Create Your Own Today
                                    </button>
                                </Link>
                            </div>
                        </div>
                            
                        </div> 
                    </div>
    )
}
