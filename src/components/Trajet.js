import React from 'react';
import { Link } from 'react-router-dom';

const Trajet = () => {

    return (
        <Link to="/Details" className='containerTrajet'>
            <div className='containerTrajet_sectionLieuEtHeure'>
                <div className='containerTrajet_sectionLieuEtHeure_ligne'>
                    <p className='containerTrajet_sectionLieuEtHeure_ligne_text'>12h</p>
                    <p className='containerTrajet_sectionLieuEtHeure_ligne_text'>Orly</p>
                </div>
                <div className='containerTrajet_sectionLieuEtHeure_ligneBas'>
                    <p className='containerTrajet_sectionLieuEtHeure_ligne_text'>12h30</p>
                    <p className='containerTrajet_sectionLieuEtHeure_ligne_text'>République</p>
                </div>
            </div>
            <div className='containerTrajet_sectionMillieu'>
                <img className='containerTrajet_sectionMillieu_icone' src={`${process.env.PUBLIC_URL}/assets/images/manIco.svg`} alt='icone Monsieur' />
                <p className='containerTrajet_sectionMillieu_text'>2</p>
            </div>
            <div className='containerTrajet_sectionDroite'>
                <p className='containerTrajet_sectionDroite_text'>18€*</p>
                <p className='containerTrajet_sectionDroite_text'>Romain</p>
                <p className='containerTrajet_sectionDroite_text'>N°vol</p>
            </div>
        </Link>
    );
};

export default Trajet;