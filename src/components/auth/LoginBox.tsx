import React, { useContext, useRef, useState } from 'react';
import validator from 'validator';
import axios from 'axios';
import { login } from '../../helpers/login';
import { saveUserLocalStorage } from '../../helpers/login';
import { saveSectionLocalStorage, userSection } from '../../helpers/section';
import { signUp } from "../../helpers/signUp";
import { User } from '../../interfaces/user.interface';
import { UserContext } from './UserContext';
import { sectionContent } from '../../helpers/content';
import { Section } from '../../interfaces/section.interface';
import { Content } from '../../interfaces/content.interface';

interface LoginBoxProps {
    onCancel: (screen: string) => void;
    onSuccess: () => void;
    accessMethod: string;
    setAccessMethod: (method: string) => void;
    gender: string;
    oncUserCreation: (userCreated: boolean) => void;
}

export const LoginBox: React.FC<LoginBoxProps> = (props) => {
    const { setUser, setSection, uiState, setUiState } = useContext(UserContext);
    const [ userCreated, setUserCreated ] = useState<boolean>(false)
    const [ errorMessage, setErrorMessage ] = useState('');

    const { isLoading } = uiState;

    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const handleCancel = () => {
        props.onCancel('');
        props.setAccessMethod('');
    }

    const getContent = async (section: Section): Promise<Content[]> => {        
        let {error: resultContent, data} = await sectionContent(section.ID);
        return data;        
    }
    
    const handleLogin = async (e: any) => {
        e.preventDefault();
        const { value: emailValue } = email.current! || '';
        const { value: passValue }  = password.current! || '';
        if (!validator.isEmail(emailValue)) {
            return;
        }

        if (!passValue.length) {
            return;
        }

        if (props.accessMethod === 'signUp') {
            //New User
            const newUser: User = {} as User;

            newUser.Usuario = emailValue;
            newUser.Email = emailValue;
            newUser.Password = passValue;
            newUser.Sexo = props.gender;

            const {error} = await signUp(newUser);

            if (!error) {
                props.oncUserCreation(true);

            } else {

                setUserCreated(false);
                setUiState({isLogged: false, isLoading: false, message: '', error: false});
            }

        } else {
            //User Login 

            let { ok: loginOk, user } = await login(emailValue, passValue);
            setUiState({isLogged: true, isLoading: true, message: '', error: false});
            console.log("user",loginOk,user[0]);
            if (loginOk) {//Usuario existente
                setUser(user[0]);
                saveUserLocalStorage(user[0]);

                let { error: resultSection, data: sections } = await userSection(user[0].idResume);
                if(!resultSection){//Secciones existentes
                    for (const section of sections) {
                        // trae los contenidos de cada seccion
                        const content = await getContent(section);
                        section.ContList = content;
                    }
                    for(var i=0;i<sections.length;i++){
                        //Ordeno Lista por Posicion
                        sections[i].Posicion = i
                    }
                    console.log("sections: ",sections)
                    setSection(sections);
                    saveSectionLocalStorage(sections);                    
                    
                    props.onSuccess();
                }
            } else {
                setErrorMessage('Error');
                setUiState({isLogged: false, isLoading: false, message: '', error: false});
            }
        }
    }

    return (
        <div className="login">
            <div className="login-box">
                {
                    isLoading &&
                        <div className='blink_me'>Loading...</div>
                }

                <form onSubmit={handleLogin} noValidate autoComplete="off">
                    {
                        !userCreated &&
                        <div className="login-box__details">
                            <input
                                className="input" 
                                type="email" 
                                ref={email}
                                placeholder="Email"
                                name="email" 
                            />

                            <input
                                className="input" 
                                type="password" 
                                ref={password}
                                placeholder="Password" 
                                name="password"
                            />
                            {
                                errorMessage && <div className="error-message">{errorMessage}</div>
                            }
                            <button 
                                type="submit"
                                className="btn btn__go"
                            >Go
                            </button>

                            {
                                props.accessMethod !== 'signUp' &&
                                    <p className="forgot">Forgot Password?</p>
                            }
                            
                            <p className="cancel" onClick={handleCancel}>Cancel</p>
                        </div>
                    }
                </form>
            </div>
        </div>        
    )
}