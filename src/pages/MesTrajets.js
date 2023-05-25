import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_TRAVEL_URL } from '../config';
import Trajet from '../components/Trajet';

const MesTrajets = () => {
    const [travels, setTravels] = useState([]);
    const currentDate = new Date().toISOString();
    const [displayTrajetsAVenir, setDisplayTrajetsAVenir] = useState(true);

    const majDisplayTrajetsAVenir = () => {
        if (!displayTrajetsAVenir) {
            setDisplayTrajetsAVenir(true);
        }
    }

    const majDisplayTrajetsPassés = () => {
        if (displayTrajetsAVenir) {
            setDisplayTrajetsAVenir(false);
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
            <div className='mesTrajets_containerButtons'>
                <button className='mesTrajets_containerButtons_buttons' onClick={majDisplayTrajetsAVenir}>A venir</button>
                <button className='mesTrajets_containerButtons_buttons' onClick={majDisplayTrajetsPassés}>Passés</button>
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
                                nbVoyageurs={travel.idVoyageurs.length}
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
                            nbVoyageurs={travel.idVoyageurs.length}
                        />
                    );
                })
                }
            </div>
        </div>
    );
};

export default MesTrajets;