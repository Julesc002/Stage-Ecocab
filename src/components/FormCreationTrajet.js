import React, { useState } from 'react';
import axios from 'axios';
import { API_TRAVEL_URL } from '../config';
import { NavLink } from 'react-router-dom';
import Trajet from './Trajet';

const FormCreationTrajet = () => {

    const [steps, setSteps] = useState('selectOption'); // Variable pour 'avancer' dans le formulaire de création de trajet
    const [startOrDestination, setStartOrDestination] = useState(''); // On met à jour la variable sur 'start' ou 'destination' en fonction de si on part d'un aéroport ou si on souhaite aller à un aéroport

    const [start, setStart] = useState('');
    const [departureDate, setDepartureDate] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [destination, setDestination] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState(2);
    const [flightNumber, setFlightNumber] = useState("");
    const [baggageSize, setBaggageSize] = useState("");

    const [dateHourStart, setDateHourStart] = useState("");
    const [dateHourArrival, setDateHourArrival] = useState("");

    const [displayResults, setDisplayResults] = useState(false); // Variable pour savoir si l'application affiche ou non une recherche
    const [data, setData] = useState([]);

    const [errorMessage, setErrorMessage] = useState("");

    const [travelPosted, setTravelPosted] = useState(false);


    const handleStartChange = (e) => {
        setData([]);
        const inputValue = e.target.value;
        setStart(inputValue);
        if (inputValue.length >= 2) {
            axios.get('https://api-adresse.data.gouv.fr/search/?q=' + inputValue + ' Île-de-France')
                .then((res) => setData(res.data.features))
                .catch((error) => console.log(error))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!localStorage.getItem('isConnected')) {
            window.location.href = "/Compte";
        } else {
            setErrorMessage("");
            let missingFields = "";
            if (!start) {
                missingFields += "Départ, ";
            }
            if (!departureTime) {
                missingFields += "Heure de départ, ";
            }
            if (!destination) {
                missingFields += "Destination, ";
            }
            if (!arrivalTime) {
                missingFields += "Heure d'arrivée, ";
            }
            if (!flightNumber) {
                missingFields += "Numéro de vol, ";
            }
            if (!baggageSize) {
                missingFields += "Taille du bagage, ";
            }
            if (missingFields) {
                missingFields = missingFields.slice(0, -2); // Supprime la virgule et l'espace à la fin de la chaîne
                setErrorMessage(`Les champs suivants sont manquants: ${missingFields}`);
            } else {

                const dateHourForStart = new Date(`${departureDate}T${departureTime}:00.000+02:00`);
                const dateHourForArrival = new Date(`${arrivalDate}T${arrivalTime}:00.000+02:00`)

                setDateHourStart(dateHourForStart);
                setDateHourArrival(dateHourForArrival);

                const newTravel = {
                    heureDepart: dateHourForStart,
                    heureArrivee: dateHourForArrival,
                    lieuDepart: start,
                    lieuArrivee: destination,
                    nombreDePassagers: numberOfPeople,
                    numeroDeVol: flightNumber,
                    tailleBagage: baggageSize,
                    idCompte: localStorage.getItem('user'),
                    idVoyageurs: []
                }
                axios.post(`${API_TRAVEL_URL}`, newTravel)
                    .then(() => { setTravelPosted(true) })
                    .catch((error) => { console.log(error) });
            }
        }
    }

    if (!localStorage.getItem('isConnected')) {
        <p className='formContainer_errorMessage'> Vous devez être connecté pour créer un trajet </p>
    } else if (travelPosted) {
        return (
            <div className='commitMessageContainer'>
                <h1 className='commitMessageContainer_title'> Merci d'avoir partagé votre trajet </h1>
                <h2 className='commitMessageContainer_title'> Votre trajet a été enregistré </h2>
                <div className='commitMessageContainer_infoTravel'>
                    <Trajet
                        heureDepart={dateHourStart}
                        heureArrivee={dateHourArrival}
                        lieuDepart={start}
                        lieuArrivee={destination}
                        nombreDePassagers={numberOfPeople}
                        numeroDeVol={flightNumber}
                        tailleBagage={baggageSize}
                        idCompte={localStorage.getItem('user')}
                        nbVoyageurs={0}
                    />
                </div>
                <NavLink to="/RechercherUnTrajet" className="commitMessageContainer_navLink">
                    <button className='commitMessageContainer_navLink_button'> Accéder à la liste des trajets </button>
                </NavLink>
            </div>
        );
    }
    if (steps === 'selectOption') {
        return (
            <div className='optionsContainer'>
                <h1 className='optionsContainer_travelOptionTitle'> Je choisis mon option </h1>
                <button className='optionsContainer_travelOptionButton'
                    onClick={() => {
                        setSteps('selectAirport');
                        setStartOrDestination('start');
                    }}> Je pars d'un aéroport </button>
                <button className='optionsContainer_travelOptionButton'
                    onClick={() => {
                        setSteps('selectAirport');
                        setStartOrDestination('destination');
                    }}> Je me rends à un aéroport </button>
            </div>
        );
    } else if (steps === 'selectAirport') {
        return (
            <div className='optionsContainer'>
                <h1 className='optionsContainer_travelOptionTitle'> Je sélectionne un Aéroport </h1>
                <button className='optionsContainer_travelOptionButton'
                    onClick={() => {
                        if (startOrDestination === 'start') {
                            setStart('Aéroport de Paris-Charles de Gaulle (CDG)');
                        } else {
                            setDestination('Aéroport de Paris-Charles de Gaulle (CDG)');
                        }
                        setSteps('form');
                    }}> Paris Charles de Gaulle </button>
                <button className='optionsContainer_travelOptionButton'
                    onClick={() => {
                        if (startOrDestination === 'start') {
                            setStart('Orly Airport (ORY)');
                        } else {
                            setDestination('Orly Airport (ORY)');
                        }
                        setSteps('form');
                    }}> Paris Orly </button>
            </div>
        );
    } else if (steps === 'form') {
        return (
            <div className='formContainer'>
                <form className='formContainer_form' onSubmit={handleSubmit}>

                    <div className='formContainer_form_firstPart'>
                        <div className='formContainer_form_firstPart_inputsStartTravelContainer'>
                            {startOrDestination === 'start' ?
                                    <input className='formContainer_form_firstPart_inputsStartTravelContainer_inputStartPlace' type='text' value={start} /> 
                                :
                                    <div className=''>
                                        <input className='formContainer_form_firstPart_inputsStartTravelContainer_inputStartPlace' type='text' placeholder="Depart ?" value={start} onFocus={() => setDisplayResults(!displayResults)} onBlur={() => setTimeout(() => {setDisplayResults(false);}, 100)} onChange={(e) => handleStartChange(e)} />
                                        {displayResults && data.map((place, index) => (
                                            <p key={index} className='' onClick={() => setStart(place.properties.label)}> {place.properties.label} </p>
                                        ))}
                                    </div>
                            }

                            <input className='formContainer_form_firstPart_inputsStartTravelContainer_inputStartDate' type='datetime-local'
                                onChange={(e) => {
                                    const [dateValue, timeValue] = e.target.value.split('T');
                                    setDepartureDate(dateValue);
                                    setDepartureTime(timeValue);
                                }} />
                        </div>
                        <div className='formContainer_form_firstPart_inputsEndTravelContainer'>
                            {startOrDestination === 'destination' ? <input className='formContainer_form_firstPart_inputsEndTravelContainer_inputEndPlace' type='text' value={destination} /> : <input className='formContainer_form_firstPart_inputsEndTravelContainer_inputEndPlace' type='text' placeholder="Arrivée ?" onChange={(e) => setDestination(e.target.value)} />}
                            <input className='formContainer_form_firstPart_inputsEndTravelContainer_inputEndDate' type='datetime-local'
                                onChange={(e) => {
                                    const [dateValue, timeValue] = e.target.value.split('T');
                                    setArrivalDate(dateValue);
                                    setArrivalTime(timeValue);
                                }} />
                        </div>
                    </div>

                    <input className='formContainer_form_inputFlightNumber' type='text' placeholder="N°VOL ?" onChange={(e) => setFlightNumber(e.target.value)} />

                    <div className='formContainer_form_maxNumberOfTravelerContainer'>
                        <label className='formContainer_form_maxNumberOfTravelerContainer_maxNbTravelerLabel'> Nombre maximum de voyageurs </label>
                        <input className='formContainer_form_maxNumberOfTravelerContainer_maxNbTravelerInput' type='number' min="2" value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)} />
                    </div>

                    <select className="formContainer_form_selectBaggageSize" value={baggageSize} onChange={(e) => setBaggageSize(e.target.value)}>
                        <option value="" disabled hidden>Taille du bagage</option>
                        <option className="formContainer_form_selectBaggageSize_value" value="Sac à dos"> Sac à dos </option>
                        <option className="formContainer_form_selectBaggageSize_value" value="Cabine"> Cabine </option>
                        <option className="formContainer_form_selectBaggageSize_value" value="Soute"> Soute </option>
                    </select>

                    <p className='formContainer_form_text'> Economise jusqu'à 30€ </p>
                    <input className='formContainer_form_submitButton' type="submit" value="Créer ton trajet gratuitement !" />
                </form>
                {errorMessage !== '' ? <p className='formContainer_errorMessage'> {errorMessage} </p> : null}
            </div>
        );
    }
};

export default FormCreationTrajet;