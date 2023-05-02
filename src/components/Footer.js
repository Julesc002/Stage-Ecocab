import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='footerContainer'>
            <h1 className='footerContainer_mainTitle'>ECoCab</h1>
            <nav className='footerContainer_links'>
                <ul className='footerContainer_links_firstList'>
                    <NavLink to="/MentionLegales"><li>Mention légales</li></NavLink>
                    <NavLink to="/"><li>CGV</li></NavLink>
                </ul>
                <div className='a'>
                    <p className='footerContainer_links_titleSecondList'>En savoir plus</p>
                    <ul className='footerContainer_links_secondList'>
                        <NavLink to="/"><li>Comment ça marche</li></NavLink>
                        <NavLink to="/"><li>Centre d'aide</li></NavLink>
                        <NavLink to="/"><li>Qui sommes nous ?</li></NavLink>
                        <NavLink to="/"><li>Presse</li></NavLink>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Footer;