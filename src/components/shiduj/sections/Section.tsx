import React, { useContext, useState } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { GiTrashCan } from 'react-icons/gi';
import { HiPencil } from 'react-icons/hi';
import { MdDragHandle } from 'react-icons/md';
import { saveSectionLocalStorage } from '../../../helpers/section';
import { Section } from '../../../interfaces/section.interface';
import { UserContext } from '../../auth/UserContext';
import { BulletPoints } from "../sections-type/BulletPoints";
import { PhoneMail } from "../sections-type/PhoneMail";
import { TextField } from "../sections-type/TextField";
import { SectionType } from "./SectionType";
import { Content } from '../../../interfaces/content.interface';

import { AiOutlineMinusCircle } from 'react-icons/ai';
import { DeleteBox } from '../DeleteBox';

interface SectionProps {
    section: Section;
    provided?: DraggableProvided;
}


export const ShowSection: React.FC<SectionProps> = ({section, provided}) => {

    const { user, section: sectionAux, setSection }     = useContext(UserContext);
    const {sectionDelete, setSectionDelete }            = useContext(UserContext);

    const [ showSectionType, setShowSectionType ] = useState(false);
    const [ modal, setModal ] = useState(false);

    // en el punto en que toca add section, evalua si es una seccion nueva que renderiza este componente o 
    // una seccion existente que renderiza el componente de la ShowSection
    const [ editTitle, setEditTitle ]             = useState<boolean>(section?.ID! < 1 && section.Titulo === '');
    
    const showSectionOptions = () => {
        setShowSectionType(!showSectionType);
    }
    
    const handleDeleteSection = async (sectionId: number) => {
        //borar los content de las secciones
        sectionDelete.push(sectionId)
        const sectionsRamaining = sectionAux.filter(section => section.ID !== sectionId);
        saveSectionLocalStorage(sectionsRamaining);
        setSection(sectionsRamaining);
        setModal(false);
        
    }
    const handleChange = (e:any) => {
        if (e.target.value.length === 0) {
            sectionAux.pop();
        } else {
            sectionAux.map(seccion => {
                 if(seccion.ID === section?.ID){
                     seccion.Titulo = e.target.value;
                     if(seccion.IsDefault){
                         //Si cambio el titulo la seccion fue editada
                        seccion.editDefault=true
                     }
                    }
            })
        }

        setSection(sectionAux);
        saveSectionLocalStorage(sectionAux);
        setEditTitle(false);
    }

    const handleEditTitle = (e:any) => {
        if (editTitle === false) { // si no se esta actualizando ningun titulo
            setEditTitle(true);
        }
    }

    const handleAddContent = (tipo: string) => {
        const newContent: Content = { 
            ID: Math.random(),
            Tipo: tipo,
            Bullet: "",
            Texto: "",
            Contactos: "",
            IsDefault: false,
            WasEditedDefault:false,
            SectionID: section?.ID,
            Section_Users_idResume: user.idResume
        };
        
        section.ContList.push(newContent);
        setSection(sectionAux);
        saveSectionLocalStorage(sectionAux);
        showSectionOptions();
    }

    return (

        <div style={{zIndex: 1000}}>
            <div className="section">
                <div ref={provided?.innerRef} {...provided?.draggableProps}>
                    <span {...provided?.dragHandleProps}>
                        <MdDragHandle className="section__drag"/>
                    </span>
                        
                    {
                        modal &&
                            <DeleteBox
                                title='Delete Section'
                                message='Are you sure you want to delete your Section?'
                                onCancelClicked={() => setModal(false)}
                                onConfirmClicked={() => handleDeleteSection(section?.ID!)}
                            />
                    }

                    <div className="section__title">
                        {
                            (section?.ID! < 1 && section.Titulo === '') || editTitle
                                ?
                                    <>
                                        <input 
                                            className="basic-details__input--input" 
                                            autoFocus={true}
                                            onBlur={(e) => handleChange(e)}
                                            placeholder={section.Titulo === '' ? 'Write the title' : section.Titulo}
                                        >
                                        </input>
                                    </>
                                    
                                :
                                <>
                                    <h3>{ section?.Titulo }</h3>
                                    <HiPencil 
                                        className="section__title--icon" 
                                        onClick={handleEditTitle}
                                        style={{cursor: 'pointer'}}
                                    />
                                </>

                        }
                    </div>
    
                    <hr />

                    {
                        section?.ContList?.map((content, index) => {                            
                            return content.Tipo === "TEXTO"  
                                ? <TextField  
                                    content={content} 
                                    key={content.ID}
                                />
                                : content.Tipo === "BULLET"
                                    ? <BulletPoints 
                                        content={content} 
                                        key={content.ID} 
                                        isLastBullet={index === section.ContList.length - 1}
                                    />
                                    : <PhoneMail 
                                        content={content} 
                                        key={content.ID} 
                                    />
                        })
                    }

                    {
                        !showSectionType ?
                        
                            <div className="section__action">
                                <span 
                                    onClick={showSectionOptions} 
                                    className="section__action--link"
                                >Add text field, bullet point, or contact info
                                </span>
                                <GiTrashCan 
                                    className="section__action--trash" 
                                    // onClick={ ()=>handleDeleteSection(section?.ID!) }
                                    onClick={ ()=>setModal(true) } 
                                />
                            </div>
                            :

                            <div className="section__add">
                                <AiOutlineMinusCircle className='section__action--minus' onClick={showSectionOptions}/>
                                <div className='section__action--type' onClick={()=>handleAddContent('TEXTO')}>Text Field</div>
                                <div className='section__action--type' onClick={()=>handleAddContent('BULLET')}>Bullet Point</div>
                                <div className='section__action--type' onClick={()=>handleAddContent('CONTACT')}>Contact Info</div>
                            </div>
                    }
                    
                </div>                    
            </div>
        </div>
    )
}
