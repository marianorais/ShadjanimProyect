import React from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'

interface SuccessfullBoxProps {
    onPressOk: (box: string) => void;
    oncUserCreation: (userCreated: boolean) => void;
}

export const SuccessfullBox: React.FC<SuccessfullBoxProps> = ({onPressOk, oncUserCreation}) => {
    const handleLogin = () => {
        oncUserCreation(false);
        onPressOk('login');
    }

    return (
        <div className="login">
            <div className="login-box">
                <div className="login-box__details login-box__succesfull-created">
                    <BsFillCheckCircleFill className="resume-box__icon--success" />
                    <p>User created!</p>
                    <button className='btn btn__go' onClick={handleLogin}>Ok</button>
                </div>
            </div>
        </div>
    )
}
