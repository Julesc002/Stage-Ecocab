import VideoExplication from '../components/VideoExplication';
import { NavLink } from 'react-router-dom';
import Trajet from '../components/Trajet';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_TRAVEL_URL, OPENROUTE_URL } from '../config';
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
    const [premiereRecherche, setPremiereRecherche] = useState(true); // sert à savoir si une recherche n'a pas encore été effectuée pour l'affichage d'un message d'information

    const [startOrDestination, setStartOrDestination] = useState(''); // On met à jour la variable sur 'start' ou 'destination' en fonction de si on part d'un aéroport ou si on souhaite aller à un aéroport

    const [displayResultsStart, setDisplayResultsStart] = useState(false);
    const [displayResultsDestination, setDisplayResultsDestination] = useState(false);
    const [dataStart, setDataStart] = useState([]);
    const [dataDestination, setDataDestination] = useState([]);
    const [airportSelected, setAirportSelected] = useState(false);
    const [firstAutoSearch, setFirstAutoSearch] = useState(true);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        setPremiereRecherche(false);
        const travelSearched = {
            heureDepart: date,
            lieuDepart: start,
            lieuArrivee: destination,
            whereIsAirport: startOrDestination,
            nbPersonnes: numberOfPeople
        }

        const coordinatesTravels = [coordinates];
        const travelsRes = [];

        axios.get(`${API_TRAVEL_URL}/`, { params: travelSearched })
            .then((travels) => {
                if (travels.data.length === 0) {
                    setTravels([]);
                    return;
                }

                travels.data.travels.forEach((travel) => {
                    const { coordinates } = travel;
                    coordinatesTravels.push(coordinates);
                    travelsRes.push(travel);
                })
                axios.post(`${OPENROUTE_URL}`, {
                    locations: coordinatesTravels,
                    metrics: ['distance']
                }, {
                    headers: {
                        'Authorization': '5b3ce3597851110001cf6248ad8405df1652406a897dfbf5f1b9beef',
                    }
                })
                    .then((response) => {
                        const distances = response.data.distances[0];
                        // On enlève la première valeur du tableau car c'est une comparaison de la distance du point avec lui même
                        distances.shift();
                        // Créer un tableau d'objets contenant à la fois les distances et les indices des trajets
                        const travelsWithDistances = distances.map((distance, index) => ({ distance, index }));
                        // Trier le tableau d'objets en fonction des distances
                        travelsWithDistances.sort((a, b) => a.distance - b.distance);
                        // Récupérer les indices triés
                        const sortedIndexs = travelsWithDistances.map((travelsWithDistances) => travelsWithDistances.index);
                        // Utiliser les indices triés pour accéder aux trajets associés
                        const sortedTravels = sortedIndexs.map((index) => {
                            const travel = travelsRes[index];
                            const distance = distances[index];
                            return { travel, distance };
                        });
                        setTravels(sortedTravels);
                    })
                    .catch((error) => { console.log(error); setTravels([]) })
            })
            .catch((err) => console.log(err))
    }, [start, destination, date, coordinates, setTravels, numberOfPeople, startOrDestination]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        if (searchParams.get('depart')) {
            setStart(searchParams.get('depart'));
            setDestination(searchParams.get('destination'));
            setDate(searchParams.get('date'));
            if (searchParams.get('airport') === 'start') {
                setStartOrDestination('start');
                setDataStart(['Aéroport de Paris-Charles de Gaulle (CDG)', 'Orly Airport (ORY)']);
                setDataDestination([]);
            } else {
                setStartOrDestination('destination');
                setDataDestination(['Aéroport de Paris-Charles de Gaulle (CDG)', 'Orly Airport (ORY)']);
                setDataStart([]);
            }
            setAirportSelected(true);
            setCoordinates(searchParams.get('coordinates').split(",").map(Number));
        }
    }, [location.search]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        if (start && destination && date && airportSelected && coordinates && searchParams.get('depart') && firstAutoSearch) {
            setFirstAutoSearch(false);
            handleSubmit({ preventDefault: () => { } });
        }
    }, [start, destination, date, airportSelected, coordinates, firstAutoSearch, handleSubmit, location.search]);




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
        const inputValue = e.target.value;
        setStart(inputValue);
        setCoordinates([]);
        if (inputValue.length >= 2) {
            axios.get('https://api-adresse.data.gouv.fr/search/?q=' + inputValue)
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
            axios.get('https://api-adresse.data.gouv.fr/search/?q=' + inputValue)
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

    const filteredTravels = () => {
        const sortedTravels = [...travels]; // Création d'une copie du tableau `travels`
        return sortedTravels.sort((a, b) => {
            if (selectedOption === 'heureDepart') {
                return new Date(a.travel.heureDepart) - new Date(b.travel.heureDepart);
            } else if (selectedOption === 'heureArrivee') {
                return new Date(a.travel.heureArrivee) - new Date(b.travel.heureArrivee);
            } else if (selectedOption === 'numVol') {
                return a.travel.numeroDeVol.localeCompare(b.travel.numeroDeVol);
            } else {
                return 0;
            }
        })
    };


    return (
        <article>
            <img className='aircraftIcon' src={`${process.env.PUBLIC_URL}/assets/images/undraw_aircraft_re_m05i.svg`} alt='icone avion' />
            <section className='optionSection'>
                <div className='optionSection_optionButtonsContainer'>
                    <button className='optionSection_optionButtonsContainer_button' onClick={() => { handleSetAirport('start'); setAirportSelected(false); setCoordinates([]) }} disabled={startOrDestination === 'start'}> Je pars d'un aéroport </button>
                    <button className='optionSection_optionButtonsContainer_button' onClick={() => { handleSetAirport('destination'); setAirportSelected(false); setCoordinates([]) }} disabled={startOrDestination === 'destination'}> Je me rends à un aéroport </button>
                </div>
            </section>

            <form className='FormFindRoutes' onSubmit={handleSubmit}>

                {startOrDestination === 'start' ?
                    <div className="FormFindRoutes_Recherche">
                        <input className="FormFindRoutes_Recherche_inputTextStart" type="text" placeholder="Départ" value={start} onFocus={() => setDisplayResultsStart(!displayResultsStart)} onBlur={() => setTimeout(() => { setDisplayResultsStart(false); }, 100)} disabled={startOrDestination.length === 0} />
                        <div className='FormFindRoutes_Recherche_containerResultats'>
                            {displayResultsStart && dataStart.map((place, index) => (
                                <p key={index} className='FormFindRoutes_Recherche_containerResultats_Resultats' onClick={() => { setStart(dataStart[index]); setAirportSelected(true) }}> {place} </p>
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
                                <p key={index} className='FormFindRoutes_Recherche_containerResultats_Resultats' onClick={() => { setDestination(dataDestination[index]); setAirportSelected(true) }}> {place} </p>
                            ))}
                        </div>
                    </div>
                    :
                    <div className="FormFindRoutes_Recherche">
                        <input className="FormFindRoutes_Recherche_inputTextDestination" type="text" placeholder="Destination" value={destination} onFocus={() => setDisplayResultsDestination(!displayResultsDestination)} onBlur={() => setTimeout(() => { setDisplayResultsDestination(false); }, 100)} onChange={(e) => handleDestinationChange(e)} disabled={startOrDestination.length === 0} />
                        <div className='FormFindRoutes_Recherche_containerResultats'>
                            {displayResultsDestination && dataDestination.map((place, index) => (
                                <p key={index} className='FormFindRoutes_Recherche_containerResultats_Resultats' onClick={() => { setDestination(place.properties.label); setCoordinates(place.geometry.coordinates) }}> {place.properties.label} </p>
                            ))}
                        </div>
                    </div>
                }



                <div className="FormFindRoutes_Recherche">
                    <input className="FormFindRoutes_Recherche_inputDateTime" type="date" placeholder="Date et heure" value={date} onChange={(e) => setDate(e.target.value)} disabled={startOrDestination.length === 0} />
                </div>
                <div className="FormFindRoutes_RechercheNbPers">
                    <input className="FormFindRoutes_Recherche_inputNumberOfPeople" type="number" min="1" value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)} disabled={startOrDestination.length === 0} />
                </div>
                <img className='FormFindRoutes_Recherche_icone' src={`${process.env.PUBLIC_URL}/assets/images/manIcoBis.svg`} alt='icone Monsieur' disabled={startOrDestination.length === 0} />
                <button className="FormFindRoutes_submitButton" type="submit" disabled={coordinates.length === 0 || !airportSelected || date.length === 0 || numberOfPeople < 1}> Recherchez </button>
            </form>

            <div className='containerTrierAndTrajets'>

                <div className='containerTrierAndExplications'>
                    <div className='containerTrierAndExplications_explications'>
                        <div className='containerTrierAndExplications_explications_circleAndMessage'>
                            <div class="containerTrierAndExplications_explications_greenCircle" />
                            <p className='containerTrierAndExplications_explications_text'> -1km </p>
                        </div>
                        <div className='containerTrierAndExplications_explications_circleAndMessage'>
                            <div class="containerTrierAndExplications_explications_orangeCircle" />
                            <p className='containerTrierAndExplications_explications_text'> -3km </p>
                        </div>
                        <div className='containerTrierAndExplications_explications_circleAndMessage'>
                            <div class="containerTrierAndExplications_explications_redCircle" />
                            <p className='containerTrierAndExplications_explications_text'> +3km </p>
                        </div>
                    </div>
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
                </div>

                <div className='containerTrajets'>
                    {premiereRecherche ? (
                        <p className='containerTrajets_textNoTravels'> Veuillez effectuer une recherche. </p>
                    ) : (
                        filteredTravels().length === 0 ? (
                            <p className='containerTrajets_textNoTravels'> Aucun trajet ne correspond à votre recherche. </p>
                        ) : (
                            filteredTravels().map(travel => {
                                return (
                                    <Trajet
                                        id={travel.travel._id}
                                        heureDepart={travel.travel.heureDepart}
                                        heureArrivee={travel.travel.heureArrivee}
                                        lieuDepart={travel.travel.lieuDepart}
                                        lieuArrivee={travel.travel.lieuArrivee}
                                        nombreDePassagers={travel.travel.nombreDePassagers}
                                        numeroDeVol={travel.travel.numeroDeVol}
                                        idCompte={travel.travel.idCompte}
                                        nbVoyageurs={travel.travel.idVoyageurs.length + travel.travel.idVoyageursInscrits.length}
                                        distance={travel.distance}
                                        whereIsAirport={startOrDestination}
                                        voyageurs={travel.travel.idVoyageurs.concat(travel.travel.idVoyageursInscrits)}
                                    />
                                );
                            })
                        )
                    )}
                </div>
            </div>

            <div className='containerButtonAndVideo'>
                <p className='containerButtonAndVideo_text'>*Les prix sont propotionnels au nombre de passagers déjà inscrit sur le trajet .</p>
                <NavLink to="/PosterUnTrajet">
                    <button className='boutonContact'>Tu ne vois pas ton trajet ? <br /> Organise le ! </button>
                </NavLink>
                <VideoExplication />
            </div>
        </article>
    );
};

export default PageRechercherUnTrajet;