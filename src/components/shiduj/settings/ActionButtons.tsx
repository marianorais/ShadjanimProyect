import React, {useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import "../../../styles/components/_accord.scss"
import {AiOutlineArrowDown,AiOutlineArrowUp} from 'react-icons/ai'
import {BsCircle} from 'react-icons/bs'
import {AiOutlineCheckCircle} from 'react-icons/ai'

interface AccordionProps {
    page: string;   
}

export const ActionButtons: React.FC<AccordionProps> = ({page}) => {

    const [dropDown, setsetDropDown] = useState(false)
    const [modal, setModal] = useState(false);
    const [option1,setOption1] = useState(true);
    const [option2,setOption2] = useState(false);
    const [option3,setOption3] = useState(false);

    const refHeight = useRef<HTMLDivElement>(null);
      
      const closeModal = () => {
        setModal(false);
        //showCroppedImage({ id: selectedImageId });
      };
    
    const toggleState = () => {
        setsetDropDown(!dropDown)
    }
    const markOption = () => {
        setOption1(true);
        setOption2(false);
        setOption3(false);
    }
    const markOption2 = () => {
        setOption1(false);
        setOption2(true);
        setOption3(false);
    }
    const markOption3 = () => {
        setOption1(false);
        setOption2(false);
        setOption3(true);
        setModal(true);
    }
 
    return (
        <>
        <div className="accordion">
        {
            modal && 
                <div className="image-modal">
                    <div className="image-add-box">
                        <div>
                            <div>
                                Changes to your link settings. Will apply to anyone who has your link.
                            </div>
                        </div>
                    </div>
                    <div className="button-area">
                        <button onClick={closeModal}>Cancel</button>
                        <Link to="/selectSections">
                            <button className="btn btn__black">Lock Specific Pieces</button>
                        </Link>
                    </div>
                </div>
        }
        {page === 'lockSetting' ? (setOption3(true)):null}
            <div 
            onClick={toggleState}
            className="accordion-visible">
                <span>Lock Settings</span>
                {dropDown ? (<AiOutlineArrowUp/>):<AiOutlineArrowDown/> }
            </div>
            
            <div 
            className={dropDown ? "accordion-toggle animated" : "accordion-toggle"}
            ref={refHeight}
            >
                <div>
                    <label onClick={markOption}>
                        {option1 ? 
                        (<AiOutlineCheckCircle/>)
                        :<BsCircle/>}
                        {" "}
                        By request only
                    </label>
                    <br/>
                    <label onClick={markOption2}>
                        {option2 ? 
                        (<AiOutlineCheckCircle />)
                        :<BsCircle/>}{" "}
                        Share link only (recommended)
                    </label>
                    <br/>
                    <label onClick={markOption3}>
                    {option3 ? 
                        (<AiOutlineCheckCircle/>)
                        :<BsCircle/>}{" "}
                            Lock specific pieces
                    </label>
                </div>
            </div>
        </div>
        </>
    )
}