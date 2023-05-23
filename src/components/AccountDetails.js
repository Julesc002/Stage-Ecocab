import React, { useEffect, useState } from 'react';
import { API_USER_URL } from '../config';
import axios from 'axios';

const AccountDetails = () => {

    const [user, setUser] = useState('');
    const [birthDate, setBirthDate] = useState('');

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
                <button className='accountDetailsContainer_modifSection_modifButton'> Modifier les informations personnelles </button>
                <button className='accountDetailsContainer_modifSection_modifButton'> Modifier le mot de passe </button>
                <button className='accountDetailsContainer_modifSection_deleteButton'> Supprimer le compte </button>
            </section>
        </article>
    );
};

export default AccountDetails;