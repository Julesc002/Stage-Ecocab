import React, { useEffect, useState } from 'react';
import { API_USER_URL, API_TRAVEL_URL } from '../config';
import axios from 'axios';

const AccountDetails = () => {

    const [user, setUser] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const [pwd, setPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [verifNewPwd, setVerifNewPwd] = useState('');

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [updatePwd, setUpdatePwd] = useState(false);

    const [updateContent, setUpdateContent] = useState({
        update: false,
        email: '',
        lastName: '',
        firstName: '',
        password: '',
        birthDate: '',
        phoneNumber: ''
    });

    useEffect(() => {
        axios.get(`${API_USER_URL}/id/` + localStorage.getItem('user'))
            .then(response => {
                setUser(response.data.user);
                const date = new Date(user.birthDate);
                setBirthDate(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
            })
            .catch(error => {
                console.log(error);
            });
    });

    const updateContentData = () => {
        setUpdateContent({
            ...updateContent,
            update: !(updateContent.update),
            email: user.email,
            lastName: user.lastName,
            firstName: user.firstName,
            password: '',
            birthDate: new Date(user.birthDate).toISOString().slice(0, 10),
            phoneNumber: user.phoneNumber
        })
    }

    const setUpdateFalse = () => {
        setErrorMessage('');
        setUpdateContent({
            ...updateContent,
            update: false
        })
    }

    const updateFirstName = (firstName) => {
        setUpdateContent({
            ...updateContent,
            firstName: firstName
        })
    }
    const updateLastName = (lastName) => {
        setUpdateContent({
            ...updateContent,
            lastName: lastName
        })
    }
    const updateEmail = (email) => {
        setUpdateContent({
            ...updateContent,
            email: email
        })
    }
    const updateBirthDate = (birthDate) => {
        setUpdateContent({
            ...updateContent,
            birthDate: birthDate
        })
    }
    const updatePhoneNumber = (phoneNumber) => {
        setUpdateContent({
            ...updateContent,
            phoneNumber: phoneNumber
        })
    }

    const updatePassword = (pwd) => {
        setUpdateContent({
            ...updateContent,
            password: pwd
        })
    }



    const handleSubmitModifyUser = (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (!updateContent.email ||
            !updateContent.lastName ||
            !updateContent.firstName ||
            !updateContent.birthDate ||
            !updateContent.phoneNumber) {
            setErrorMessage('Veuillez remplir tous les champs');
            return;
        }
        if (user.password !== updateContent.password) {
            setErrorMessage('Mot de passe incorrect : Veuillez vérifier votre mot de passe et réessayer.');
            return;
        } else {
            axios.put(`${API_USER_URL}/` + localStorage.getItem('user'), updateContent)
                .then(response => {
                    console.log(response);
                    setUpdateFalse();
                })
                .catch(error => {
                    console.log(error);
                    setErrorMessage('Il y a eu un problème lors de la validation du formulaire');
                });
        }
    }

    const handleSubmitModifyPwd = (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (!pwd || !newPwd || !verifNewPwd) {
            setErrorMessage('Veuillez remplir tous les champs');
            return;
        } else if (pwd !== user.password) {
            setErrorMessage('Mot de passe incorrect : Veuillez vérifier votre mot de passe et réessayer.');
            return;
        } else if (newPwd !== verifNewPwd) {
            setErrorMessage('Veuillez saisir le même mot de passe pour valider votre nouveau mot de passe');
            return;
        } else {
            const userUpdatePwd = {
                email: user.email,
                lastName: user.lastName,
                firstName: user.firstName,
                password: newPwd,
                birthDate: new Date(user.birthDate).toISOString().slice(0, 10),
                phoneNumber: user.phoneNumber
            }
            axios.put(`${API_USER_URL}/` + localStorage.getItem('user'), userUpdatePwd)
                .then(response => {
                    setUpdatePwd(!updatePwd);
                })
                .catch(error => {
                    console.log(error);
                    setErrorMessage('Il y a eu un problème lors de la validation du formulaire');
                });
        }

    }

    const handleDelete = () => {
        axios.get(`${API_USER_URL}/id/` + localStorage.getItem('user'))
            .then(currentUser => {
                currentUser.data.user.travelsCreated.forEach((travel) => {
                    axios.delete(`${API_TRAVEL_URL}/${travel}`)
                })
                currentUser.data.user.travelsRegistered.forEach((travel) => {
                    axios.put(`${API_TRAVEL_URL}/${travel}/userRemove/${localStorage.getItem('user')}`);
                    axios.put(`${API_TRAVEL_URL}/${travel}/userRemoveConfirmed/${localStorage.getItem('user')}`);
                })
                axios.delete(`${API_USER_URL}/${localStorage.getItem('user')}`)
                    .then(() => {
                        localStorage.removeItem('isConnected');
                        localStorage.removeItem('user');
                        window.location.href = '/';
                    })
                    .catch((err) => console.log(err))
            })
            .catch(error => {
                console.log(error);
            });
    }

    if (showConfirmation) {
        return (
            <div className='deleteAccountConfirmationPopUp'>
                <h1 className='deleteAccountConfirmationPopUp_mainTitle'> Supprimer mon compte </h1>
                <p className='deleteAccountConfirmationPopUp_p'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla suscipit dolores at dolore? Deleniti, earum eius optio modi dicta voluptatem enim eos quas tenetur aspernatur ab. Assumenda natus vero beatae? </p>
                <div className='deleteAccountConfirmationPopUp_buttons'>
                    <button className='deleteAccountConfirmationPopUp_buttons_deleteBtn' onClick={() => handleDelete()}> Supprimer le compte </button>
                    <button className='deleteAccountConfirmationPopUp_buttons_cancelBtn' onClick={() => setShowConfirmation(false)}> Annuler </button>
                </div>
            </div >
        );
    }
    if (updatePwd) {
        return (
            <article className='accountDetailsContainer'>
                <h1 className='accountDetailsContainer_mainTitle'> Modifier le mot de passe </h1>
                <span className='accountDetailsContainer_separator' />
                <section className='accountDetailsContainer_accountInformationsSection'>
                    <form className='accountDetailsContainer_accountInformationsSection_container' onSubmit={handleSubmitModifyPwd} >
                        <label className='accountDetailsContainer_accountInformationsSection_container_labelTitle'> Ancien mot de passe </label>
                        <input type="password" className='accountDetailsContainer_accountInformationsSection_container_labelContent' onChange={(e) => setPwd(e.target.value)} />

                        <label className='accountDetailsContainer_accountInformationsSection_container_labelTitle'> Nouveau mot de passe </label>
                        <input type="password" className='accountDetailsContainer_accountInformationsSection_container_labelContent' onChange={(e) => setNewPwd(e.target.value)} />

                        <label className='accountDetailsContainer_accountInformationsSection_container_labelTitle'> Confirmer nouveau mot de passe </label>
                        <input type="password" className='accountDetailsContainer_accountInformationsSection_container_labelContent' onChange={(e) => setVerifNewPwd(e.target.value)} />

                        {errorMessage !== '' ? <p className='accountDetailsContainer_accountInformationsSection_container_errorMsg'> {errorMessage} </p> : null}

                        <div className='accountDetailsContainer_accountInformationsSection_container_belowForm'>
                            <input type="submit" value='Confirmer les modifications' className='accountDetailsContainer_accountInformationsSection_container_belowForm_submitBtn' />
                            <button className='accountDetailsContainer_accountInformationsSection_container_belowForm_cancelBtn' onClick={() => {
                                setUpdatePwd(!updatePwd);
                                setErrorMessage('');
                            }}> Annuler </button>
                        </div>
                    </form>
                </section>
            </article>
        );
    }
    if (updateContent.update) {
        return (
            <article className='accountDetailsContainer'>
                <h1 className='accountDetailsContainer_mainTitle'> Profil </h1>
                <span className='accountDetailsContainer_separator' />
                <section className='accountDetailsContainer_accountInformationsSection'>
                    <h1 className='accountDetailsContainer_accountInformationsSection_mainTitle'> Informations personnelles </h1>
                    <form className='accountDetailsContainer_accountInformationsSection_container' onSubmit={handleSubmitModifyUser}>
                        <div className='accountDetailsContainer_accountInformationsSection_container_firstLastNames'>
                            <label className='accountDetailsContainer_accountInformationsSection_container_firstLastNames_labelTitle'> Prénom </label>
                            <input type='text' className='accountDetailsContainer_accountInformationsSection_container_firstLastNames_labelContent' value={updateContent.firstName} onChange={(e) => updateFirstName(e.target.value)} />

                            <label className='accountDetailsContainer_accountInformationsSection_container_firstLastNames_labelTitle lastNameTitle'> Nom </label>
                            <input type='text' className='accountDetailsContainer_accountInformationsSection_container_firstLastNames_labelContent lastNameContent' value={updateContent.lastName} onChange={(e) => updateLastName(e.target.value)} />
                        </div>

                        <label className='accountDetailsContainer_accountInformationsSection_container_labelTitle'> Email </label>
                        <input type='email' className='accountDetailsContainer_accountInformationsSection_container_labelContent' value={updateContent.email} onChange={(e) => updateEmail(e.target.value)} />

                        <label className='accountDetailsContainer_accountInformationsSection_container_labelTitle'> Date de naissance (Jour / Mois / Année) </label>
                        <input type='date' className='accountDetailsContainer_accountInformationsSection_container_labelContent' value={updateContent.birthDate} onChange={(e) => updateBirthDate(e.target.value)} />

                        <label className='accountDetailsContainer_accountInformationsSection_container_labelTitle'> Numéro de téléphone </label>
                        <input type='tel' className='accountDetailsContainer_accountInformationsSection_container_labelContent' value={updateContent.phoneNumber} onChange={(e) => updatePhoneNumber(e.target.value)} />

                        <label className='accountDetailsContainer_accountInformationsSection_container_labelTitle'> Mot de passe </label>
                        <input type="password" className='accountDetailsContainer_accountInformationsSection_container_labelContent' onChange={(e) => updatePassword(e.target.value)} />

                        {errorMessage !== '' ? <p className='accountDetailsContainer_accountInformationsSection_container_errorMsg'> {errorMessage} </p> : null}

                        <div className='accountDetailsContainer_accountInformationsSection_container_belowForm'>
                            <input type="submit" value='Confirmer les modifications' className='accountDetailsContainer_accountInformationsSection_container_belowForm_submitBtn' />
                            <button className='accountDetailsContainer_accountInformationsSection_container_belowForm_cancelBtn' onClick={() => setUpdateFalse()}> Annuler </button>
                        </div>
                    </form>
                </section>
            </article>
        );
    }
    else {
        return (
            <article className='accountDetailsContainer'>
                <h1 className='accountDetailsContainer_mainTitle'> Profil </h1>
                <span className='accountDetailsContainer_separator' />
                <section className='accountDetailsContainer_accountInformationsSection'>
                    <h1 className='accountDetailsContainer_accountInformationsSection_mainTitle'> Informations personnelles </h1>
                    <div className='accountDetailsContainer_accountInformationsSection_container'>
                        <div className='accountDetailsContainer_accountInformationsSection_container_firstLastNames'>
                            <label className='accountDetailsContainer_accountInformationsSection_container_firstLastNames_labelTitle'> Prénom </label>
                            <label className='accountDetailsContainer_accountInformationsSection_container_firstLastNames_labelContent'> {user.firstName} </label>

                            <label className='accountDetailsContainer_accountInformationsSection_container_firstLastNames_labelTitle lastNameTitle'> Nom </label>
                            <label className='accountDetailsContainer_accountInformationsSection_container_firstLastNames_labelContent lastNameContent'> {user.lastName} </label>
                        </div>

                        <label className='accountDetailsContainer_accountInformationsSection_container_labelTitle'> Email </label>
                        <label className='accountDetailsContainer_accountInformationsSection_container_labelContent'> {user.email} </label>

                        <label className='accountDetailsContainer_accountInformationsSection_container_labelTitle'> Date de naissance (Jour / Mois / Année) </label>
                        <label className='accountDetailsContainer_accountInformationsSection_container_labelContent'> {birthDate} </label>

                        <label className='accountDetailsContainer_accountInformationsSection_container_labelTitle'> Numéro de téléphone </label>
                        <label className='accountDetailsContainer_accountInformationsSection_container_labelContent'> {user.phoneNumber} </label>

                    </div>
                </section>
                <section className='accountDetailsContainer_modifSection'>
                    <button className='accountDetailsContainer_modifSection_modifButton' onClick={() => updateContentData()}> Modifier les informations personnelles </button>
                    <button className='accountDetailsContainer_modifSection_modifButton' onClick={() => setUpdatePwd(!updatePwd)}> Modifier le mot de passe </button>
                    <button className='accountDetailsContainer_modifSection_deleteButton' onClick={() => setShowConfirmation(!showConfirmation)}
                    > Supprimer le compte </button>
                </section>
            </article>
        );
    }
};

export default AccountDetails;