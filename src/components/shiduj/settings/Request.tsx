import React,{useState} from 'react';
import {BsSearch} from 'react-icons/bs'

export const Request = () => {
    
    const [modal, setModal] = useState(false);

    const showModal = () => {
        setModal(true);
      }
      
      const closeModal = () => {
        setModal(false);
      };
    return (
        <>
        <div className="accordion">
        {
            modal && 
                <div className="">
                    <div className="">
                        
                    </div>
                    <div className="button-area">
                        <button >Select Permissions</button>
                        <button onClick={closeModal}>Delete</button>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </div>
        }
            <div>
                <div>
                    <h2>Request for permission</h2><BsSearch/>
                    <p onClick={showModal}>Person permision</p>
                </div>
            </div>
        </div>
        </>
    )
}