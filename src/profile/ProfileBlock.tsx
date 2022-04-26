import React, {useContext, useEffect} from 'react'
import { UserContext } from '../components/auth/UserContext';
import { History } from 'history';
import {GiPadlock} from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { MdDragHandle } from 'react-icons/md';


export const ProfileBlock = () => {
    const { user, section, setSection } = useContext(UserContext);
    const backgroundColor = 'blue-light';



    return (   
      <div>
        <div className={`${backgroundColor} navbar`}> {/* esta es la cabecera, siempre igual. Solo cambia el color de fondo */}
          <div style={{'padding': '15px'}}>
              <div className="navbar__top">                
                  <p className="navbar__top--title">MyShidduchResume.com</p> 
                  <Link to="/login">
                      <MdDragHandle className="navbar__top--icon"/>
                  </Link>
              </div>
          </div>
        </div>   
        <div className="blockPage">        
          <div className="container">
            <h3 className='title'>
              Resume Blocked
            </h3>
            <div className='padlock'>
              <GiPadlock className="navbar__top--icon" color='red'/>
            </div>
          </div>
        </div>
      </div>
    )
}
