import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FormLoginWithEmail = () => {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    return (
        <div className='loginFormContainer'>
            <h1 className='loginFormContainer_mainTitleForm'> Je me connecte </h1>
            <form className='loginFormContainer_loginForm'>
                <label htmlFor='email' className='loginFormContainer_loginForm_label'> Email </label>
                <input type="text" id='email' className='loginFormContainer_loginForm_inputText' />
                <label htmlFor='password' className='loginFormContainer_loginForm_label'> Mot de passe </label>
                <input type="password" id='password' className='loginFormContainer_loginForm_inputPassword' />
                <Link to='/MotDePasseOublie' className='loginFormContainer_loginForm_link'> Mot de passe oublié ? </Link>
                <input type="submit" value="Connexion" className='loginFormContainer_loginForm_submitButton' />
            </form>
            <section className='loginFormContainer_noAccountSection'>
                <h3 className='loginFormContainer_noAccountSection_noAccountTitle'> Pas de compte ? </h3>
                <Link to='/Inscription' className='loginFormContainer_noAccountSection_registerLink'> Inscris toi </Link>
            </section>
        </div>
    );
};

export default FormLoginWithEmail;