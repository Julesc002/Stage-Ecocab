import React from 'react';
import { Link } from 'react-router-dom';

const FormCreateAccount = () => {
    return (
        <div className='createAccountFormContainer'>
            <h1 className='createAccountFormContainer_mainTitleForm'> Inscription </h1>
            <form className='loginFormContainer_loginForm'>
                <label htmlFor='email' className='createAccountFormContainer_loginForm_label'> Email </label>
                <input type="text" id='email' className='createAccountFormContainer_loginForm_inputText' />

                <label htmlFor='lastName' className='createAccountFormContainer_loginForm_label'> Nom </label>
                <input type="text" id='lastName' className='createAccountFormContainer_loginForm_inputText' />

                <label htmlFor='firstName' className='createAccountFormContainer_loginForm_label'> Prénom </label>
                <input type="text" id='firstName' className='createAccountFormContainer_loginForm_inputText' />

                <label htmlFor='password' className='createAccountFormContainer_loginForm_label'> Mot de passe </label>
                <input type="password" id='password' className='createAccountFormContainer_loginForm_inputPassword' />

                <label htmlFor='confirmPassword' className='createAccountFormContainer_loginForm_label'> Confirmer Mot de passe </label>
                <input type="password" id='confirmPassword' className='createAccountFormContainer_loginForm_inputPassword' />

                <label htmlFor='birthDate' className='createAccountFormContainer_loginForm_label'> Date de naissance </label>
                <input type="date" id='birthDate' className='createAccountFormContainer_loginForm_inputDate' />

                <label htmlFor='phoneNumber' className='createAccountFormContainer_loginForm_label'> Téléphone </label>
                <input type="tel" id='phoneNumber' className='createAccountFormContainer_loginForm_inputTel' />

                <span className='createAccountFormContainer_loginForm_checkboxContainer'>
                    <input type="checkbox" />
                    <span className='createAccountFormContainer_loginForm_checkboxContainer_checkBoxText'> J'accepte les <Link to="/ConditionsGenerales" className='createAccountFormContainer_loginForm_checkboxContainer_checkBoxText_checkBoxLink'> conditions générales </Link> d'utilisation </span>
                </span>

                <input type="submit" value="Inscription" className='createAccountFormContainer_loginForm_submitButton' />

            </form>
            <section className='createAccountFormContainer_alreadyAccountSection'>
                <h3 className='createAccountFormContainer_alreadyAccountSection_alreadyMember'> Déjà membre ? </h3>
                <Link to='/Compte' className='createAccountFormContainer_alreadyAccountSection_connectionLink'> Connexion </Link>
            </section>
        </div>
    );
};

export default FormCreateAccount;