import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const FormFindRoutes = () => {
    const navigate = useNavigate();

    const [start, setStart] = useState("");
    const [destination, setDestination] = useState("");
    const [dateAndTime, setDateAndTime] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [flightNumber, setFlightNumber] = useState("");
    const [baggageSize, setBaggageSize] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/RechercherUnTrajet?depart='+ start + '&destination='+ destination + '&date='+ dateAndTime + '&nbPers='+ numberOfPeople + '&numVol=' + flightNumber);
    };

    return (
        <form className='FormFindRoutes' onSubmit={handleSubmit}>
            <input className="FormFindRoutes_inputTextStart" type="text" placeholder="Départ" value={start} onChange={(e) => setStart(e.target.value)} />
            <input className="FormFindRoutes_inputTextDestination" type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
            <input className="FormFindRoutes_inputDateTime" type="date" placeholder="Date et heure" value={dateAndTime} onChange={(e) => setDateAndTime(e.target.value)} />
            <input className="FormFindRoutes_inputNumberOfPeople" type="number" min="1" value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)} />
            <input className="FormFindRoutes_inputTextFlightNumber" type="text" placeholder="N° de vol (Optionnel)" value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)} />

            <select className="FormFindRoutes_selectBaggageSize" value={baggageSize} onChange={(e) => setBaggageSize(e.target.value)}>
                <option value="" disabled hidden>Taille du bagage</option>
                <option className="FormFindRoutes_selectBaggageSize_value" value="Sac à dos"> Sac à dos </option>
                <option className="FormFindRoutes_selectBaggageSize_value" value="Cabine"> Cabine </option>
                <option className="FormFindRoutes_selectBaggageSize_value" value="Soute"> Soute </option>
            </select>

            <button className="FormFindRoutes_submitButton" type="submit"> Recherchez </button>
        </form>
    );
};

export default FormFindRoutes;