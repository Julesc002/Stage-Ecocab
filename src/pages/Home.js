import React from 'react';
import HomeMainTitles from '../components/HomeMainTitles';
import FormFindRoutes from '../components/FormFindRoutes';
import ContainerLogos from '../components/ContainerLogos';

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
                    <article>

                    </article>
                </section>
            </article>
        </div>
    );
};

export default Home;