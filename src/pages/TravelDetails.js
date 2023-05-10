import React from 'react';
import BoutonContact from '../components/BoutonContact';
import VideoExplication from '../components/VideoExplication';
import TravelInfos from '../components/TravelInfos';
import { useParams } from 'react-router-dom';

const TravelDetails = () => {
    const asteriskParagraph = "* Les prix peuvent varier en fonction de la situation à l'arrivée. Si vous décidez de ne pas prendre de chauffeur, vous ne serez pas débité.";

    return (
        <article className='travelDetailsArticle'>
            <section>
                <TravelInfos
                    id={useParams().id}
                />
            </section>
            <p> {asteriskParagraph} </p>
            <section className='travelDetailsArticle_contactAndExplication'>
                <BoutonContact />
                <VideoExplication />
            </section>
        </article>
    );
};

export default TravelDetails;
