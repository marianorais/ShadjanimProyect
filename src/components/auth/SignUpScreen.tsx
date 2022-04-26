import React, {useContext} from 'react'
import { saveUserLocalStorage } from '../../helpers/login';
import { UserContext } from './UserContext';

export const SignUpScreen = ({history}: any) => {
    const {user, setUser} = useContext(UserContext);

    const handleSetGender = (gender: string) => {
        user.EdadoFecha = 0;//Inicializo valor EdadoFecha
        setUser({
            ...user,
            Sexo: gender,
        })
        saveUserLocalStorage(user)

        history.push('/shiduj');
    }



  return (
    <div className='signup-screen'>
        <div className='signup-screen__title'>
            Choose Resume Type
        </div>

        <div className='signup-screen__box-container'>
            <div className='signup-screen__box signup-screen__box--male' onClick={()=>handleSetGender('M')}>
                <span>Male Resume</span>
            </div>

            <div className='signup-screen__box signup-screen__box--female' onClick={()=>handleSetGender('F')}>
                <span>Female Resume</span>
            </div>
        </div>


        
    </div>
  )
}
