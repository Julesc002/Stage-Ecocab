import VideoExplication from '../components/VideoExplication';
import { NavLink } from 'react-router-dom';
import Trajet from '../components/Trajet';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_TRAVEL_URL } from '../config';
import { useLocation } from 'react-router-dom';

const PageRechercherUnTrajet = () => {
    const [start, setStart] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [travels, setTravels] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [coordinates, setCoordinates] = useState([]);
    const location = useLocation();


    const [startOrDestination, setStartOrDestination] = useState(''); // On met à jour la variable sur 'start' ou 'destination' en fonction de si on part d'un aéroport ou si on souhaite aller à un aéroport

    const [displayResultsStart, setDisplayResultsStart] = useState(false);
    const [displayResultsDestination, setDisplayResultsDestination] = useState(false);
    const [dataStart, setDataStart] = useState([]);
    const [dataDestination, setDataDestination] = useState([])

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        if (searchParams.get('depart')) {
            setStart(searchParams.get('depart'));
        }
        if (searchParams.get('destination')) {
            setDestination(searchParams.get('destination'));
        }
        if (searchParams.get('date')) {
            setDate(searchParams.get('date'));
        }
    }, [location.search]);


    const handleSetAirport = (e) => {
        if (e === 'start') {
            setStartOrDestination('start');
            setDataStart(['Aéroport de Paris-Charles de Gaulle (CDG)', 'Orly Airport (ORY)']);
            setDataDestination([]);
        } else {
            setStartOrDestination('destination');
            setDataDestination(['Aéroport de Paris-Charles de Gaulle (CDG)', 'Orly Airport (ORY)']);
            setDataStart([]);
        }
        setStart('');
        setDestination('');
    };


    const handleStart = (e) => {
        setDataStart([]);
        setDataStart([]);
        const inputValue = e.target.value;
        setStart(inputValue);
        setCoordinates([]);
        if (inputValue.length >= 2) {
            axios.get('https://api-adresse.data.gouv.fr/search/?q=' + inputValue + ' Île-de-France')
                .then((res) => setDataStart(res.data.features))
                .catch((error) => console.log(error))
        }
    };

    const handleDestinationChange = (e) => {
        setDataDestination([]);
        setCoordinates([]);
        const inputValue = e.target.value;
        setDestination(inputValue);
        if (inputValue.length >= 2) {
            axios.get('https://api-adresse.data.gouv.fr/search/?q=' + inputValue + ' Île-de-France')
                .then((res) => setDataDestination(res.data.features))
                .catch((error) => console.log(error))
        }
    };


    const handleCheckboxClick = (option) => {
        if (selectedOption === option) {
            setSelectedOption(null);
        } else {
            setSelectedOption(option);
        }
    };

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
        (date === "" || new Date(travel.heureDepart).toISOString().slice(0, 10) === date) &&
        (selectedOption !== 'heureDepart' || travel.heureDepart) &&
        (selectedOption !== 'heureArrivee' || travel.heureArrivee) &&
        (selectedOption !== 'numVol' || travel.numeroDeVol)
    ).sort((a, b) => {
        if (selectedOption === 'heureDepart') {
            return new Date(a.heureDepart) - new Date(b.heureDepart);
        } else if (selectedOption === 'heureArrivee') {
            return new Date(a.heureArrivee) - new Date(b.heureArrivee);
        } else if (selectedOption === 'numVol') {
            return a.numeroDeVol.localeCompare(b.numeroDeVol);
        } else {
            return 0;
        }
    });


    return (
        <article>
            <section className='optionSection'>
                <div className='optionSection_optionButtonsContainer'>
                    <button className='optionSection_optionButtonsContainer_button' onClick={() => handleSetAirport('start')}> Je pars d'un aéroport </button>
                    <button className='optionSection_optionButtonsContainer_button' onClick={() => handleSetAirport('destination')}> Je me rends à un aéroport </button>
                </div>
            </section>
            <form className='FormFindRoutes' onSubmit={handleSubmit}>


                {startOrDestination === 'start' ?
                    <div className="FormFindRoutes_Recherche">
                        <input className="FormFindRoutes_Recherche_inputTextStart" type="text" placeholder="Départ" value={start} onFocus={() => setDisplayResultsStart(!displayResultsStart)} onBlur={() => setTimeout(() => { setDisplayResultsStart(false); }, 100)} disabled={startOrDestination.length === 0} />
                        <div className='FormFindRoutes_Recherche_containerResultats'>
                            {displayResultsStart && dataStart.map((place, index) => (
                                <p key={index} className='FormFindRoutes_Recherche_containerResultats_Resultats' onClick={() => { setStart(dataStart[index]); }}> {place} </p>
                            ))}
                        </div>
                    </div>
                    :
                    <div className="FormFindRoutes_Recherche">
                        <input className="FormFindRoutes_Recherche_inputTextStart" type="text" placeholder="Départ" value={start} onFocus={() => setDisplayResultsStart(!displayResultsStart)} onBlur={() => setTimeout(() => { setDisplayResultsStart(false); }, 100)} onChange={(e) => handleStart(e)} disabled={startOrDestination.length === 0} />
                        <div className='FormFindRoutes_Recherche_containerResultats'>
                            {displayResultsStart && dataStart.map((place, index) => (
                                <p key={index} className='FormFindRoutes_Recherche_containerResultats_Resultats' onClick={() => { setStart(place.properties.label); setCoordinates(place.geometry.coordinates) }}> {place.properties.label} </p>
                            ))}
                        </div>
                    </div>
                }


                {startOrDestination === 'destination' ?
                    <div className="FormFindRoutes_Recherche">
                        <input className="FormFindRoutes_Recherche_inputTextDestination" type="text" placeholder="Destination" value={destination} onFocus={() => setDisplayResultsDestination(!displayResultsDestination)} onBlur={() => setTimeout(() => { setDisplayResultsDestination(false); }, 100)} disabled={startOrDestination.length === 0} />
                        <div className='FormFindRoutes_Recherche_containerResultats'>
                            {displayResultsDestination && dataDestination.map((place, index) => (
                                <p key={index} className='FormFindRoutes_Recherche_containerResultats_Resultats' onClick={() => { setDestination(dataDestination[index]); }}> {place} </p>
                            ))}
                        </div>
                    </div>
                    :
                    <div className="FormFindRoutes_Recherche">
                        <input className="FormFindRoutes_Recherche_inputTextDestination" type="text" placeholder="Destination" value={destination} onFocus={() => setDisplayResultsDestination(!displayResultsDestination)} onBlur={() => setTimeout(() => { setDisplayResultsDestination(false); }, 100)} onChange={(e) => handleDestinationChange(e)} disabled={startOrDestination.length === 0} />
                        <div className='FormFindRoutes_Recherche_containerResultats'>
                            {displayResultsDestination && dataDestination.map((place, index) => (
                                <p key={index} className='FormFindRoutes_Recherche_containerResultats_Resultats' onClick={() => { setStart(place.properties.label); setCoordinates(place.geometry.coordinates) }}> {place.properties.label} </p>
                            ))}
                        </div>
                    </div>
                }



                <div className="FormFindRoutes_Recherche">
                    <input className="FormFindRoutes_Recherche_inputDateTime" type="date" placeholder="Date et heure" value={date} onChange={(e) => setDate(e.target.value)} disabled={startOrDestination.length === 0} />
                </div>
                <div className="FormFindRoutes_Recherche">
                    <input className="FormFindRoutes_Recherche_inputNumberOfPeople" type="number" min="1" value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)} disabled={startOrDestination.length === 0} />
                </div>
                <button className="FormFindRoutes_submitButton" type="submit"> Recherchez </button>
            </form>
            <div className='containerTrierAndTrajets'>
                <div className='containerTrierAndTrajets_trier'>
                    <p className='containerTrierAndTrajets_trier_title'>Trier par :</p>
                    <div className='containerTrierAndTrajets_trier_ligne'>
                        <input
                            type='checkbox'
                            className='containerTrierAndTrajets_trier_ligne_checkbox'
                            checked={selectedOption === 'heureDepart'}
                            onClick={() => handleCheckboxClick('heureDepart')}
                        />
                        <p className='containerTrierAndTrajets_trier_ligne_text'>Heure de départ</p>
                    </div>
                    <div className='containerTrierAndTrajets_trier_ligne'>
                        <input
                            type='checkbox'
                            className='containerTrierAndTrajets_trier_ligne_checkbox'
                            checked={selectedOption === 'heureArrivee'}
                            onClick={() => handleCheckboxClick('heureArrivee')}
                        />
                        <p className='containerTrierAndTrajets_trier_ligne_text'>Heure d'arrivée</p>
                    </div>
                    <div className='containerTrierAndTrajets_trier_ligne'>
                        <input
                            type='checkbox'
                            className='containerTrierAndTrajets_trier_ligne_checkbox'
                            checked={selectedOption === 'numVol'}
                            onClick={() => handleCheckboxClick('numVol')}
                        />
                        <p className='containerTrierAndTrajets_trier_ligne_text'>N de vol</p>
                    </div>
                </div>
                <div className='containerTrajets'>
                    {filteredTravels.length === 0 ? (
                        <p className='containerTrajets_textNoTravels'>Aucun trajet ne correspond à votre recherche.</p>
                    ) : (
                        filteredTravels.map(travel => {
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
                    )}
                </div>
            </div>
            <div className='containerButtonAndVideo'>
                <p className='containerButtonAndVideo_text'>*Les prix sont propotionnels au nombre de passagers déjà inscrit sur le trajet .</p>
                <NavLink to="/PosterUnTrajet">
                    <button className='boutonContact'>Tu ne vois pas ton trajet ? <br></br> Organise le !</button>
                </NavLink>
                <VideoExplication />
            </div>
        </article>
    );
};

export default PageRechercherUnTrajet;