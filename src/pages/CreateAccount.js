import React from 'react';
import FormCreateAccount from '../components/FormCreateAccount';
import BoutonContact from '../components/BoutonContact';

const CreateAccount = () => {
    return (
        <div className='formCreateAccountContainer'>
            <FormCreateAccount />
            <BoutonContact />
        </div>
    );
};

export default CreateAccount;