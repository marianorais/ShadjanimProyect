import React, {useContext, useRef, useState} from 'react';
import validator from 'validator';
import { Link } from "react-router-dom";
import { sectionContent } from '../../helpers/content';
import { Section } from '../../interfaces/section.interface';
import { UserContext } from './UserContext';
import { login, saveUserLocalStorage } from '../../helpers/login';
import { saveSectionLocalStorage, userSection } from '../../helpers/section';
import { Content } from '../../interfaces/content.interface';

export const SignInScreen = ({history}: any) => {
    const { setUser, setSection, uiState, setUiState } = useContext(UserContext);
    const [ errorMessage, setErrorMessage ] = useState('');

    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const { isLoading } = uiState;
    
    const getContent = async (section: Section): Promise<Content[]> => {        
        let {error: resultContent, data} = await sectionContent(section.ID);
        
        return data; 
    }

    const handleLogin = async(e: any) => {
        e.preventDefault();
        const { value: emailValue } = email.current! || '';
        const { value: passValue }  = password.current! || '';
        
        if (!validator.isEmail(emailValue)) {
            return;
        }

        if (!passValue.length) {
            return;
        }
        setUiState({isLogged: true, isLoading: true, message: '', error: false});
        let { ok: loginOk, user } = await login(emailValue, passValue);

        if (loginOk) {//Usuario existente
            /* user[0].Password = ':-)'; */
            
            setUser(user[0]);
            saveUserLocalStorage(user[0]);
            
            let { error: resultSection, data: sections } = await userSection(user[0].idResume);
            
            if(!resultSection){//Secciones existentes
                for (const section of sections) {
                    // trae los contenidos de cada seccion
                    const content = await getContent(section);
                    section.ContList = content;
                }
                
                setSection(sections);
                saveSectionLocalStorage(sections);                    
                
                // redireccion al save digamos
                history.replace('/save');
            }
        } else {
            setErrorMessage('Error');
            setUiState({isLogged: false, isLoading: false, message: '', error: false});
        }

    }


    return (
        <div className='signIn-screen'>
            <div className='signIn-screen__title'>Login</div>

            <div className='signIn-screen__input-container'>
                <form onSubmit={handleLogin} noValidate autoComplete="off">
                    {
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
                            {   !isLoading 
                                ?
                                    <button 
                                        type="submit"
                                        className="btn btn__blue login-button"
                                    >Login
                                    </button>
                                :
                                //Loading
                                <div className="spinner-container">
                                    <div className="loading-spinner"></div>
                                </div>
                            }
                            
                            <div className='get-started' style={{position:'absolute', top:'600px'}}>
                                <p>Don't have an account?</p>&nbsp;
                                <p style={{'fontWeight': 'bold'}}>
                                    <Link style={{'textDecoration': 'none'}} to="/signup">Get Started</Link>
                                </p>
                            </div>
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}
