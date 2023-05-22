import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_USER_URL } from '../config';
import axios from 'axios';

const FormLoginWithEmail = () => {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        let missingFields = "";
        if (!email) {
            missingFields += "Email, ";
        }
        if (!pwd) {
            missingFields += "Mot de passe, ";
        }
        if (missingFields) {
            missingFields = missingFields.slice(0, -2); // Supprime la virgule et l'espace à la fin de la chaîne
            setErrorMessage(`Les champs suivants sont manquants: ${missingFields}`);
        } else {
            axios.get(`${API_USER_URL}/email`, { params: { email: email } })
                .then((res) => {
                    console.log(res);
                    if (res.data.user.password === pwd) {
                        localStorage.setItem('isConnected', true);
                        localStorage.setItem('user', res.data.user._id);
                        // Recharger la page
                        window.location.reload();
                    } else {
                        setErrorMessage('Email ou mot de passe incorrect');
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setErrorMessage('Email ou mot de passe incorrect');
                })
        }

    }

    return (
        <div className='loginFormContainer'>

            <h1 className='loginFormContainer_mainTitleForm'> Je me connecte </h1>

            <form className='loginFormContainer_loginForm' onSubmit={handleSubmit}>
                <label htmlFor='email' className='loginFormContainer_loginForm_label'> Email </label>
                <input type="email" id='email' value={email} className='loginFormContainer_loginForm_inputText' onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor='password' className='loginFormContainer_loginForm_label'> Mot de passe </label>
                <input type="password" id='password' value={pwd} className='loginFormContainer_loginForm_inputPassword' onChange={(e) => setPwd(e.target.value)} />

                {errorMessage !== '' ? <p className='loginFormContainer_loginForm_errorMessage'> {errorMessage} </p> : null}

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