import React from 'react';
import BoutonContact from '../components/BoutonContact';
import VideoExplication from '../components/VideoExplication';
import FormCreationTrajet from '../components/FormCreationTrajet';

const PosterUnTrajet = () => {
    return (
        <article className='conteneurGlobal'>
            <section className='conteneurGlobal_formContainer'>
                <FormCreationTrajet />
            </section>
            <section className='conteneurGlobal_conteneurboutonEtPlaceholder'>
                <BoutonContact />
                <VideoExplication />
            </section>
        </article>
    );
};

export default PosterUnTrajet;