import React, { useState } from "react";

const FormFindRoutes = () => {

    const [start, setStart] = useState("Départ");
    const [destination, setDestination] = useState("Destination");
    const [dateAndTime, setDateAndTime] = useState("Date et heure");
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [flightNumber, setFlightNumber] = useState("N° de vol (Optionnel)");
    const [baggageSize, setBaggageSize] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form className='FormFindRoutes' onSubmit={handleSubmit}>
            <input className="FormFindRoutes_inputTextStart" type="text" placeholder={start} onChange={(e) => setStart(e.target.value)} />
            <input className="FormFindRoutes_inputTextDestination" type="text" placeholder={destination} onChange={(e) => setDestination(e.target.value)} />
            <input className="FormFindRoutes_inputDateTime" type="datetime-local" placeholder={dateAndTime} onChange={(e) => setDateAndTime(e.target.value)} />
            <input className="FormFindRoutes_inputNumberOfPeople" type="number" min="1" value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)} />
            <input className="FormFindRoutes_inputTextFlightNumber" type="text" placeholder={flightNumber} onChange={(e) => setFlightNumber(e.target.value)} />

            <select className="FormFindRoutes_selectBaggageSize" value={baggageSize} onChange={(e) => setBaggageSize(e.target.value)}>
                <option value="" disabled hidden>Taille du bagage</option>
                <option className="FormFindRoutes_selectBaggageSize_value" value="Sac à dos">Petit</option>
                <option className="FormFindRoutes_selectBaggageSize_value" value="Cabine">Moyen</option>
                <option className="FormFindRoutes_selectBaggageSize_value" value="Soute">Grand</option>
            </select>

            <button className="FormFindRoutes_submitButton" type="submit"> Recherchez </button>
        </form>
    );
};

export default FormFindRoutes;