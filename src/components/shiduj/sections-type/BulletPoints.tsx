import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { HiPencil } from 'react-icons/hi';
import { addContent, deleteContent } from '../../../helpers/content';
import { saveSectionLocalStorage } from '../../../helpers/section';
import { Content } from "../../../interfaces/content.interface";
import { UserContext } from '../../auth/UserContext';

interface BulletProps {
    content: Content | undefined;
    isLastBullet: boolean;
}

export const BulletPoints: React.FC<BulletProps>  = ({content, isLastBullet}) => {
    
    const { section, setSection } = useContext(UserContext);
    const { contentDelete, setContentDelete } = useContext(UserContext);
    const [ editContent, setEditContent ]             = useState<boolean>(content?.ID! < 1 && content?.Bullet === '');


    const handleAddBullet = () => {
        const newContent: Content = { 
            ID: Math.random(),
            Tipo: 'BULLET',
            Bullet: "",
            Texto: "",
            Contactos: "",
            IsDefault: false,
            WasEditedDefault:false,
            SectionID: content?.SectionID!,
            Section_Users_idResume: content?.Section_Users_idResume!
        };

        const index = section.findIndex(sec => sec.ID === content?.SectionID)

        section[index].ContList.push(newContent);

        setSection(section);
        saveSectionLocalStorage(section);
    }

    const handleDelete = (idSection: number, contentId: number) => {
        console.log('IdBullet deleted: ', contentId);
        contentDelete.push(contentId);

        const sectionAux = deleteContent(section, idSection, contentId);
        setSection(sectionAux);

        saveSectionLocalStorage(sectionAux);
    }

    const handleAddContent = (e: any, idContent: number) => {

        const { value } = e.target;
        
        let sectionAux = section;
        if (e.target.value.length === 0) {
            //Contenido vacio
            if(content?.Bullet!== undefined){    
                sectionAux = addContent(section, content!, content?.Bullet, idContent);      
            }
        }
        else{
            //Verifico si la seccion del contenido es Default ya que fue editada
            section.map(seccion=>{
                seccion.ContList.map(contenido=>{
                    if(seccion.IsDefault &&  seccion.ID === content?.SectionID){

                        seccion.editDefault=true;
                    }
                })
            })
            if( content?.IsDefault){
                content.WasEditedDefault = true;
            }
            sectionAux = addContent(section, content!, value, idContent);
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
                        (content?.ID! < 1 && content?.Bullet === '') || editContent
                        ?     
                        <>                  
                            <span className='bullet' onClick={handleEditContent}>
                                <input 
                                    className='basic-details__input--input' 
                                    autoFocus={true} 
                                    onBlur={(e)=>handleAddContent(e, content?.ID!)}
                                    placeholder={content?.Bullet === '' ? '' : content?.Bullet}
                                    >                     
                                </input>
                                {/* <input 
                                            className="basic-details__input--input" 
                                            autoFocus={true}
                                            onBlur={(e) => handleChange(e)}
                                            placeholder={section.Titulo === '' ? 'Write the title' : section.Titulo}
                                        >
                                        </input> */}
                            </span>
                            <AiOutlineClose 
                                className='delete-button' 
                                onClick={()=>handleDelete(content?.SectionID!, content?.ID!)}
                            />
                        </>
                        :
                        <>
                            <span className='bullet' onClick={handleEditContent}>{content?.Bullet}</span>
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
