import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TravelInfos = (props) => {

    const downArrow = "downArrowIco.svg";
    const manIco = "manIco.svg";

    const reservationButton = "Réserve ta place !"

    const [travel, setTravel] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/travel/' + props.id)
            .then(response => {
                setTravel(response.data.travel);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

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
                name: "Romain",
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
