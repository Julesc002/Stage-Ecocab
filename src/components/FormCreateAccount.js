import axios from 'axios';
import { API_USER_URL } from '../config';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FormCreateAccount = () => {

    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [generalConditions, setGeneralConditions] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        let missingFields = "";
        if (!email) {
            missingFields += "Email, ";
        }
        if (!lastName) {
            missingFields += "Nom, ";
        }
        if (!firstName) {
            missingFields += "Prénom, ";
        }
        if (!password) {
            missingFields += "Mot de passe, ";
        }
        if (!confirmPassword) {
            missingFields += "Confirmer mot de passe, ";
        }
        if (!birthDate) {
            missingFields += "Date de naissance, ";
        }
        if (!phoneNumber) {
            missingFields += "Numéro de téléphone, ";
        }
        if (missingFields) {
            missingFields = missingFields.slice(0, -2); // Supprime la virgule et l'espace à la fin de la chaîne
            setErrorMessage(`Les champs suivants sont manquants: ${missingFields}`);
        } else if (password !== confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas");
        } else if (!generalConditions) {
            setErrorMessage("Veuillez valider les conditions générales d'utilisation");
        } else {

            const newUser = {
                email: email,
                lastName: lastName,
                firstName: firstName,
                password: password,
                birthDate: birthDate,
                phoneNumber: phoneNumber
            };

            axios.post(`${API_USER_URL}`, newUser)
                .then((res) => {
                    console.log(res);
                    window.location.href = "/Compte";
                })
                .catch((error) => {
                    console.log(error);
                    setErrorMessage("Cette adresse email est déjà associée à un compte");
                });

        }
    }

    return (
        <div className='createAccountFormContainer'>
            <h1 className='createAccountFormContainer_mainTitleForm'> Inscription </h1>
            <form className='loginFormContainer_loginForm' onSubmit={handleSubmit}>
                <label htmlFor='email' className='createAccountFormContainer_loginForm_label'> Email </label>
                <input type="email" id='email' value={email} className='createAccountFormContainer_loginForm_inputText' onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor='lastName' className='createAccountFormContainer_loginForm_label'> Nom </label>
                <input type="text" id='lastName' value={lastName} className='createAccountFormContainer_loginForm_inputText' onChange={(e) => setLastName(e.target.value)} />

                <label htmlFor='firstName' className='createAccountFormContainer_loginForm_label'> Prénom </label>
                <input type="text" id='firstName' value={firstName} className='createAccountFormContainer_loginForm_inputText' onChange={(e) => setFirstName(e.target.value)} />

                <label htmlFor='password' className='createAccountFormContainer_loginForm_label'> Mot de passe </label>
                <input type="password" id='password' value={password} className='createAccountFormContainer_loginForm_inputPassword' onChange={(e) => setPassword(e.target.value)} />

                <label htmlFor='confirmPassword' className='createAccountFormContainer_loginForm_label'> Confirmer Mot de passe </label>
                <input type="password" id='confirmPassword' value={confirmPassword} className='createAccountFormContainer_loginForm_inputPassword' onChange={(e) => setConfirmPassword(e.target.value)} />

                <label htmlFor='birthDate' className='createAccountFormContainer_loginForm_label'> Date de naissance </label>
                <input type="date" id='birthDate' value={birthDate} className='createAccountFormContainer_loginForm_inputDate' onChange={(e) => setBirthDate(e.target.value)} />

                <label htmlFor='phoneNumber' className='createAccountFormContainer_loginForm_label'> Téléphone </label>
                <input type="tel" id='phoneNumber' value={phoneNumber} className='createAccountFormContainer_loginForm_inputTel' onChange={(e) => setPhoneNumber(e.target.value)} />

                <span className='createAccountFormContainer_loginForm_checkboxContainer'>
                    <input type="checkbox" checked={generalConditions} onChange={(e) => setGeneralConditions(e.target.checked)} />
                    <span className='createAccountFormContainer_loginForm_checkboxContainer_checkBoxText'> J'accepte les <Link to="/ConditionsGenerales" className='createAccountFormContainer_loginForm_checkboxContainer_checkBoxText_checkBoxLink'> conditions générales </Link> d'utilisation </span>
                </span>
                {errorMessage !== '' ? <p className='createAccountFormContainer_loginForm_errorMessage'> {errorMessage} </p> : null}
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