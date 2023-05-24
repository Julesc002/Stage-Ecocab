import React from 'react';

const DeleteAccountConfirmation = () => {

    return (
        <div className='deleteAccountConfirmationPopUp'>
            <h1 className='deleteAccountConfirmationPopUp_mainTitle'> Supprimer mon compte </h1>
            <p className='deleteAccountConfirmationPopUp_p'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla suscipit dolores at dolore? Deleniti, earum eius optio modi dicta voluptatem enim eos quas tenetur aspernatur ab. Assumenda natus vero beatae? </p>
            <div className='deleteAccountConfirmationPopUp_buttons'>
                <button className='deleteAccountConfirmationPopUp_buttons_deleteBtn'> Supprimer le compte </button>
                <button className='deleteAccountConfirmationPopUp_buttons_cancelBtn'> Annuler </button>
            </div>
        </div>
    );
};

export default DeleteAccountConfirmation;