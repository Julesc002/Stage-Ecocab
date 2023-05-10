import Trajet from './Trajet';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_TRAVEL_URL } from '../config';

const ListeTrajets = () => {
    const [travels, setTravels] = useState([]);

    useEffect(() => {
        axios.get(`${API_TRAVEL_URL}`)
            .then(response => {
                setTravels(response.data.travels);
            })
            .catch(error => {
                console.log(error);
            });
    }, [travels]);

    return (
        <div className='containerTrajets'>
            {travels.map(travel => {
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
                    />
                );
            })}
        </div>
    );
};

export default ListeTrajets;