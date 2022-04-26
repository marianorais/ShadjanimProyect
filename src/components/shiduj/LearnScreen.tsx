import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { getUserLocalStorage } from '../../helpers/login';
import { User } from '../../interfaces/user.interface';

export const LearnScreen = ({history}: any) => {
    const userLocal: User | undefined  = getUserLocalStorage();
    
    if (userLocal){
        history.push('/shiduj');
    }

    const redirectToSignIn = () => {
        history.push('/signin')
    }

    const redirectToSignUp = () => {
        history.push('/signup')
    }


    return (
        <>
            <div className="learn-screen">
                {/* <div className="learn-screen__header">
                    <Link to="/login">
                        <div className="close">
                            <AiOutlineClose />
                        </div>
                    </Link>
                </div>            
                <div className="learn-screen__first">
                    <div className="learn-screen__content">
                        <p className="learn-screen__content--number">1.</p>
                        <p className="learn-screen__content--text">
                            By sharing a link instead of a PDF.
                            You can lock or unlock it, and control who see's it.                        
                        </p>
                    </div>
                    <div className="learn-screen__content--img-lock"></div>
                </div>

                <div className="learn-screen__second">
                    <div className="learn-screen__content">
                        <p className="learn-screen__content--number">2.</p>
                        <p className="learn-screen__content--text">
                            Update info & images, long after its out there.
                        </p>
                    </div>
                    <div className="learn-screen__content--img-photo"></div>
                </div>

                <div className="learn-screen__third">
                    <div className="learn-screen__content">
                        <p className="learn-screen__content--number">3.</p>
                        <p className="learn-screen__content--text">
                            Free.
                        </p>
                        <p className="learn-screen__content--text">
                            This product is free to use.
                        </p>
                    </div>

                    <div  
                        style={{                    
                            clipPath: 'polygon(73% 0, 100% 45%, 100% 100%, 21% 100%)',
                            height: '250px',
                            width: '250px',
                            backgroundColor: '#E0FEC4',
                            overflow: 'hidden',
                            marginLeft: '85px',
                    }}></div>
                </div>

                <div className="learn-screen__fourth">
                    <div className="learn-screen__content">
                        <p className="learn-screen__content--number">4.</p>
                        <p className="learn-screen__content--text">
                            Commonly asked questions.
                        </p>
                        <div className="learn-screen__content--questions">
                            <hr />

                            <p className="q">Can someone lookup my resume?</p>

                            <span className="a">
                                - "No. There's no way for them to even know y have one. 
                                You need to send them your link directly."
                            </span>

                            <p className="q">
                                If i delete my resume is there any sort of record of it?
                            </p>

                            <span className="a">
                                - "No."
                            </span>

                            <p className="q">
                                If I update or picture. Does it update for everyone that 
                                i already sent my link too?
                            </p>

                            <span className="a">
                                - "Yes. You don't have to send anyone a new link. 
                                You can share the same link."
                            </span>
                        </div>
                    </div>
                    
                </div> */}

                <div className='learn-screen__why'>Why Make A Resume With Us?</div>
                <div className='learn-screen__box'>
                    <div className='learn-screen__circle learn-screen__circle--lock'>
                        <span className='learn-screen__circle--badge'>1</span>
                    </div>
                    <p className='learn-screen__title'>Secure</p>
                    <p className='learn-screen__detail'>
                        By sharing a link instead of a PDF, you can lock or unlock it, and control who sees it.
                    </p>
                </div>

                <div className='learn-screen__box'>
                    <div className='learn-screen__circle learn-screen__circle--info'>
                    <span className='learn-screen__circle--badge'>2</span>
                    </div>
                    <p className='learn-screen__title'>Info</p>
                    <p className='learn-screen__detail'>
                        Update info and images, long after it's out there. 
                        You no longer have to have multiple versions of your resume floating around.
                    </p>
                </div>

                <div className='learn-screen__box'>
                    <div className='learn-screen__circle learn-screen__circle--money'>
                        <span className='learn-screen__circle--badge'>3</span>
                    </div>
                    <p className='learn-screen__title'>Free</p>
                    <p className='learn-screen__detail'>
                        The product is free to use!
                    </p>
                </div>

                <div className='learn-screen__faq'>
                    <div className='learn-screen__faq-img'></div>
                    
                    <div className='learn-screen__faq-title'>Commonly Asked Questions</div>

                </div>

                <div className='learn-screen__question'>
                    <p className='learn-screen__question--title'>
                        Can someone look up my resume?
                    </p>
                    <p className='learn-screen__question--answer'>
                        "No. There's no way for them to even know you have one. You need to send them your link directly."
                    </p>
                </div>

                <div className='learn-screen__question'>
                    <p className='learn-screen__question--title'>
                        If i delete my resume is there any sort of record of it?
                    </p>
                    <p className='learn-screen__question--answer'>
                        "No."
                    </p>
                </div>

                <div className='learn-screen__question'>
                    <p className='learn-screen__question--title'>
                        If I update a reference or picture, does it update for everyone that i already sent my link to?
                    </p>
                    <p className='learn-screen__question--answer'>
                        "Yes. You don't have to send anyone a new link. You can share the same link."    
                    </p>
                </div>
            </div>
            <div className="login-screen__buttons learn-screen__buttons-position">
                <button 
                    onClick={redirectToSignUp} 
                    style={{fontSize: '20px'}}
                    className="btn btn__blue"
                >Create Resume
                </button>

                <button 
                    onClick={redirectToSignIn} 
                    style={{fontSize: '20px'}}
                    className="btn btn__gray"
                >Sign in
                </button>
            </div>
        </>

    )
}
