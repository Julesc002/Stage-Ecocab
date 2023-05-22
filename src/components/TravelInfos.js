import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_USER_URL,  API_TRAVEL_URL} from '../config';

const TravelInfos = (props) => {

    const downArrow = "downArrowIco.svg";
    const manIco = "manIco.svg";

    const reservationButton = "Réserve ta place !"

    const [travel, setTravel] = useState([]);

    const [account, setAccount] = useState([]);

    useEffect(() => {
        axios.get(`${API_TRAVEL_URL}/` + props.id)
            .then(response => {
                setTravel(response.data.travel);
            })
            .catch(error => {
                console.log(error);
            });
    }, [props.id]);

    useEffect(() => {
        axios.get(`${API_USER_URL}/` + travel.idCompte)
            .then(response => {
                setAccount(response.data.user);
            })
            .catch(error => {
                console.log(error);
            });
    }, [travel]);

    const startTravelName = travel.lieuDepart;
    const dateDepart = new Date(travel.heureDepart);
    const startTravelTime = `${dateDepart.getHours().toString().padStart(2, '0')}h${dateDepart.getMinutes().toString().padStart(2, '0')}`;

    const endTravelName = travel.lieuArrivee;
    const dateArrivee = new Date(travel.heureArrivee);
    const endTravelTime = `${dateArrivee.getHours().toString().padStart(2, '0')}h${dateArrivee.getMinutes().toString().padStart(2, '0')}`;

    const price = "18";
    const travellers =
        [
            {
                name: account.firstName + " " + account.lastName,
                role: "Organisateur",
                flightNumber: ". Vol 1234 (Arrivée 11h50)"
            },
            {
                name: "Martin",
                role: "Voyageur",
                flightNumber: ". Vol 1276 (Arrivée 11h50)"
            }
        ];

    return (
        <div className="travelInfosContainer">
            <div className="travelInfosContainer_startTravel">
                <div className="travelInfosContainer_startTravel_travelTimeAndName"> {startTravelTime} {startTravelName} </div>
            </div>
            <div className="travelInfosContainer_middleArrowAndPrice">
                <img className='travelInfosContainer_middleArrowAndPrice_arrowIcon' src={`${process.env.PUBLIC_URL}/assets/images/${downArrow}`} alt="Fleche vers le bas" />
                <div className="travelInfosContainer_middleArrowAndPrice_priceValue"> {price} €* </div>
            </div>
            <div className="travelInfosContainer_endTravel">
                <div className="travelInfosContainer_endTravel_travelTimeAndName"> {endTravelTime} {endTravelName} </div>
            </div>
            <div className="travelInfosContainer_travellers">
                {travellers.map((traveller, index) => (
                    <div className="travelInfosContainer_travellers_traveller" key={index}>
                        <div className="travelInfosContainer_travellers_traveller_travellerInfos">
                            <img className='travelInfosContainer_travellers_traveller_travellerInfos_manIco' src={`${process.env.PUBLIC_URL}/assets/images/${manIco}`} alt="icone Monsieur" />
                            {traveller.name}
                            ({traveller.role})
                            {traveller.flightNumber}
                        </div>
                    </div>
                ))}
            </div>
            <button className='travelInfosContainer_reservationButton'> {reservationButton} </button>
        </div>
    );
};

export default TravelInfos;
