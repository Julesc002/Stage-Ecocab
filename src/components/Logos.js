import React from 'react';

const Logos = () => {

    const nameImageCashFirstCard = "cash.svg";
    const nameImageIdCardSecondCard = "id-card.svg";
    const nameImageValidationThirdCard = "ecology-planet-svgrepo-com.svg";

    const pFirstCard = "Avec Ecocab, réduis tes frais de transport à l’aéroport en partageant ton taxi/VTC avec d’autres voyageurs ! \n Economise jusqu'à 30€ sur tes trajets !";
    const pSecondCard = "Rentre en contact et valide les conditions de trajet avec les autres voyageurs avant de t’engager pour plus de sécurité !";
    const pThirdCard = "Notre solution permet de réduire le nombre de véhicules à moitié vides. avec ECOCAB c’est 300 voyages en taxi/VTC en moins par jour soit 72 000KG de CO2*en moins par mois !";

    return (
        <>
            <div className='homeCardLogo'>
                <img className='homeCardLogo_logoImage' src={`${process.env.PUBLIC_URL}/assets/images/${nameImageCashFirstCard}`} alt={nameImageCashFirstCard} />
                <p className='homeCardLogo_logoP'> {pFirstCard} </p>
            </div>
            <div className='homeCardLogo'>
                <img className='homeCardLogo_logoImage' src={`${process.env.PUBLIC_URL}/assets/images/${nameImageIdCardSecondCard}`} alt={nameImageIdCardSecondCard} />
                <p className='homeCardLogo_logoP'> {pSecondCard} </p>
            </div>
            <div className='homeCardLogo'>
                <img className='homeCardLogo_logoImage' src={`${process.env.PUBLIC_URL}/assets/images/${nameImageValidationThirdCard}`} alt={nameImageValidationThirdCard} />
                <p className='homeCardLogo_logoP'> {pThirdCard} </p>
            </div>
        </>
    );
};

export default Logos;