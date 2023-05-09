import React from 'react';
import { Link } from 'react-router-dom';

const FormDeleteAccount = () => {
    return (
        <div className='loginFormContainer'>
            <h1 className='loginFormContainer_mainTitleForm'> Supprimer le compte ? </h1>
            <form className='loginFormContainer_loginForm'>
                <label htmlFor='email' className='loginFormContainer_loginForm_label'> Email </label>
                <input type="text" id='email' className='loginFormContainer_loginForm_inputText' />
                <label htmlFor='password' className='loginFormContainer_loginForm_label'> Mot de passe </label>
                <input type="password" id='password' className='loginFormContainer_loginForm_inputPassword' />
                <input type="submit" value="Supprimer" className='loginFormContainer_loginForm_submitButton' />
            </form>
        </div>
    );
};

export default FormDeleteAccount;