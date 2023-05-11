import VideoExplication from '../components/VideoExplication';
import { NavLink } from 'react-router-dom';
import Trajet from '../components/Trajet';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_TRAVEL_URL } from '../config';

const PageRechercherUnTrajet = () => {
    const [start, setStart] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [numberOfPeople, setNumberOfPeople] = useState("");
    const [travels, setTravels] = useState([]);

    useEffect(() => {
        axios.get(`${API_TRAVEL_URL}`)
            .then(response => {
                setTravels(response.data.travels);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const filteredTravels = travels.filter(travel =>
        (start === "" || travel.lieuDepart.toLowerCase().includes(start.toLowerCase())) &&
        (destination === "" || travel.lieuArrivee.toLowerCase().includes(destination.toLowerCase())) &&
        (numberOfPeople === "" || travel.nombreDePassagers >= parseInt(numberOfPeople)) &&
        (date === "" || new Date(travel.heureDepart).toISOString().slice(0, 10) === date)
    );

    return (
        <article>
            <form className='FormFindRoutes' onSubmit={handleSubmit}>
                <input className="FormFindRoutes_inputTextStart" type="text" value={start} placeholder='Départ' onChange={(e) => setStart(e.target.value)} />
                <input className="FormFindRoutes_inputTextDestination" type="text" value={destination} placeholder='Destination' onChange={(e) => setDestination(e.target.value)} />
                <input className="FormFindRoutes_inputDateTime" type="date" defaultValue={date} onChange={(e) => setDate(e.target.value)} />
                <input className="FormFindRoutes_inputNumberOfPeople" type="number" min="1" value={numberOfPeople} placeholder='Nombre de voyageurs' onChange={(e) => setNumberOfPeople(e.target.value)} />
            </form>
            <div className='containerTrierAndTrajets'>
                <div className='containerTrierAndTrajets_trier'>
                    <p className='containerTrierAndTrajets_trier_title'>Trier par :</p>
                    <div className='containerTrierAndTrajets_trier_ligne'>
                        <input type='checkbox' className='containerTrierAndTrajets_trier_ligne_checkbox'/>
                        <p className='containerTrierAndTrajets_trier_ligne_text'>Heure d'arrivée</p>
                    </div>
                    <div className='containerTrierAndTrajets_trier_ligne'>
                        <input type='checkbox' className='containerTrierAndTrajets_trier_ligne_checkbox'/>
                        <p className='containerTrierAndTrajets_trier_ligne_text'>Heure de départ</p>
                    </div>
                    <div className='containerTrierAndTrajets_trier_ligne'>
                        <input type='checkbox' className='containerTrierAndTrajets_trier_ligne_checkbox'/>
                        <p className='containerTrierAndTrajets_trier_ligne_text'>N de vol</p>
                    </div>
                    <div className='containerTrierAndTrajets_trier_ligne'>
                        <input type='checkbox' className='containerTrierAndTrajets_trier_ligne_checkbox'/>
                        <p className='containerTrierAndTrajets_trier_ligne_text'>Plus proche du point d'arrivée</p>
                    </div>
                </div>
                <div className='containerTrajets'>
                    {filteredTravels.map(travel => {
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
            </div>
            <div className='containerButtonAndVideo'>
                <p className='containerButtonAndVideo_text'>*Les prix sont propotionnels au nombre de passagers déjà inscrit sur le trajet .</p>
                <NavLink to="/ContactezNous">
                    <button className='boutonContact'>Tu ne vois pas ton trajet ? <br></br> Organise le !</button>
                </NavLink>
                <VideoExplication />
            </div>
        </article>
    );
};

export default PageRechercherUnTrajet;