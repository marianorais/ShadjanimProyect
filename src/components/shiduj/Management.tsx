import React, {useState, useContext, useEffect} from 'react'
import { BsToggleOn, BsToggleOff } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { User } from '../../interfaces/user.interface';
import { UserContext } from '../auth/UserContext';
import axios from "axios"
import { UpdateUser } from '../../helpers/updates';
import { saveUserLocalStorage } from '../../helpers/login';


export const Management = ({history}: any) => {
    const [toggle, setToggle] = useState(false)
    const { user, setUser, setSection , setSectionDelete,setContentDelete, setUiState} = useContext(UserContext)

    useEffect(()=>{
        if(Object.keys(user).length>0){//Me aseguro que el usuario no este vacio
            setToggle(user.IsResumeBlock)
        }
    },[]) 
    const handleSignOut = () => {
        setUser({} as User);
        setSection([]);
        setSectionDelete([]);
        setContentDelete([]);

        localStorage.removeItem('user');
        localStorage.removeItem('section');

        setUiState({isLogged: false, isLoading: false, error: false, message: ""});
    
        history.push('/login');
    }
    const LockResume = async () => {
        user.IsResumeBlock = !toggle
        // await axios.post('https://shadjanim.jojma.com.ar/Api/User/Update',
        // {
        //         userId: user.idResume,
        //         name: user.Nombre,
        //         //lastName: "Rais",
        //         age: user.Edad,
        //         birthday: user.Cumpleanos,//"1982-06-11"
        //         height: user.Altura,
        //         country:user.Pais,
        //         gender: user.Sexo,
        //         isResumeBlock: true
        // }).then((response)=> {
        //     console.log(response)
        //     console.log(user)
        //     setToggle(!toggle)
        // })  
        await UpdateUser(user)
        setToggle(!toggle)
        setUser(user)
        saveUserLocalStorage(user)
    }
    return (
        <div className="management">
            <hr />


            <div className="management__lock">
                <div style={{'display': 'flex', 'flexFlow': 'row', 'justifyContent': 'space-between', 'width': '90%', 'alignItems': 'center'}}>
                    <p className="management__lock--title">Lock the resume link</p>
                    <p>
                        {
                            !toggle 
                                ? <BsToggleOff className="management__lock--icon" onClick={() => LockResume()}/>
                                : <BsToggleOn  className="management__lock--icon" onClick={() => LockResume()}/>

                        }
                    </p>
                </div>

                <div>
                    <span className="management__lock--subtitle">No one besides you can view the resume.</span>
                </div>

            </div>

            <div className="management__access">
                {/* <div>
                    <p className="management__access--title">Link Access</p>
                    <span className="management__access--subtitle2">Locked specific pieces</span>
                </div> */}

            </div>

            {
                history.location.pathname !== '/options' 
                    ? <span className="management__signOut" style={{'cursor': 'pointer'}} onClick={handleSignOut}>Sign Out</span>
                    : <button className="management__signOutButton btn__blue" style={{'cursor': 'pointer'}} onClick={handleSignOut}>Sign Out</button>
            }



        </div>
    )
}