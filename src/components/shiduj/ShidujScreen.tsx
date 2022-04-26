import { History } from 'history';
import React, { useRef, useContext } from 'react';
import { UserContext } from '../auth/UserContext';
import { ActionButtons } from './ActionButtons';
import { BasicDetails } from './BasicDetails';
import { Images } from './images/Images';
import { Navbar } from './Navbar';
import { SectionHeader } from './sections/SectionHeader';
import { Sections } from './sections/Sections';
import { ErrorBox } from '../shiduj/ErrorBox';
import { getUserLocalStorage } from '../../helpers/login';
import { User } from '../../interfaces/user.interface';

interface ShidujScreenProps {
    history: History;
}

export const ShidujScreen: React.FC<ShidujScreenProps> = ({ history }) => {
    const actionRef = useRef(null);
    const { user, uiState } = useContext(UserContext)
    const userLocal: User | undefined  = getUserLocalStorage();

    if (!userLocal && Object.keys(user).length === 0) {
        history.push('/login');
    }
    
    return (
        <div className="shiduj-screen">
            {
                uiState.error
                    && <ErrorBox {...uiState} />

            }

            <Navbar 
                page="shiduj"
                history={history}
            />

            <div className="shiduj-screen__body">
                <BasicDetails history={history} />
                
                <SectionHeader />

                <Sections />
            
                <Images />

                <div ref={actionRef}>
                    <ActionButtons 
                        page="shiduj"
                        history={history}
                    />
                </div>
            </div>

        </div>
    )
}
