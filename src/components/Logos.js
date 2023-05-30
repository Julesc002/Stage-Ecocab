import React from 'react';

const Logos = () => {

    const nameImageCashFirstCard = "cash.svg";
    const nameImageIdCardSecondCard = "id-card.svg";
    const nameImageValidationThirdCard = "validation.svg";

    const pFirstCard = "Avec Ecocab, réduis tes frais de transport à l’aéroport en partageant ton taxi/VTC avec d’autres voyageurs ! \n Economise jusqu'à 30€ sur tes trajets !";
    const pSecondCard = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo cupiditate aliquid ipsum numquam maxime harum laborum ut sunt minima rerum quaerat facilis, iusto error autem voluptatibus? Eum ea fugiat eius?";
    const pThirdCard = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo cupiditate aliquid ipsum numquam maxime harum laborum ut sunt minima rerum quaerat facilis, iusto error autem voluptatibus? Eum ea fugiat eius?";

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