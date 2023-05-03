import React from 'react';

const FormContact = () => {
    return (
        <div>
            <form className='formContact'>
                <h1 className='formContact_formTitle'> Contact </h1>
                <label htmlFor='lastName' className='formContact_formLabel'> Nom </label>
                <input type="text" id="lastName" className='formContact_upperFormPart_inputText' />

                <label htmlFor='firstName' className='formContactformLabel'> Prénom </label>
                <input type="text" id="firstName" className='formContact_upperFormPart_inputText' />

                <label htmlFor='email' className='formContact_formLabel'> Email </label>
                <input type="email" id='email' className='formContact_inputEmail' />

                <div className='formContact_mailFormPart'>
                    <label htmlFor='subject' className='formContact_mailFormPart_formLabel'> Sujet </label>
                    <input type="text" id='subject' className='formContact_mailFormPart_inputText' />

                    <label htmlFor='message' className='formContact_mailFormPart_formLabel'> Message </label>
                    <textarea id='message' className='formContact_mailFormPart_textarea' />
                </div>
                <input type="submit" value="Contactez-nous !" className='formContact_inputSubmit' />
            </form>
        </div>
    );
};

export default FormContact;