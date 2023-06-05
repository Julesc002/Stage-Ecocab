import React from 'react';
import FormCreateAccount from '../components/FormCreateAccount';
import BoutonContact from '../components/BoutonContact';

const CreateAccount = () => {
    return (
        <div className='formCreateAccountContainer'>
            <FormCreateAccount />
            <img className='formCreateAccountContainer_carIcon' src={`${process.env.PUBLIC_URL}/assets/images/undraw_by_my_car_re_g0c3.svg`} alt='icone voiture' />
            <img className='formCreateAccountContainer_aircraftIcon' src={`${process.env.PUBLIC_URL}/assets/images/undraw_aircraft_re_m05i.svg`} alt='icone avion' />
            <BoutonContact />
        </div>
    );
};

export default CreateAccount;