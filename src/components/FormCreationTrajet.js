import React, { useState } from 'react';

const FormCreationTrajet = () => {

    const [start, setStart] = useState('');
    const [departureTime, setDepartureTime] = useState("");
    const [destination, setDestination] = useState("");
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
            // Effectuer l'action souhaitée
        }
    }

    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <input className='form_inputsMajeurs' type='text' placeholder="Depart ?" onChange={(e) => setStart(e.target.value)} />
                <input className='form_inputsMajeurs' type='time' value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} />
                <input className='form_inputsMajeurs' type='text' placeholder="Arrivée ?" onChange={(e) => setDestination(e.target.value)} />
                <input className='form_inputsMajeurs' type='time' value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} />
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
