import React from 'react';

const FormCreationTrajet = () => {
    return (
        <div>
            <div className='form'>
                <input className='form_inputsMajeurs' type='text' placeholder="Depart ?"/>
                <input className='form_inputsMajeurs' type='text' placeholder="Arrivée ?"/>
                <div className='form_conteneurPartieSecondaire'>
                    <div className='form_conteneurPartieSecondaire_conteneurInputs'>
                        <input className='form_conteneurPartieSecondaire_conteneurInputs_inputsSecondaires' type='text' placeholder="N°VOL ?"/>
                        <input className='form_conteneurPartieSecondaire_conteneurInputs_inputsSecondaires' type='text' placeholder="Terminal ?"/>
                    </div>
                    <input type='number' placeholder="1"/>
                </div>
                <p className='form_texte'>Economise jusqu'à 30€</p>
                <button className='form_boutonCreer'>Créer ton trajet gratuitement !</button>
            </div>
        </div>
    );
};

export default FormCreationTrajet;