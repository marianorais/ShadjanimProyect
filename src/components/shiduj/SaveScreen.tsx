import React, {useState, useContext, useEffect} from 'react'
import { Navbar } from './Navbar';
import { ActionButtons } from "./ActionButtons";
import { Management } from './Management';
import { UserContext } from '../auth/UserContext';
import { History } from 'history';
import { SectionResumePreview } from './sections/SectionResumePreview';
import { Section } from '../../interfaces/section.interface';
import { getSectionLocalStorage } from '../../helpers/section';
import { Images } from './images/Images';
import { DateTime } from 'luxon';
import { User } from '../../interfaces/user.interface';
import { getUserLocalStorage } from '../../helpers/login';

export const SaveScreen: React.FC<{history: History}> = ({history}) => {
    window.scrollTo(0, 0);
    
    const { user,setUser, section, setSection } = useContext(UserContext);
    const { Nombre, Edad, Cumpleanos, Altura, Pais, EdadoFecha,ZipCode } = user;
    
    const [fecha, setFecha] = useState<string>('')

    useEffect(() => { //carga info la primera vez      
        const sectionLocal: Section[] | undefined  = getSectionLocalStorage();
        if ( sectionLocal ) {
            
          const sortedList = sectionLocal.sort((a, b) => (a.Posicion > b.Posicion ? 1 : -1 ))
          for(var i=0;i<sortedList.length;i++){
            //Ordeno la lista
            sortedList[i].Posicion = i
          }
          // actualizo el estado con la nueva lista ya ordenada
          setSection(sortedList)
          
        } else {
            history.push('/login');
        }
    }, [setSection])

    
    useEffect(() => { 
        const fecha = DateTime.fromISO(Cumpleanos).toFormat('LL/dd/yyyy');        
        setFecha(fecha);

         if(Object.keys(user).length<1){
             //Si todavia no cargo el usuario utilizo el guardado en la base
             const userLocal: User | undefined  = getUserLocalStorage(); 
             if(userLocal!==undefined){
                 setUser(userLocal)
                 const fecha = DateTime.fromISO(userLocal.Cumpleanos).toFormat('LL/dd/yyyy');        
                 setFecha(fecha);
             }
        }
    }, [])

    return (
        <div className="shiduj-screen">
            <Navbar page="save"/>

            <div className='save'>
                <div className='save__basic-details'>
                    <div className='save__basic-details--top'>
                        <p className='title'>{ Nombre }</p>
                        <p className='content'>{ Pais }</p>
                    </div>

                    <hr />

                    <div className='save__basic-details--bottom'>
                        {Number(user.Altura)>0 &&
                        <div>
                            <p className='title-2'>Height</p>
                            <span className='content-description'>{Altura}</span>
                        </div>
                        }
                        <div className={user.Altura !== undefined && Number(user.Altura) > 0 ? "right" :"left"}>
                            {
                                EdadoFecha === 1 
                                    ?
                                        <>
                                            <p className='title-2'>DOB</p>
                                            <span className='content-description'>{fecha}</span>
                                        </>
                                    :
                                        <>
                                            <p className='title-2'>AGE</p>
                                            <span className='content-description'>{Edad}</span>
                                        </>
                            }
                        </div>
                    </div>

                        {ZipCode>0 &&
                            <div >
                                <p className='title-3'>ZipCode</p>
                                <span className='content-description'>{ZipCode}</span>
                            </div> 
                        }

                    {/* Para mostrar todas las secciones creadas hasta el momento */}
                    <div className='save__resume'>
                        {
                            section.map((section) => {
                                return <SectionResumePreview section={section} key={section.ID}/>
                            })
                        }
                    </div>

                </div>
                

            </div>


            <Images />
            <ActionButtons page="save"/>
            <Management history={history} />
        </div>
    )
}
