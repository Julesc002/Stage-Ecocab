import React from 'react';

const Logos = () => {

    const nameImageCashFirstCard = "cash.svg";
    const nameImageIdCardSecondCard = "id-card.svg";
    const nameImageValidationThirdCard = "validation.svg";

    const pFirstCard = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo cupiditate aliquid ipsum numquam maxime harum laborum ut sunt minima rerum quaerat facilis, iusto error autem voluptatibus? Eum ea fugiat eius?";
    const pSecondCard = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo cupiditate aliquid ipsum numquam maxime harum laborum ut sunt minima rerum quaerat facilis, iusto error autem voluptatibus? Eum ea fugiat eius?";
    const pThirdCard = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo cupiditate aliquid ipsum numquam maxime harum laborum ut sunt minima rerum quaerat facilis, iusto error autem voluptatibus? Eum ea fugiat eius?";

    return (
        <>
            <div className='homeCardLogo'>
                <img className='homeCardLogo_logoImage' src={`${process.env.PUBLIC_URL}/assets/images/${nameImageCashFirstCard}`} alt="" />
                <p className='homeCardLogo_logoP'> {pFirstCard} </p>
            </div>
            <div className='homeCardLogo'>
                <img className='homeCardLogo_logoImage' src={`${process.env.PUBLIC_URL}/assets/images/${nameImageIdCardSecondCard}`} alt="" />
                <p className='homeCardLogo_logoP'> {pSecondCard} </p>
            </div>
            <div className='homeCardLogo'>
                <img className='homeCardLogo_logoImage' src={`${process.env.PUBLIC_URL}/assets/images/${nameImageValidationThirdCard}`} alt="" />
                <p className='homeCardLogo_logoP'> {pThirdCard} </p>
            </div>
        </>
    );
};

export default Logos;