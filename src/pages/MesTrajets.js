import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_TRAVEL_URL } from '../config';
import Trajet from '../components/Trajet';

const MesTrajets = () => {
    const [travels, setTravels] = useState([]);
    const currentDate = new Date().toISOString();
    const [displayTrajetsAVenir, setDisplayTrajetsAVenir] = useState(true);
    const [button1Clicked, setButton1Clicked] = useState(true);
    const [button2Clicked, setButton2Clicked] = useState(false);

    const majDisplayTrajetsAVenir = () => {
        if (!displayTrajetsAVenir) {
            setDisplayTrajetsAVenir(true);
            setButton1Clicked(true);
            setButton2Clicked(false);
        }
    }

    const majDisplayTrajetsPassés = () => {
        if (displayTrajetsAVenir) {
            setDisplayTrajetsAVenir(false);
            setButton1Clicked(false);
            setButton2Clicked(true);
        }
    }

    useEffect(() => {
        axios.get(`${API_TRAVEL_URL}/user/` + localStorage.getItem('user'))
            .then(response => {
                setTravels(response.data.travels);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    console.log(travels);

    return (
        <div className='mesTrajets'>
            <img className='mesTrajets_carIcon' src={`${process.env.PUBLIC_URL}/assets/images/undraw_by_my_car_re_g0c3.svg`} alt='icone voiture' />
            <img className='mesTrajets_aircraftIcon' src={`${process.env.PUBLIC_URL}/assets/images/undraw_aircraft_re_m05i.svg`} alt='icone avion' />
            <div className='mesTrajets_containerButtons'>
                <button
                    className={`mesTrajets_containerButtons_buttons ${button1Clicked ? 'mesTrajets_containerButtons_buttonClicked' : ''}`}
                    onClick={majDisplayTrajetsAVenir}
                >
                    A venir
                </button>
                <button
                    className={`mesTrajets_containerButtons_buttons ${button2Clicked ? 'mesTrajets_containerButtons_buttonClicked' : ''}`}
                    onClick={majDisplayTrajetsPassés}
                >
                    Passés
                </button>
            </div>
            <div className='mesTrajets_containerTrajets'>
                {displayTrajetsAVenir ?
                    travels.filter((travel) => travel.heureArrivee > currentDate).map((travel) => {
                        return (
                            <Trajet
                                id={travel._id}
                                heureDepart={travel.heureDepart}
                                heureArrivee={travel.heureArrivee}
                                lieuDepart={travel.lieuDepart}
                                lieuArrivee={travel.lieuArrivee}
                                nombreDePassagers={travel.nombreDePassagers}
                                numeroDeVol={travel.numeroDeVol}
                                idCompte={travel.idCompte}
                                nbVoyageurs={travel.idVoyageurs.length + travel.idVoyageursInscrits.length}
                                affichageDate={true}
                                voyageurs={travel.idVoyageurs.concat(travel.idVoyageursInscrits)}
                            />
                        );
                    })
                    :
                    travels.filter((travel) => travel.heureArrivee <= currentDate).map((travel) => {
                        return (
                            <Trajet
                                id={travel._id}
                                heureDepart={travel.heureDepart}
                                heureArrivee={travel.heureArrivee}
                                lieuDepart={travel.lieuDepart}
                                lieuArrivee={travel.lieuArrivee}
                                nombreDePassagers={travel.nombreDePassagers}
                                numeroDeVol={travel.numeroDeVol}
                                idCompte={travel.idCompte}
                                nbVoyageurs={travel.idVoyageurs.length + travel.idVoyageursInscrits.length}
                                affichageDate={true}
                                voyageurs={travel.idVoyageurs.concat(travel.idVoyageursInscrits)}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};

export default MesTrajets;
