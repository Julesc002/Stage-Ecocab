import React from 'react';

const HowDoesThisWork = () => {

    const title1 = "Comment ça marche ?";
    const title2 = "H1";
    const title3 = "H2";
    const title4 = "Vidéo ?";


    return (
        <section className='howDoesThisWorkSection'>
            <h1> {title1} </h1>
            <h1> {title2} </h1>
            <h1> {title3} </h1>
            <h1> {title4} </h1>
        </section>
    );
};

export default HowDoesThisWork;