import React, { useState } from 'react';
import axios from 'axios';
import { API_TRAVEL_URL } from '../config';
import { NavLink } from 'react-router-dom';
import Trajet from './Trajet';

const FormCreationTrajet = () => {

    const [start, setStart] = useState('');
    const [departureDate, setDepartureDate] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [destination, setDestination] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [flightNumber, setFlightNumber] = useState("");
    const [baggageSize, setBaggageSize] = useState("");

    const [dateHourStart, setDateHourStart] = useState("");
    const [dateHourArrival, setDateHourArrival] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const [travelPosted, setTravelPosted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!localStorage.getItem('isConnected')) {
            setErrorMessage("Vous devez être connecté pour créer un trajet");
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
    if (travelPosted) {
        return (
            <div className='commitMessageContainer'>
                <h1 className='commitMessageContainer_title'> Merci d'avoir partagé votre trajet </h1>
                <h2 className='commitMessageContainer_title'> Votre trajet a été enregistré </h2>
                <div className='commitMessageContainer_infoTravel'>
                    {/* A faire : récupérer l'id du trajet depuis la BDD pour pourvoir cliquer sur la card Trajet */}
                    <Trajet
                        heureDepart={dateHourStart}
                        heureArrivee={dateHourArrival}
                        lieuDepart={start}
                        lieuArrivee={destination}
                        nombreDePassagers={numberOfPeople}
                        numeroDeVol={flightNumber}
                        tailleBagage={baggageSize}
                        idCompte={""}
                    />
                </div>
                <NavLink to="/RechercherUnTrajet" className="commitMessageContainer_navLink">
                    <button className='commitMessageContainer_navLink_button'> Accéder à la liste des trajets </button>
                </NavLink>
            </div>
        );
    } else {
        return (
            <div className='formContainer'>
                <form className='formContainer_form' onSubmit={handleSubmit}>

                    <div className='formContainer_form_firstPart'>
                        <div className='formContainer_form_firstPart_inputsStartTravelContainer'>
                            <input className='formContainer_form_firstPart_inputsStartTravelContainer_inputStartPlace' type='text' placeholder="Depart ?" onChange={(e) => setStart(e.target.value)} />
                            <input className='formContainer_form_firstPart_inputsStartTravelContainer_inputStartDate' type='datetime-local'
                                onChange={(e) => {
                                    const [dateValue, timeValue] = e.target.value.split('T');
                                    setDepartureDate(dateValue);
                                    setDepartureTime(timeValue);
                                }} />
                        </div>
                        <div className='formContainer_form_firstPart_inputsEndTravelContainer'>
                            <input className='formContainer_form_firstPart_inputsEndTravelContainer_inputEndPlace' type='text' placeholder="Arrivée ?" onChange={(e) => setDestination(e.target.value)} />
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
                        <input className='formContainer_form_maxNumberOfTravelerContainer_maxNbTravelerInput' type='number' min="1" value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)} />
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
