import React, {useContext} from 'react'

import { FaPhoneAlt } from "react-icons/fa";
import { MdFormatListBulleted } from "react-icons/md";
import { BsTextLeft } from "react-icons/bs";
import { UserContext } from '../../auth/UserContext';
import { Section } from '../../../interfaces/section.interface';
import { Content } from '../../../interfaces/content.interface';

interface SectionTypeProps {
    onCancel: (show: boolean) => void;
    section: Section;
}

export const SectionType: React.FC<SectionTypeProps> = (props) => {
    const { user, section } = useContext(UserContext);

    const handleCancel = () => {
        props.onCancel(false)
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
            SectionID: props.section?.ID,
            Section_Users_idResume: user.idResume
        };
        props.section.ContList.push(newContent);
        props.onCancel(false);
    }

    return (

        <div className="section-options" style={{ height: `${section.length*635}px` }}>
            <div className="section-options__box">
                <div className="section-options__box--btn">
                    <button 
                        className="section-options__btn" 
                        onClick={()=>handleAddContent('TEXTO')}
                    >
                            <BsTextLeft className="section-options__btn--icon" />Text Field
                    </button>
                    <button 
                        className="section-options__btn" 
                        onClick={()=>handleAddContent('BULLET')}
                    >
                            <MdFormatListBulleted className="section-options__btn--icon" /> Bullet Points
                    </button>
                    <button 
                        className="section-options__btn" 
                        onClick={()=>handleAddContent('CONTACT')}
                    >
                            <FaPhoneAlt className="section-options__btn--icon" />Phone or Email
                    </button>
                </div>
                
                <div className="section-options__box--cancel" onClick={handleCancel}>
                    <p className="section-options__cancel">Cancel</p>
                </div>
            </div>
        </div>
    )
}
