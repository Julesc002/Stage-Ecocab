import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const FormFindRoutes = () => {
    const navigate = useNavigate();

    const [start, setStart] = useState("");
    const [destination, setDestination] = useState("");
    const [dateAndTime, setDateAndTime] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [flightNumber, setFlightNumber] = useState("");
    const [baggageSize, setBaggageSize] = useState("");
    const [data, setData] = useState([]);
    const [recherche, setRecherche] = useState(Array.from({ length: 3 }, () => ""));
    const [displayResults, setDisplayResults] = useState(Array.from({ length: 3 }, () => false));

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


    const lieuxDepartFiltres = data.filter(function (travel) {
        return travel.lieuDepart.toLowerCase().startsWith(recherche[0].toLowerCase());
    });

    const lieuxArriveeFiltres = data.filter(function (travel) {
        return travel.lieuArrivee.toLowerCase().startsWith(recherche[1].toLowerCase());
    });

    const numVolFiltres = data.filter(function (travel) {
        return travel.numeroDeVol.toLowerCase().startsWith(recherche[2].toLowerCase());
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/RechercherUnTrajet?depart=' + start + '&destination=' + destination + '&date=' + dateAndTime + '&nbPers=' + numberOfPeople + '&numVol=' + flightNumber);
    };

    return (
        <form className='FormFindRoutes' onSubmit={handleSubmit}>
            <div className="FormFindRoutes_Recherche">
                <input className="FormFindRoutes_Recherche_inputTextStart" type="text" placeholder="Départ" value={start} onFocus={() => majDisplayResults(0)} onBlur={() => majDisplayResultsOnBlur(0)} onChange={(e) => { setStart(e.target.value); majRecherche(e, 0); }} />
                <div className="FormFindRoutes_Recherche_containerResultats">
                    {recherche[0] !== "" && displayResults[0] && lieuxDepartFiltres.map(function (travel) {
                        return <p className="FormFindRoutes_Recherche_containerResultats_Resultats" onClick={() => setStart(travel.lieuDepart)}>{travel.lieuDepart}</p>;
                    })}
                </div>
            </div>
            <div className="FormFindRoutes_Recherche">
                <input className="FormFindRoutes_Recherche_inputTextDestination" type="text" placeholder="Destination" value={destination} onFocus={() => majDisplayResults(1)} onBlur={() => majDisplayResultsOnBlur(1)} onChange={(e) => { setDestination(e.target.value); majRecherche(e, 1); }} />
                <div className="FormFindRoutes_Recherche_containerResultats">
                    {recherche[1] !== "" && displayResults[1] && lieuxArriveeFiltres.map(function (travel) {
                        return <p className="FormFindRoutes_Recherche_containerResultats_Resultats" onClick={() => setDestination(travel.lieuArrivee)}>{travel.lieuArrivee}</p>;
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