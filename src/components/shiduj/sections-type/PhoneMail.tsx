import React, {useContext, useEffect, useState} from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { HiPencil } from 'react-icons/hi';
import validator from 'validator';
import { addContent, deleteContent } from '../../../helpers/content'
import { saveSectionLocalStorage } from '../../../helpers/section'
import { Content } from '../../../interfaces/content.interface'
import { UserContext } from '../../auth/UserContext'

interface PhoneMailProps {
    content: Content | undefined
}

export const PhoneMail: React.FC<PhoneMailProps> = ({content}) => {
    const { section, setSection } = useContext(UserContext);
    const { contentDelete, setContentDelete } = useContext(UserContext);
    const [ tipoDeColor,setTipoDeColor ] = useState('colorSection');
    const [ editContent, setEditContent ] = useState<boolean>(content?.ID! < 1 && content?.Contactos === '' && content?.Texto === '');


    const handleDelete = (idSection: number, contentId: number) => {
        console.log('IdPhone: ', contentId);
        contentDelete.push(contentId);

        const sectionAux = deleteContent(section, idSection, contentId);
        setSection(sectionAux);
        saveSectionLocalStorage(sectionAux);
    }

    const handleAddContent = (e: any, idContent: number,type:String) => {
        const { value, name } = e.target;
        let sectionAux = section;

        if(e.target.value.length>0){
            //Verifico si la seccion del contenido es Default ya que fue editada

            section.map(seccion=>{
                if(seccion.ID === content?.SectionID){
                    seccion.editDefault=true
                }
            }) 
            if(content?.IsDefault){
                content.WasEditedDefault = true;
            }

            sectionAux = addContent(section, content!, value, idContent, name);
        }
        else{
            //No modifico el texto default
            if(content?.Texto !==undefined){
                if(type==="Texto"){
                    sectionAux = addContent(section, content!, content?.Texto, idContent, name);
                }
                else{
                    sectionAux = addContent(section, content!, content?.Contactos, idContent, name);
                }
            }
        }

        
        setSection(sectionAux);
        saveSectionLocalStorage(sectionAux);  
        setEditContent(false);      
    }


    const handleEditContent = (e:any) => {

        if (editContent === false) { 
            setEditContent(true);
        }
    }

    return (
        <>
        <div className={content?.IsDefault && !content.WasEditedDefault ? "colorDefault content-container" : "colorSection content-container"}>
        
            {
                        (content?.ID! < 1 && content?.Contactos === '') || editContent
                        ?   

                        <>   
                            <span className='text' onClick={handleEditContent}>
                            <input 
                                className='basic-details__input--input' 
                                placeholder={content?.Texto === '' ? 'Name' :content?.Texto}
                                name='name'
                                // value={ content?.Texto }
                                onBlur={(e)=>handleAddContent(e, content?.ID!,"Texto")}>                                
                            </input>
                            <input 
                                className='basic-details__input--input' 
                                placeholder={content?.Contactos === '' ? 'Number or email' :content?.Contactos}
                                name='number'
                                // value={content?.Contactos}
                                onBlur={(e)=>handleAddContent(e, content?.ID!,"Contacto")}
                                >                                
                            </input>
                            </span>
                            <AiOutlineClose 
                                className='delete-button' 
                                onClick={()=>handleDelete(content?.SectionID!, content?.ID!)}
                            />
                        </>
                        :

                        <>
                            <span className='text ' 
                            onClick={()=> !editContent ? setEditContent(true) : null}>
                                <div> { content?.Texto } </div>
                                <div> {content?.Contactos } </div>
                            </span>
                            
                            <AiOutlineClose
                                className='delete-button' 
                                onClick={()=>handleDelete(content?.SectionID!, content?.ID!)}
                            />
                        </> 
            }
        </div>
        </>
    )
}