import React from 'react';
import BoutonContact from '../components/BoutonContact';
import VideoExplication from '../components/VideoExplication';
import FormCreationTrajet from '../components/FormCreationTrajet';

const PosterUnTrajet = () => {
    return (
        <article>
            <FormCreationTrajet />
            <div className='conteneurboutonEtPlaceholder'>
                <BoutonContact />
                <VideoExplication />
            </div>
        </article>
    );
};

export default PosterUnTrajet;