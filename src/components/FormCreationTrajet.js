import React, { useState } from 'react';
import axios from 'axios';
import { API_TRAVEL_URL } from '../config';

const FormCreationTrajet = () => {

    const [start, setStart] = useState('');
    const [departureDate, setDepartureDate] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [destination, setDestination] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [flightNumber, setFlightNumber] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
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
        if (missingFields) {
            missingFields = missingFields.slice(0, -2); // Supprime la virgule et l'espace à la fin de la chaîne
            setErrorMessage(`Les champs suivants sont manquants: ${missingFields}`);
        } else {

            const startDate = new Date(departureDate);
            const startTime = new Date(`1970-01-01T${departureTime}:00.000+01:00`);
            const startYear = startDate.getFullYear();
            const startMonth = startDate.getMonth();
            const startDay = startDate.getDate();
            const startHours = startTime.getUTCHours();
            const startMin = startTime.getMinutes();
            const dateHourStart = new Date(startYear, startMonth, startDay, startHours, startMin);

            const endDate = new Date(arrivalDate);
            const endTime = new Date(`1970-01-01T${arrivalTime}:00.000+01:00`);
            const arrivalYear = endDate.getFullYear();
            const arrivalMonth = endDate.getMonth();
            const arrivalDay = endDate.getDate();
            const arrivalHours = endTime.getUTCHours();
            const arrivalMin = endTime.getMinutes();
            const dateHourArrival = new Date(arrivalYear, arrivalMonth, arrivalDay, arrivalHours, arrivalMin);

            const newTravel = {
                heureDepart: dateHourStart,
                heureArrivee: dateHourArrival,
                lieuDepart: start,
                lieuArrivee: destination,
                nombreDePassagers: numberOfPeople,
                numeroDeVol: flightNumber,
                idCompte: "A changer plus tard",
                idVoyageurs: []
            }
            console.log(newTravel);
            axios.post(`${API_TRAVEL_URL}`, newTravel)
                .then((res) => { console.log(res) })
                .catch((error) => { console.log(error) });
        }
    }

    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <input className='form_inputsMajeurs' type='text' placeholder="Depart ?" onChange={(e) => setStart(e.target.value)} />
                <input className='form_inputsMajeurs' type='datetime-local'
                    onChange={(e) => {
                        const [dateValue, timeValue] = e.target.value.split('T');
                        setDepartureDate(dateValue);
                        setDepartureTime(timeValue);
                    }} />
                <input className='form_inputsMajeurs' type='text' placeholder="Arrivée ?" onChange={(e) => setDestination(e.target.value)} />
                <input className='form_inputsMajeurs' type='datetime-local'
                    onChange={(e) => {
                        const [dateValue, timeValue] = e.target.value.split('T');
                        setArrivalDate(dateValue);
                        setArrivalTime(timeValue);
                    }} />
                <div className='form_conteneurPartieSecondaire'>
                    <div className='form_conteneurPartieSecondaire_conteneurInputs'>
                        <input className='form_conteneurPartieSecondaire_conteneurInputs_inputsSecondaires' type='text' placeholder="N°VOL ?" onChange={(e) => setFlightNumber(e.target.value)} />
                        {/* <input className='form_conteneurPartieSecondaire_conteneurInputs_inputsSecondaires' type='text' placeholder="Terminal ?" /> */}
                    </div>
                    <input className='form_conteneurPartieSecondaire_inputNumber' type='number' min="1" value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)} />
                </div>
                <p className='form_texte'> Economise jusqu'à 30€ </p>
                <input className='form_boutonCreer' type="submit" value="Créer ton trajet gratuitement !" />
                {errorMessage !== '' ? <p className='errorMessage'> {errorMessage} </p> : null}
            </form>
        </div>
    );
};

export default FormCreationTrajet;
