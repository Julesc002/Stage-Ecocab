
import React from 'react';
import FormLoginWithEmail from '../components/FormLoginWithEmail';
import BoutonContact from '../components/BoutonContact';

const LoginWithEmail = () => {
    return (
        <div className='formLoginContainer'>
            <FormLoginWithEmail />
            <BoutonContact />
        </div>
    );
};

export default LoginWithEmail;