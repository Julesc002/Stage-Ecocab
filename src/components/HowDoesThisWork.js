import React from 'react';

const HowDoesThisWork = () => {

    const title1 = "Comment ça marche avec ECOCAB ?";
    const title2 = "Pour les organisateurs de voyage :";
    const title3 = "Pour les co-voyageurs :";
    const title4 = "Validation des co-voyageurs :";


    return (
        <section className='howDoesThisWorkSection'>
            <h1> {title1} </h1>
            <p>ECOCAB est une plateforme de covoiturage de taxi et VTC qui facilite vos trajets vers l'aéroport. Suivez ces étapes simples pour organiser votre voyage en covoiturage ou vous pré-inscrire en tant que co-voyageur.</p>
            <h1> {title2} </h1>
            <ul>
                <li>1. Rendez-vous sur notre webapp ECOCAB.</li>
                <li>2. Connectez-vous ou créez un compte en utilisant votre adresse e-mail.</li>
                <li>3. Sélectionnez le point de départ, le point d'arrivée, la date, l'heure et le nombre de voyageurs pour votre trajet vers l'aéroport.</li>
                <li>4. Indiquez les informations sur les bagages que vous êtes prêt à accepter.</li>
                <li>5. Publiez votre trajet sur la plateforme ECOCAB.</li>
            </ul>
            <h1> {title3} </h1>
            <ul>
                <li>1. Accédez à la webapp ECOCAB.</li>
                <li>2. Parcourez les trajets disponibles vers l'aéroport.</li>
                <li>3. Sélectionnez le trajet qui correspond à vos besoins et cliquez sur "Se pré-inscrire".</li>
                <li>4. Fournissez votre nom, prénom, numéro de téléphone et adresse e-mail pour vous pré-inscrire.</li>
                <li>5. Attendez que l'organisateur du voyage examine votre demande.</li>
            </ul>
            <h1> {title4} </h1>
            <ul>
                <li>L'organisateur du voyage recevra une notification par e-mail concernant votre pré-inscription.</li>
                <li>L'organisateur examinera votre profil et prendra une décision concernant votre participation.</li>
                <li>Si l'organisateur valide votre demande, vous recevrez une notification par e-mail avec les détails du voyage.</li>
                <li>Si l'organisateur refuse votre demande, vous en serez également informé par e-mail.</li>
            </ul>
            <h1> Contact et accord entre les co-voyageurs : </h1>
            <ul>
                <li>1. Une fois que vous avez été validé par l'organisateur, vous pouvez utiliser les informations de contact fournies pour vous mettre d'accord sur les détails du voyage.</li>
                <li>2. Utilisez le numéro de téléphone ou l'e-mail pour communiquer avec l'organisateur et les autres co-voyageurs.</li>
                <li>3. Discutez des horaires, des lieux de rendez-vous et de tout autre détail pertinent pour assurer un voyage confortable.</li>
            </ul>
            <h1> </h1>
            <p>ECOCAB facilite la mise en relation des voyageurs partageant le même trajet vers l'aéroport, vous permettant ainsi de réduire les coûts et de rendre votre voyage plus agréable.</p>
            <p>Veuillez noter que, pour le moment, ECOCAB ne facture aucun frais pour l'utilisation de la plateforme. Profitez donc de nos services de covoiturage vers l'aéroport sans frais supplémentaires.</p>
            <p>Rejoignez la communauté ECOCAB dès aujourd'hui et simplifiez vos trajets vers l'aéroport en bénéficiant d'un covoiturage pratique et économique !</p>
        </section>
    );
};

export default HowDoesThisWork;