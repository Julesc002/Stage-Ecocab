import React from 'react';
import HomeMainTitles from '../components/HomeMainTitles';
import FormFindRoutes from '../components/FormFindRoutes';
import ContainerLogos from '../components/ContainerLogos';
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (

        <div className='homeMain'>
            <img className='homeMain_img' src={`${process.env.PUBLIC_URL}/assets/images/imgAccueil.jpg`} alt='accueil' />
            <article className='homeMain_homeArticle'>
                <header className='homeMain_homeArticle_homeHeaderArticle'>
                    <HomeMainTitles />
                    {/* <img className='homeMain_homeArticle_homeHeaderArticle_carIcon' src={`${process.env.PUBLIC_URL}/assets/images/undraw_by_my_car_re_g0c3.svg`} alt='icone voiture' />
                    <img className='homeMain_homeArticle_homeHeaderArticle_aircraftIcon' src={`${process.env.PUBLIC_URL}/assets/images/undraw_aircraft_re_m05i.svg`} alt='icone avion' /> */}
                </header>
                <section>
                    <article className='containerForm'>
                        <FormFindRoutes />
                    </article>
                    <article>
                        <ContainerLogos />
                    </article>
                    <article className='homeMain_homeArticle_helpVideoAndContactUs'>
                        <img className='videoPlaceholderHome' src={`${process.env.PUBLIC_URL}/assets/images/${"videoPlaceholder.svg"}`} alt='Video explication placeholder' />
                        <NavLink to="/Contact" className='containerBoutonContactHome'>
                            <button className='boutonContactHome'> Contactez-nous </button>
                        </NavLink>
                    </article>
                </section>
            </article>
        </div>
    );
};

export default Home;