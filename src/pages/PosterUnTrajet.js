import React from 'react';
import BoutonContact from '../components/BoutonContact';
import VideoExplication from '../components/VideoExplication';
import FormCreationTrajet from '../components/FormCreationTrajet';

const PosterUnTrajet = () => {
    return (
        <article className='conteneurGlobal'>
            <FormCreationTrajet />
            <div className='conteneurGlobal_conteneurboutonEtPlaceholder'>
                <BoutonContact />
                <VideoExplication />
            </div>
        </article>
    );
};

export default PosterUnTrajet;