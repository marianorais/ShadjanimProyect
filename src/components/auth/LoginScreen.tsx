/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { getUserLocalStorage } from '../../helpers/login';
import { User } from '../../interfaces/user.interface';
import { LoginBox } from "./LoginBox";
import { ResumeBox } from "./ResumeBox";
import { SuccessfullBox } from './SuccessfullBox';


//TODO: borrar estilos y borrar login box
export const LoginScreen = ({history}: any) => {
    const [ box, setBox ] = useState('');
    const [ accessMethod, setAccessMethod ] = useState('');
    const [ gender, setGender ] = useState<string>('');
    const [ userCreated, setUserCreated ] = useState<boolean>(false);
    
    const userLocal: User | undefined  = getUserLocalStorage();

    if (userLocal){
        history.push('/shiduj');
    }
    
    const handleSignUp = (gender: string) => {
        setBox('login');
        setAccessMethod('signUp');
        setGender(gender);
    }

    const redirectToHomePage = () => { 
        history.push('/shiduj');
    }

    const redirectToSignIn = () => {
        history.push('/signin')
    }

    const redirectToSignUp = () => {
        history.push('/signup')
    }

    return (
        <div className="login-screen">
            {
               /*  userCreated &&
                    <SuccessfullBox 
                        onPressOk={setBox}
                        oncUserCreation={setUserCreated}
                    /> */
            }
            {
                /* box === 'login' && !userCreated
                    ? <LoginBox 
                        onSuccess={redirectToHomePage} 
                        onCancel={setBox} 
                        accessMethod={accessMethod} 
                        setAccessMethod={setAccessMethod}
                        gender={gender}
                        oncUserCreation={setUserCreated}
                    />
                    : box === 'resume' && !userCreated && 
                        <ResumeBox 
                            genderSelect={handleSignUp} 
                        /> */
            }

            {/* <div className="login-screen__header">
                <div className="login-screen__header--title">MyShidduchResumé.com</div>
            </div>

            <div className="login-screen__image">
                <div className="login-screen__text">
                    <h3 className="login-screen__text--title">Create an</h3>
                    <h3 className="login-screen__text--title">Elegant & Easy</h3>
                    <h3 className="login-screen__text--title">Shidduch Resume</h3>
                    <span className="login-screen__text--subtitle">Change a reference, no problem.</span>
                    <Link to="/learn" className="login-screen__text--link">
                        <p>Learn More</p><MdKeyboardArrowRight style={{fontSize: '30px'}}/>
                    </Link>
                </div>
            </div>

            <div className="login-screen__buttons">
                <button 
                    onClick={()=>setBox('resume')} 
                    style={{fontSize: '.9rem', height: '2.3rem'}}
                    className="btn btn__black"
                >Create Resume
                </button>

                <button 
                    onClick={()=>setBox('login')} 
                    style={{fontSize: '.9rem', height: '2.2rem'}}
                    className="btn btn__gray"
                >Already Have One
                </button>
            </div> */}

            <div className="login-screen__text">
                <h3 className="login-screen__text--title">Create an</h3>
                <h3 className="login-screen__text--title">Elegant</h3>
                <h3 className="login-screen__text--title">& Easy</h3>
                <h3 className="login-screen__text--title">Shidduch</h3>
                <h3 className="login-screen__text--title">Resume</h3>
                <h4 className="login-screen__text--subtitle">Never have an old resume</h4>
                <Link to="/learn" className="login-screen__text--link" style={{'zIndex':49900}}>
                    <p>Learn More</p><MdKeyboardArrowRight style={{fontSize: '30px'}}/>
                </Link>
            </div>

            <div className="login-screen__buttons">
                <button 
                    onClick={redirectToSignUp} 
                    style={{fontSize: '20px'}}
                    className="btn btn__blue"
                >Create Resume
                </button>

                <button 
                    onClick={redirectToSignIn} 
                    style={{fontSize: '20px'}}
                    className="btn btn__gray"
                >Sign in
                </button>
            </div>

            <div className='curva'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="40 0 540 310">
                  <path fill="#E9E9E9" fillOpacity="1" d="M 0 500 Q 0 400 0 250 Q 450 200 800 0 C 800 250 800 150 800 500 "></path>
                </svg>

            </div>
            <div className='caja'>
            </div>

        </div>
    )
}