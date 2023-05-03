import React, { useState } from 'react';
import ListeTrajets from '../components/ListeTrajets';
import VideoExplication from '../components/VideoExplication';
import { NavLink } from 'react-router-dom';

const PageRechercherUnTrajet = () => {
    const [start, setStart] = useState("Départ");
    const [destination, setDestination] = useState("Destination");
    const [dateAndTime, setDateAndTime] = useState("Date et heure");
    const [numberOfPeople, setNumberOfPeople] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <article>
            <form className='FormFindRoutes' onSubmit={handleSubmit}>
                <input className="FormFindRoutes_inputTextStart" type="text" placeholder={start} onChange={(e) => setStart(e.target.value)} />
                <input className="FormFindRoutes_inputTextDestination" type="text" placeholder={destination} onChange={(e) => setDestination(e.target.value)} />
                <input className="FormFindRoutes_inputDateTime" type="datetime-local" placeholder={dateAndTime} onChange={(e) => setDateAndTime(e.target.value)} />
                <input className="FormFindRoutes_inputNumberOfPeople" type="number" min="1" value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)} />
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
                <ListeTrajets />
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