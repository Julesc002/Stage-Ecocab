import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_USER_URL } from '../config';
import { Link } from 'react-router-dom';

const Trajet = (props) => {
    const dateDepart = new Date(props.heureDepart);
    const heureDepart = `${dateDepart.getHours().toString().padStart(2, '0')}h${dateDepart.getMinutes().toString().padStart(2, '0')}`;
    const jourDepart = `${dateDepart.getDate()}/${(dateDepart.getMonth() + 1)}/${dateDepart.getFullYear()}`;

    const dateArrivee = new Date(props.heureArrivee);
    const heureArrivee = `${dateArrivee.getHours().toString().padStart(2, '0')}h${dateArrivee.getMinutes().toString().padStart(2, '0')}`;
    /*const jourArrivee = dateArrivee.getDate() + "/" + dateArrivee.getMonth() + "/" + dateArrivee.getFullYear();*/

    const [account, setAccount] = useState();

    const prixTrajet = () => {
        let voyageurBonusPrisEnCompte = 1;
        if ((localStorage.getItem('user') === props.idCompte) || props.voyageurs.includes(localStorage.getItem('user'))) {
            voyageurBonusPrisEnCompte = 0;
        }
        if (props.lieuDepart === 'Orly Airport (ORY)' || props.lieuArrivee === 'Orly Airport (ORY)') {
            return (38 / (props.nbVoyageurs + 1 + voyageurBonusPrisEnCompte)).toFixed(2);
        } else {
            return (59 / (props.nbVoyageurs + 1 + voyageurBonusPrisEnCompte)).toFixed(2);
        }
    }

    useEffect(() => {
        axios.get(`${API_USER_URL}/id/` + props.idCompte)
            .then(response => {
                setAccount(response.data.user);
            })
            .catch(error => {
                console.log(error);
            });
    }, [props.idCompte]);

    const travelCard = (
        <>
            <div className='containerTrajet_sectionHeure'>
                <div className='containerTrajet_sectionHeure_ligne'>
                    <p className='containerTrajet_sectionHeure_ligne_text'>{heureDepart} </p>
                </div>
                <p className='containerTrajet_sectionHeure_Date'>{props.affichageDate ? jourDepart : ''}</p>
                <div className='containerTrajet_sectionHeure_ligneBas'>
                    <p className='containerTrajet_sectionHeure_ligne_text'>{heureArrivee} </p>
                </div>
            </div>
            <div className='containerTrajet_sectionLieu'>
                <div className='containerTrajet_sectionLieu_ligne'>
                    <p className='containerTrajet_sectionLieu_ligne_text'>{props.lieuDepart}</p>
                    {props.whereIsAirport === 'destination' && props.distance >= 0 ?
                        props.distance < 1000 ?
                            <>
                                <div className="greenCircle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                            </>
                            :
                            props.distance < 3000 ?
                                <>
                                    <div className="circle"></div>
                                    <div className="orangeCircle"></div>
                                    <div className="circle"></div>
                                </>
                                :
                                <>
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                    <div className="redCircle"></div>
                                </>
                        :
                        null
                    }

                </div>
                <div className='containerTrajet_sectionLieu_ligneBas'>
                    <p className='containerTrajet_sectionLieu_ligne_text'>{props.lieuArrivee}</p>
                    {props.whereIsAirport === 'start' && props.distance >= 0 ?
                        props.distance < 1000 ?
                            <>
                                <div className="greenCircle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                            </>
                            :
                            props.distance < 3000 ?
                                <>
                                    <div className="circle"></div>
                                    <div className="orangeCircle"></div>
                                    <div className="circle"></div>
                                </>
                                :
                                <>
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                    <div className="redCircle"></div>
                                </>
                        :
                        null
                    }
                </div>
            </div>
            <div className='containerTrajet_sectionMillieu'>
                <img className='containerTrajet_sectionMillieu_icone' src={`${process.env.PUBLIC_URL}/assets/images/manIco.svg`} alt='icone Monsieur' />
                <p className='containerTrajet_sectionMillieu_text'>{props.nbVoyageurs + 1}/{props.nombreDePassagers}</p>
            </div>
            <div className='containerTrajet_sectionDroite'>
                <p className='containerTrajet_sectionDroite_textPrice'> {prixTrajet()}  €* </p>
                {account && (
                    <p className='containerTrajet_sectionDroite_text'>{account.firstName} {account.lastName}</p>
                )}
                <p className='containerTrajet_sectionDroite_text'>{props.numeroDeVol}</p>
            </div>
        </>
    );

    return (
        <>
            {!props.unclicable ? (
                <Link to={`/Details/${props.id}`} className='containerTrajet'>
                    {travelCard}
                </Link>
            ) : (
                <div className='containerTrajetUnclicable'>
                    {travelCard}
                </div>
            )}
        </>
    )
};

export default Trajet;