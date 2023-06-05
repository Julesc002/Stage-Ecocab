import React from 'react';
import BoutonContact from '../components/BoutonContact';
import VideoExplication from '../components/VideoExplication';
import FormCreationTrajet from '../components/FormCreationTrajet';

const PosterUnTrajet = () => {
    return (
        <article className='conteneurGlobal'>
            <section className='conteneurGlobal_formContainer'>
                <FormCreationTrajet />
                <img className='conteneurGlobal_formContainer_carIcon' src={`${process.env.PUBLIC_URL}/assets/images/undraw_by_my_car_re_g0c3.svg`} alt='icone voiture' />
                <img className='conteneurGlobal_formContainer_aircraftIcon' src={`${process.env.PUBLIC_URL}/assets/images/undraw_aircraft_re_m05i.svg`} alt='icone avion' />
            </section>
            <section className='conteneurGlobal_conteneurboutonEtPlaceholder'>
                <BoutonContact />
                <VideoExplication />
            </section>
        </article>
    );
};

export default PosterUnTrajet;