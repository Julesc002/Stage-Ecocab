import React from 'react';
import { NavLink } from 'react-router-dom';

const BoutonContact = () => {
    return (
        <>
            <NavLink to="/ContactezNous">
                <button className='boutonContact'>Contactez-nous</button>
            </NavLink>
        </>
    );
};

export default BoutonContact;