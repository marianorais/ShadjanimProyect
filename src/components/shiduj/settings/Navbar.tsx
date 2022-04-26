import React from 'react'
import { MdDragHandle } from "react-icons/md";
import { BsFillPencilFill } from "react-icons/bs";
import { GiPadlock } from "react-icons/gi"; 
import { Link } from 'react-router-dom';

interface NavbarProps {
    page: string;   
}

export const Navbar: React.FC<NavbarProps> = ({page}) => {
    const backgroundColor = page === 'settings' ? 'blue-light' : 'grey';

    return (
        
        <div className={`${backgroundColor} navbar`}> {/* esta es la cabecera, siempre igual. Solo cambia el color de fondo */}
            <div className="navbar__top">
             <GiPadlock className="navbar__top--icon"/><span className="navbar__top--title">Settings</span>  
                    {
                        page === 'settings' ?  /* icono que va a la derecha, este es una X, el siguiente es hamburguesa y se muestran segun la opcion que el usuario presiono */
                            <Link to="/shiduj">
                                <button className="navbar__bottom--button">Done</button>
                            </Link>
                        :
                            <Link to="/options">
                                <MdDragHandle className="navbar__top--icon"/>
                            </Link>
                    }
                    {
                        page === 'selectSections' ?  /* icono que va a la derecha, este es una X, el siguiente es hamburguesa y se muestran segun la opcion que el usuario presiono */
                            <Link to="/lockSetting">
                                <button className="navbar__bottom--button">Done</button>
                            </Link>
                        :
                            null
                    }


            </div>
                    
            {
                // aca viene la parte de los botones que van debajo de la cabecera. Si esta en la pagina de edicion (shiduj), el boton es Save & Previe
                // si presiona el boton de Save & Preview, el boton sera send & share
                page !== 'options' &&   
                    <div className="navbar__bottom">
                        {
                            page === 'shiduj' 
                                ? <Link to="/save">
                                    <button className="navbar__bottom--button">Save & Preview</button>
                                </Link>
                                : page === 'save' &&
                                    <div className="navbar__bottom--container">
                                        <Link to="/shiduj">
                                            <button className="navbar__bottom--pen"><BsFillPencilFill /></button>                                        
                                        </Link>
                                        <button className="navbar__bottom--button navbar__bottom--save">Send & Share</button>
                                    </div>
                        }
                    </div>
            }
        </div>

    )
}