import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {

    const [showLinks, setShowLinks] = useState(false);

    const handleShowLinks = () => {
        setShowLinks(!showLinks);
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

    return (
        <nav className={`navigationMenu ${showLinks ? 'showNavigationMenu' : 'hideNavigationMenu'}`}>
            <NavLink to="/">
                <h1 className='navigationMenu_titleApp'> ECoCab </h1>
            </NavLink>
            <ul className='navigationMenu_links'>
                <NavLink to="/CommentCaMarche">
                    <li className='navigationMenu_links_item navigationMenu_links_slideInDown1'> Comment ça marche </li>
                </NavLink>
                <NavLink to="/RechercherUnTrajet">
                    <li className='navigationMenu_links_item navigationMenu_links_slideInDown2'> Rechercher un trajet </li>
                </NavLink>
                <NavLink to="/PosterUnTrajet">
                    <li className='navigationMenu_links_item navigationMenu_links_slideInDown3'> Poster un trajet </li>
                </NavLink>
                <NavLink to="/Compte">
                    <li className='navigationMenu_links_item navigationMenu_links_slideInDown4'> Compte </li>
                </NavLink>
            </ul>
            <button className='navigationMenu_burgerButton' onClick={handleShowLinks}>
                <span className='navigationMenu_burgerButton_burgerLine' />
            </button>
        </nav>
    );
};

export default Nav;