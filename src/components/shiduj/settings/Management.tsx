import React, {useState} from 'react'
import { BsSearch } from 'react-icons/bs'
import { FaGreaterThan } from 'react-icons/fa'
import  {ActionButtons}  from './ActionButtons';
import {AiOutlineArrowDown} from 'react-icons/ai'
import { Link } from 'react-router-dom';

const sections = [
    {
       "id":"1",
       "titulo": "titulo 1"
    },
    {
       "id":"2",
       "titulo": "titulo 2"
    }
  ]

export const Management = () => {
    const [lista,updateLista] = useState(sections)
    const [modal, setModal] = useState(false);

    const showModal = () => {
        setModal(true);
    }
    const closeModal = () => {
        setModal(false)
    }
    return (
        <div className="management">
            {
                modal && 
                <div className="image-modal">
                    <div className="image-add-box">
                        <label>
                            Name 
                            <input type="text"/>
                        </label>
                        <label>
                            Email
                            <input type="text"/>
                        </label>
                    </div>
                    <div className="button-area">
                        <button className="btn btn__white" onClick={closeModal}>Cancel</button>
                        <Link  to="/selectSections/user">
                            <button className="btn btn__black" onClick={closeModal}>Select Permissions</button>
                        </Link>
                    </div>
                </div>
            }
            <div>
                <Link to="/settings" className="accordion-visible">
                    <div className="accordion-visible">
                        <span>Lock Settings</span><AiOutlineArrowDown/>
                    </div>
                </Link>
                <span>Lock specific pieces</span><br/>
                <span>The locked elements require a user to request access in order to view.</span> 
            </div>



            <hr />

            <div className="management__lock">
                <div>
                    Locked Elements
                </div>
            </div>

            <div className="management__access">
                <div>
                    <Link  to="/selectSections">
                        <p className="management__access--title">Configure <FaGreaterThan/></p>
                    </Link>
                    <br/>
                    {lista.map(function(d){
                        return (<p key={d.id}>{d.titulo}</p>)
                    })}
                </div>

                <div>
                    {/* TODO: badge */}
                </div>

            </div>
            

            <hr />
            <div className="management__lock">
                <span className="management__signOut">Request for permission</span>
                <div>
                   <BsSearch className="management__lock--icon" />
                </div>
            </div><br/><br/>

            
            <hr />
            <div className="management__lock">
                <span className="management__signOut" onClick={showModal}>
                    People with permission
                </span>
                <div>
                    <BsSearch className="management__lock--icon" />
                </div>
            </div>
            <div>
                <p className="management__access--title" onClick={showModal}>
                    Add email <FaGreaterThan/>
                </p>
                <br/>
            </div>
            

        </div>
    )
}