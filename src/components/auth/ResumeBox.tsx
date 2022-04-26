import React from 'react'
import { BsFillCheckCircleFill } from "react-icons/bs";

interface ResumeBoxProps {
    genderSelect: (gender: string) => void;
}

export const ResumeBox: React.FC<ResumeBoxProps> = (props) => {
    return (
        <div className="resume">
            <div className="resume-box">
                <div className="resume-box__icon">
                    <BsFillCheckCircleFill className="resume-box__icon--success" /> 
                </div>
                <div className="resume-box__details">
                    <button className="btn btn__boy"  onClick={()=>props.genderSelect('masculino')}>Create Boy Resume</button>
                    <button className="btn btn__girl" onClick={()=>props.genderSelect('femenino')}>Create Girl Resume</button>
                </div>
            </div>
        </div>
    )
}
