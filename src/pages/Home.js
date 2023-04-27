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