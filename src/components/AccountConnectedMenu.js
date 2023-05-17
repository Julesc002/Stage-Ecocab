import React from 'react';

const AccountConnectedMenu = () => {

    const handleLogout = () => {
        localStorage.removeItem('isConnected');
        localStorage.removeItem('user');
        // Recharger la page
        window.location.reload();
    }

    return (
        <div className='accountMenu'>
            <h1 className='accountMenu_mainTitle'> Mon compte </h1>
            <button className='accountMenu_infoBtn'> Mes informations </button>
            <button className='accountMenu_changePwd'> Changer de mot de passe </button>
            <button className='accountMenu_logout' onClick={handleLogout}> Se déconnecter </button>
        </div>
    );
};

export default AccountConnectedMenu;