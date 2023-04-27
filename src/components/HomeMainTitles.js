import React from 'react';

const HomeMainTitles = () => {

    const mainTitle = "Taxi et VTC trop cher pour l'aéroport ?";
    const underTitle = "Partage ta course avec d'autres voyageurs";

    return (
        <>
            <h1 className='homeMainTitle'> {mainTitle} </h1>
            <h2 className='homeUnderTitle'> {underTitle} </h2>
        </>
    );
};

export default HomeMainTitles;