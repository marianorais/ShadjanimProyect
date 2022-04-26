import React, { useContext } from 'react'
import { Ui } from '../../interfaces/ui.interface'
import { MdErrorOutline } from 'react-icons/md';
import { UserContext } from '../auth/UserContext';


export const ErrorBox: React.FC<Ui> = ({error, isLoading, message}) => {
    const {setUiState} = useContext(UserContext);

    const closeModal = () => {
        setUiState({
            error: false,
            isLoading: false,
            message: ''
        })
    }

    return (
        <div className='error-container'>
            <div className='error-box'>                
                <MdErrorOutline className='error-icon' />

                <p className='error-message'>{message}</p>
                
                <button className="btn btn__go" onClick={closeModal}>Ok</button>

            </div>            
        </div>
    )
}
