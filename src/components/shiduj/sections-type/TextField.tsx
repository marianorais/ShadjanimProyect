import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { HiPencil } from 'react-icons/hi';
import { addContent, deleteContent } from '../../../helpers/content';
import { saveSectionLocalStorage } from '../../../helpers/section';
import { Content } from '../../../interfaces/content.interface'
import { UserContext } from '../../auth/UserContext';

interface TextFieldProps {
    content: Content | undefined
}

export const TextField: React.FC<TextFieldProps> = ({content}) => {

    const { section, setSection } = useContext(UserContext);
    const { contentDelete, setContentDelete } = useContext(UserContext);
    const [tipoDeColor,setTipoDeColor] = useState('colorSection');
    const [ editContent, setEditContent ]             = useState<boolean>(content?.ID! < 1 && content?.Texto === '');
    const [colorDefault,setColorDefaultZipCode] = useState(1)

    const handleChange = (e:any, idContent: number) => {
        const { value } = e.target;
        
        let sectionAux = section;

        if (e.target.value.length === 0 ) {
            if(content?.Texto!== undefined){  

                sectionAux = addContent(section, content!, content?.Texto, idContent);      
            }
        }
        else{
            //Verifico si la seccion del contenido es Default ya que fue editada
            section.map((seccion)=>{
                if(seccion.IsDefault && seccion.ID === content?.SectionID){

                    seccion.editDefault=true
                }
            }) 
            if(content?.IsDefault){
                content.WasEditedDefault = true;
            }
            sectionAux = addContent(section, content!, value, idContent);

        }        
        setSection(sectionAux);
        saveSectionLocalStorage(sectionAux);
        setEditContent(false);
    }

    const handleDelete = (idSeccion: number, idContent: number) => {     

        contentDelete.push(idContent);

        const sectionAux = deleteContent(section, idSeccion, idContent);

        setSection(sectionAux);
        saveSectionLocalStorage(sectionAux);
    }

    const handleEditContent = (e:any) => {
        if (editContent === false) { // si no se esta actualizando ningun titulo
           setEditContent(true);
        }
}

    return (
        <div className={content?.IsDefault && !content.WasEditedDefault ? "colorDefault content-container" : "colorSection content-container"}>

             {
                        (content?.ID! < 1 && content?.Texto === '') || editContent
                        ?  
                        <>  
                                        
                            <span onClick={handleEditContent}>
                                <input 
                                    className='basic-details__input--input' 
                                    autoFocus={true} 
                                    onBlur={(e)=>handleChange(e, content?.ID!)}
                                    placeholder={content?.Texto === '' ? '' :content?.Texto}
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
                            <span className='text ' onClick={handleEditContent}>{content?.Texto}</span>
                            
                            <AiOutlineClose 
                                className='delete-button' 
                                onClick={()=>handleDelete(content?.SectionID!, content?.ID!)}
                            />
                        </> 
                    }
        </div>
    )
}
