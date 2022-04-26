
export const LoginOverview = ({handleLogin = () => {}}) => {
    return (
        <div className="login-screen">
            <div className="login-screen__header">
                <div className="login-screen__title">PrivateShiduchResumé.com</div>
                

            </div>

            <div className="login-screen__text-bold">
                <p>
                    Build a
                </p>
                <p>
                    Shidduch Resume
                </p>
            </div>

            <hr className="line" />

            <div className="login-screen__text">
                <p>By sharing a link instead of a PDF. </p>
                <p>You can update info & images, long</p>
                <p>after its out there.</p>
            </div>
            
            <div className="login-screen__text">
                <p>
                    100% private. Disable the link on and off whenever.
                </p>
            </div>

            <div className="login-screen__text">
                <p>
                    Customize our template or use your own design
                </p>
            </div>

            <div className="login-screen__text">
                <p>
                    Absolutely free
                </p>
            </div>

            <hr className="line" />

            <button onClick={handleLogin} className="login-screen__btn btn__white">Sign Up / Sign In</button>
        </div>
    )
}
