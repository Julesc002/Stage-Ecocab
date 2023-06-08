import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const FormFindRoutes = () => {
    const navigate = useNavigate();

    const [start, setStart] = useState("");
    const [destination, setDestination] = useState("");
    const [dateAndTime, setDateAndTime] = useState(new Date().toISOString().slice(0, 10));
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [displayResults, setDisplayResults] = useState(Array.from({ length: 3 }, () => false));
    const [coordinates, setCoordinates] = useState([]);
    const [startOrDestination, setStartOrDestination] = useState('');
    const [airportSelected, setAirportSelected] = useState(false);
    const [dataStart, setDataStart] = useState([]);
    const [dataDestination, setDataDestination] = useState([]);

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

    const majDisplayResults = (i) => {
        setDisplayResults((prevState) => {
            const updatedDisplayResults = [...prevState];
            updatedDisplayResults[i] = !updatedDisplayResults[i];
            return updatedDisplayResults;
        });
    };


    const majDisplayResultsOnBlur = (i) => {
        setTimeout(() => {
            setDisplayResults((prevState) => {
                const updatedDisplayResults = [...prevState];
                updatedDisplayResults[i] = false;
                return updatedDisplayResults;
            });
        }, 100);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/RechercherUnTrajet?depart=' + start + '&destination=' + destination + '&date=' + dateAndTime + '&nbPers=' + numberOfPeople + '&airport=' + startOrDestination + '&coordinates=' + coordinates);
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

    return (
        <article className="containeurFormHome">
            <section className='optionSectionHome'>
                <div className='optionSection_optionButtonsContainerHome'>
                    <button className='optionSection_optionButtonsContainer_button' onClick={() => { handleSetAirport('start'); setAirportSelected(false); setCoordinates([]) }} disabled={startOrDestination === 'start'}> Je pars d'un aéroport </button>
                    <button className='optionSection_optionButtonsContainer_button' onClick={() => { handleSetAirport('destination'); setAirportSelected(false); setCoordinates([]) }} disabled={startOrDestination === 'destination'}> Je me rends à un aéroport </button>
                </div>
            </section>
            <form className='FormFindRoutesHome' onSubmit={handleSubmit}>

                {startOrDestination === 'start' ?
                    <div className="FormFindRoutes_Recherche">
                        <input className="FormFindRoutes_Recherche_inputTextStart" type="text" placeholder="Départ" value={start} onFocus={() => majDisplayResults(0)} onBlur={() => majDisplayResultsOnBlur(0)} disabled={startOrDestination.length === 0} />
                        <div className="FormFindRoutes_Recherche_containerResultats">
                            {displayResults[0] && dataStart.map((place, index) => {
                                return <p key={index} className="FormFindRoutes_Recherche_containerResultats_Resultats" onClick={() => { setStart(dataStart[index]); setAirportSelected(true) }}> {place} </p>
                            })}
                        </div>
                    </div>
                    :
                    <div className="FormFindRoutes_Recherche">
                        <input className="FormFindRoutes_Recherche_inputTextStart" type="text" placeholder="Départ" value={start} onFocus={() => majDisplayResults(0)} onBlur={() => majDisplayResultsOnBlur(0)} onChange={(e) => handleStart(e)} disabled={startOrDestination.length === 0} />
                        <div className="FormFindRoutes_Recherche_containerResultats">
                            {displayResults[0] && dataStart.map((place, index) => {
                                return <p key={index} className="FormFindRoutes_Recherche_containerResultats_Resultats" onClick={() => { setStart(place.properties.label); setCoordinates(place.geometry.coordinates) }}> {place.properties.label} </p>
                            })}
                        </div>
                    </div>
                }

                {startOrDestination === 'destination' ?
                    <div className="FormFindRoutes_Recherche">
                        <input className="FormFindRoutes_Recherche_inputTextDestination" type="text" placeholder="Destination" value={destination} onFocus={() => majDisplayResults(1)} onBlur={() => majDisplayResultsOnBlur(1)} disabled={startOrDestination.length === 0} />
                        <div className="FormFindRoutes_Recherche_containerResultats">
                            {displayResults[1] && dataDestination.map((place, index) => {
                                return <p key={index} className="FormFindRoutes_Recherche_containerResultats_Resultats" onClick={() => { setDestination(dataDestination[index]); setAirportSelected(true) }}> {place} </p>
                            })}
                        </div>
                    </div>
                    :
                    <div className="FormFindRoutes_Recherche">
                        <input className="FormFindRoutes_Recherche_inputTextDestination" type="text" placeholder="Destination" value={destination} onFocus={() => majDisplayResults(1)} onBlur={() => majDisplayResultsOnBlur(1)} onChange={(e) => handleDestinationChange(e)} disabled={startOrDestination.length === 0} />
                        <div className="FormFindRoutes_Recherche_containerResultats">
                            {displayResults[1] && dataDestination.map((place, index) => {
                                return <p key={index} className="FormFindRoutes_Recherche_containerResultats_Resultats" onClick={() => { setDestination(place.properties.label); setCoordinates(place.geometry.coordinates) }}> {place.properties.label} </p>
                            })}
                        </div>
                    </div>
                }

                <div className="FormFindRoutes_Recherche">
                    <input className="FormFindRoutes_Recherche_inputDateTime" type="date" placeholder="Date et heure" value={dateAndTime} onChange={(e) => setDateAndTime(e.target.value)} disabled={startOrDestination.length === 0} />
                </div>
                <div className="FormFindRoutes_RechercheNbPers">
                    <input className="FormFindRoutes_Recherche_inputNumberOfPeople" type="number" min="1" value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)} disabled={startOrDestination.length === 0} />
                </div>
                <img className='FormFindRoutes_Recherche_icone' src={`${process.env.PUBLIC_URL}/assets/images/manIcoBis.svg`} alt='icone Monsieur' disabled={startOrDestination.length === 0} />
                <button className="FormFindRoutes_submitButton" type="submit" disabled={coordinates.length === 0 || !airportSelected || dateAndTime.length === 0 || numberOfPeople < 1}> Recherchez </button>
            </form>
        </article>
    );
};

export default FormFindRoutes;