import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_USER_URL } from '../config';
import { Link } from 'react-router-dom';

const Trajet = (props) => {
    const dateDepart = new Date(props.heureDepart);
    const heureDepart = `${dateDepart.getHours().toString().padStart(2, '0')}h${dateDepart.getMinutes().toString().padStart(2, '0')}`;
    /*const jourDepart = dateDepart.getDate() + "/" + dateDepart.getMonth() + "/" + dateDepart.getFullYear();*/

    const dateArrivee = new Date(props.heureArrivee);
    const heureArrivee = `${dateArrivee.getHours().toString().padStart(2, '0')}h${dateArrivee.getMinutes().toString().padStart(2, '0')}`;
    /*const jourArrivee = dateArrivee.getDate() + "/" + dateArrivee.getMonth() + "/" + dateArrivee.getFullYear();*/

    const [account, setAccount] = useState();

    useEffect(() => {
        axios.get(`${API_USER_URL}/id/` + props.idCompte)
            .then(response => {
                setAccount(response.data.user);
            })
            .catch(error => {
                console.log(error);
            });
    }, [props.idCompte]);
    
    return (
        <Link to={`/Details/${props.id}`} className='containerTrajet'>
            <div className='containerTrajet_sectionHeure'>
                <div className='containerTrajet_sectionHeure_ligne'>
                    <p className='containerTrajet_sectionHeure_ligne_text'>{heureDepart} {/*jourDepart*/}</p>
                </div>
                <div className='containerTrajet_sectionHeure_ligneBas'>
                    <p className='containerTrajet_sectionHeure_ligne_text'>{heureArrivee} {/*jourArrivee*/}</p>
                </div>
            </div>
            <div className='containerTrajet_sectionLieu'>
                <div className='containerTrajet_sectionLieu_ligne'>
                    <p className='containerTrajet_sectionLieu_ligne_text'>{props.lieuDepart}</p>
                </div>
                <div className='containerTrajet_sectionLieu_ligneBas'>
                    <p className='containerTrajet_sectionLieu_ligne_text'>{props.lieuArrivee}</p>
                </div>
            </div>
            <div className='containerTrajet_sectionMillieu'>
                <img className='containerTrajet_sectionMillieu_icone' src={`${process.env.PUBLIC_URL}/assets/images/manIco.svg`} alt='icone Monsieur' />
                <p className='containerTrajet_sectionMillieu_text'>1/{props.nombreDePassagers}</p>
            </div>
            <div className='containerTrajet_sectionDroite'>
                <p className='containerTrajet_sectionDroite_textPrice'>18€*</p>
                {account && (
                    <>
                        <p className='containerTrajet_sectionDroite_text'>{account.firstName} {account.lastName}</p>
                        <p className='containerTrajet_sectionDroite_text'>{props.numeroDeVol}</p>
                    </>
                )}
            </div>
        </Link>
    );
};

export default Trajet;