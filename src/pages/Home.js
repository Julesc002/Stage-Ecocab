import React from 'react';
import HomeMainTitles from '../components/HomeMainTitles';
import FormFindRoutes from '../components/FormFindRoutes';
import ContainerLogos from '../components/ContainerLogos';
import VideoExplication from '../components/VideoExplication';
import BoutonContact from '../components/BoutonContact';

const Home = () => {
    return (
        <div className='homeMain'>
            <article className='homeMain_homeArticle'>
                <header className='homeMain_homeArticle_homeHeaderArticle'>
                    <HomeMainTitles />
                    <img className='homeMain_homeArticle_homeHeaderArticle_carIcon' src={`${process.env.PUBLIC_URL}/assets/images/undraw_by_my_car_re_g0c3.svg`} alt='icone voiture' />
                    <img className='homeMain_homeArticle_homeHeaderArticle_aircraftIcon' src={`${process.env.PUBLIC_URL}/assets/images/undraw_aircraft_re_m05i.svg`} alt='icone avion' />
                </header>
                <section>
                    <article>
                        <FormFindRoutes />
                    </article>
                    <article>
                        <ContainerLogos />
                    </article>
                    <article className='homeMain_homeArticle_helpVideoAndContactUs'>
                        <VideoExplication />
                        <BoutonContact />
                    </article>
                </section>
            </article>
        </div>
    );
};

export default Home;