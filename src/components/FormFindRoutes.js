import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const FormFindRoutes = () => {
    const navigate = useNavigate();

    const [start, setStart] = useState("");
    const [destination, setDestination] = useState("");
    const [dateAndTime, setDateAndTime] = useState(new Date().toISOString().slice(0, 10));
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [flightNumber, setFlightNumber] = useState("");
    const [baggageSize, setBaggageSize] = useState("");
    const [data, setData] = useState([]);
    const [recherche, setRecherche] = useState(Array.from({ length: 3 }, () => ""));
    const [displayResults, setDisplayResults] = useState(Array.from({ length: 3 }, () => false));
    const [dataAPI, setDataAPI] = useState([]);
    const [coordinates, setCoordinates] = useState([]);

    const majRecherche = (e, i) => {
        const updatedRecherche = [...recherche];
        updatedRecherche[i] = e.target.value;
        setRecherche(updatedRecherche);
    }

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


    useEffect(() => {
        axios
            .get("http://localhost:5000/travel/")
            .then((res) => setData(res.data.travels));
    }, []);

    const numVolFiltres = data.filter(function (travel) {
        return travel.numeroDeVol.toLowerCase().startsWith(recherche[2].toLowerCase());
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/RechercherUnTrajet?depart=' + start + '&destination=' + destination + '&date=' + dateAndTime + '&nbPers=' + numberOfPeople + '&numVol=' + flightNumber);
    };

    const handleStartChange = (e) => {
        setDataAPI([]);
        const inputValue = e.target.value;
        setStart(inputValue);
        setCoordinates([]);
        if (inputValue.length >= 2) {
            axios.get('https://api-adresse.data.gouv.fr/search/?q=' + inputValue + ' Île-de-France')
                .then((res) => setDataAPI(res.data.features))
                .catch((error) => console.log(error))
        }
    }

    const handleDestinationChange = (e) => {
        setDataAPI([]);
        const inputValue = e.target.value;
        setDestination(inputValue);
        setCoordinates([]);
        if (inputValue.length >= 2) {
            axios.get('https://api-adresse.data.gouv.fr/search/?q=' + inputValue + ' Île-de-France')
                .then((res) => setDataAPI(res.data.features))
                .catch((error) => console.log(error))
        }
    }

    return (
        <form className='FormFindRoutes' onSubmit={handleSubmit}>
            <div className="FormFindRoutes_Recherche">
                <input className="FormFindRoutes_Recherche_inputTextStart" type="text" placeholder="Départ" value={start} onFocus={() => majDisplayResults(0)} onBlur={() => majDisplayResultsOnBlur(0)} onChange={(e) => { handleStartChange(e); majRecherche(e, 0); }} />
                <div className="FormFindRoutes_Recherche_containerResultats">
                    {displayResults[0] && dataAPI.map((place, index) => {
                        return <p key={index} className="FormFindRoutes_Recherche_containerResultats_Resultats" onClick={() => { setStart(place.properties.label); setCoordinates(place.geometry.coordinates) }}> {place.properties.label} </p>
                    })}
                </div>
            </div>
            <div className="FormFindRoutes_Recherche">
                <input className="FormFindRoutes_Recherche_inputTextDestination" type="text" placeholder="Destination" value={destination} onFocus={() => majDisplayResults(1)} onBlur={() => majDisplayResultsOnBlur(1)} onChange={(e) => { handleDestinationChange(e);; majRecherche(e, 1); }} />
                <div className="FormFindRoutes_Recherche_containerResultats">
                    {displayResults[1] && dataAPI.map((place, index) => {
                        return <p key={index} className="FormFindRoutes_Recherche_containerResultats_Resultats" onClick={() => { setDestination(place.properties.label); setCoordinates(place.geometry.coordinates) }}> {place.properties.label} </p>
                    })}
                </div>
            </div>
            <div className="FormFindRoutes_Recherche">
                <input className="FormFindRoutes_Recherche_inputDateTime" type="date" placeholder="Date et heure" value={dateAndTime} onChange={(e) => setDateAndTime(e.target.value)} />
            </div>
            <div className="FormFindRoutes_Recherche">
                <input className="FormFindRoutes_Recherche_inputNumberOfPeople" type="number" min="1" value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)} />
            </div>
            <div className="FormFindRoutes_Recherche2">
                <input className="FormFindRoutes_Recherche2_inputTextFlightNumber" type="text" placeholder="N° de vol (Optionnel)" value={flightNumber} onFocus={() => majDisplayResults(2)} onBlur={() => majDisplayResultsOnBlur(2)} onChange={(e) => { setFlightNumber(e.target.value); majRecherche(e, 2); }} />
                <div className="FormFindRoutes_Recherche_containerResultats">
                    {recherche[2] !== "" && displayResults[2] && numVolFiltres.map(function (travel) {
                        return <p className="FormFindRoutes_Recherche_containerResultats_Resultats" onClick={() => setFlightNumber(travel.numeroDeVol)}>{travel.numeroDeVol}</p>;
                    })}
                </div>
            </div>
            <div className="FormFindRoutes_Recherche2">
                <select className="FormFindRoutes_Recherche2_selectBaggageSize" value={baggageSize} onChange={(e) => setBaggageSize(e.target.value)}>
                    <option value="" disabled hidden>Taille du bagage</option>
                    <option className="FormFindRoutes_Recherche2_selectBaggageSize_value" value="Sac à dos"> Sac à dos </option>
                    <option className="FormFindRoutes_Recherche2_selectBaggageSize_value" value="Cabine"> Cabine </option>
                    <option className="FormFindRoutes_Recherche2_selectBaggageSize_value" value="Soute"> Soute </option>
                </select>
            </div>
            <button className="FormFindRoutes_submitButton" type="submit"> Recherchez </button>
        </form>
    );
};

export default FormFindRoutes;