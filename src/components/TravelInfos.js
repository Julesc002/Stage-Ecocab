import React from 'react';

const TravelInfos = () => {

    const downArrow = "downArrowIco.svg";
    const manIco = "manIco.svg";

    const startTravelName = "Orly";
    const startTravelTime = "12h";

    const endTravelName = "République";
    const endTravelTime = "12h35";

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
        </div>
    );
};

export default TravelInfos;
