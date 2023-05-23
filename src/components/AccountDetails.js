import React from 'react';

const AccountDetails = () => {

    // localStorage.getItem('user')


    return (
        <article className='accountDetailsContainer'>
            <h1 className='accountDetailsContainer_mainTitle'> Profil </h1>
            <span className='accountDetailsContainer_separator' />
            <section className='accountDetailsContainer_accountInformationsSection'>
                <h1 className='accountDetailsContainer_accountInformationsSection_mainTitle'> Informations personnelles </h1>
                <div className='accountDetailsContainer_accountInformationsSection_container'>
                    <div className='accountDetailsContainer_accountInformationsSection_container_firstLastNames'>
                        <label className='accountDetailsContainer_accountInformationsSection_container_firstLastNames_labelTitle'> Prénom </label>
                        <label className='accountDetailsContainer_accountInformationsSection_container_firstLastNames_labelContent'> Jean-Jacques </label>

                        <label className='accountDetailsContainer_accountInformationsSection_container_firstLastNames_labelTitle lastNameTitle'> Nom </label>
                        <label className='accountDetailsContainer_accountInformationsSection_container_firstLastNames_labelContent lastNameContent'> Rieuneau </label>
                    </div>

                    <label className='accountDetailsContainer_accountInformationsSection_container_labelTitle'> Email </label>
                    <label className='accountDetailsContainer_accountInformationsSection_container_labelContent'> clement.rieuneau@gmail.com </label>

                    <label className='accountDetailsContainer_accountInformationsSection_container_labelTitle'> Date de naissance </label>
                    <label className='accountDetailsContainer_accountInformationsSection_container_labelContent'> 12/09/2003 </label>

                    <label className='accountDetailsContainer_accountInformationsSection_container_labelTitle'> Numéro de téléphone </label>
                    <label className='accountDetailsContainer_accountInformationsSection_container_labelContent'> 07 13 11 07 93 </label>

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