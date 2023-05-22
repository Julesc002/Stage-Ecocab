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
            <button className='accountMenu_infoBtn'> Profil </button>
            <button className='accountMenu_infoBtn'> Mes trajets </button>
            <button className='accountMenu_infoBtn'> Messages </button>
            <button className='accountMenu_infoBtn'> Historique des paiements </button>
            <button className='accountMenu_logout' onClick={handleLogout}> Se déconnecter </button>
        </div>
    );
};

export default AccountConnectedMenu;