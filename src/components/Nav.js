import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {

    const isConnected = localStorage.getItem('isConnected') === 'true';

    const [showLinks, setShowLinks] = useState(false);
    const [showSubmenu, setShowSubmenu] = useState(false);

    // Fermer le sous menu si l'utilisateur scroll dans la page
    window.addEventListener('scroll', function () {
        if (showSubmenu) {
            setShowSubmenu(false);
        }
    });


    const handleShowLinks = () => {
        setShowLinks(!showLinks);
    }

    const handleClick = () => {
        const navigationMenu = document.querySelector('.navigationMenu');
        const showNavigationMenu = navigationMenu.classList.contains('showNavigationMenu');

        if (showNavigationMenu) {
            setShowLinks(!showLinks);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isConnected');
        localStorage.removeItem('user');
        // Recharger la page
        window.location.reload();
        window.location.href = "/Compte";
    }

    useEffect(() => {
        // Fonction pour changer la propriété CSS 'overflow' du body en fonction de l'état du menu burger
        const handleOverflow = () => {
            document.body.style.overflow = showLinks ? 'hidden' : 'unset';
        };

        handleOverflow();

        // Ajouter un écouteur d'événement pour les changements d'état du menu burger
        window.addEventListener('resize', handleOverflow);

        // Nettoyer l'écouteur d'événement lorsque le composant est démonté
        return () => {
            window.removeEventListener('resize', handleOverflow);
            document.body.style.overflow = 'unset';
        };
    }, [showLinks]);

    const handleShowSubmenu = () => {
        setShowSubmenu(!showSubmenu);
    };

    return (
        <nav className={`navigationMenu ${showLinks ? 'showNavigationMenu' : 'hideNavigationMenu'}`}>
            <NavLink to="/">
                <h1 className='navigationMenu_titleApp'> ECoCab </h1>
            </NavLink>
            <ul className='navigationMenu_links'>
                <NavLink to="/CommentCaMarche">
                    <li className='navigationMenu_links_item navigationMenu_links_slideInDown1' onClick={handleClick}> Comment ça marche </li>
                </NavLink>
                <NavLink to="/RechercherUnTrajet">
                    <li className='navigationMenu_links_item navigationMenu_links_slideInDown2' onClick={handleClick}> Rechercher un trajet </li>
                </NavLink>
                <NavLink to="/PosterUnTrajet">
                    <li className='navigationMenu_links_item navigationMenu_links_slideInDown3' onClick={handleClick}> Poster un trajet </li>
                </NavLink>
                <NavLink to="/Compte">
                    <li className='navigationMenu_links_item navigationMenu_links_slideInDown4' onClick={handleClick}> Compte </li>
                </NavLink>
                {isConnected && !showLinks ? (
                    <div className='navigationMenu_links_subemenuContainer'>
                        <span className="navigationMenu_links_subemenuContainer_arrow" onClick={handleShowSubmenu}> &#9662; </span>
                        {showSubmenu && (
                            <ul className="navigationMenu_links_subemenuContainer_submenu">
                                <NavLink to="/Compte">
                                    <li className="navigationMenu_links_subemenuContainer_submenu_item"> Profil </li>
                                </NavLink>
                                <NavLink to="/MesTrajets">
                                    <li className="navigationMenu_links_subemenuContainer_submenu_item"> Mes trajets </li>
                                </NavLink>
                                <NavLink to="/Messages">
                                    <li className="navigationMenu_links_subemenuContainer_submenu_item">Messages</li>
                                </NavLink>
                                <NavLink to="/HistoriquePaiements">
                                    <li className="navigationMenu_links_subemenuContainer_submenu_item">Historique des paiements</li>
                                </NavLink>
                                <NavLink to="/Deconnexion">
                                    <li className="navigationMenu_links_subemenuContainer_submenu_item" onClick={handleLogout}>Déconnexion</li>
                                </NavLink>
                            </ul>
                        )}
                    </div>
                ) : null}
            </ul>
            <button className='navigationMenu_burgerButton' onClick={handleShowLinks}>
                <span className='navigationMenu_burgerButton_burgerLine' />
            </button>
        </nav >
    );
};

export default Nav;