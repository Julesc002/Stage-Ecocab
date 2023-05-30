import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_USER_URL, API_TRAVEL_URL } from '../config';

const TravelInfos = (props) => {

  const downArrow = "downArrowIco.svg";
  const manIco = "manIco.svg";
  const reservationButton = "Réserve ta place !"

  // Créez un objet Date représentant la date actuelle
  const currentDate = new Date();

  const [travel, setTravel] = useState([]);
  const [account, setAccount] = useState([]);

  useEffect(() => {
    axios.get(`${API_TRAVEL_URL}/` + props.id)
      .then(response => {
        setTravel(response.data.travel);
      })
      .catch(error => {
        console.log(error);
      });
  }, [props.id]);

  const startTravelName = travel.lieuDepart;
  const dateDepart = new Date(travel.heureDepart);
  const startTravelTime = `${dateDepart.getHours().toString().padStart(2, '0')}h${dateDepart.getMinutes().toString().padStart(2, '0')}`;
  const jourDepart = `${dateDepart.getDate()}/${(dateDepart.getMonth() + 1)}/${dateDepart.getFullYear()}`;

  const endTravelName = travel.lieuArrivee;
  const dateArrivee = new Date(travel.heureArrivee);
  const endTravelTime = `${dateArrivee.getHours().toString().padStart(2, '0')}h${dateArrivee.getMinutes().toString().padStart(2, '0')}`;

  const price = "18";
  const [travellers, setTravellers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (travel && travel.idCompte) {
        try {
          const response = await axios.get(`${API_USER_URL}/id/` + travel.idCompte);
          setAccount(response.data.user);
        } catch (error) {
          console.log(error);
        }
      }

      if (travel && travel.idVoyageurs) {
        try {
          const promises = travel.idVoyageurs.map(userId =>
            axios.get(`${API_USER_URL}/id/${userId}`)
          );

          const responses = await Promise.all(promises);
          const fetchedUsers = responses.map(response => response.data.user);

          const updatedTravellers = [
            {
              name: `${account.firstName ? account.firstName + " " : ''}${account.lastName ? account.lastName : ''}`,
              role: "Organisateur",
              flightNumber: " Vol " + travel.numeroDeVol
            },
            ...fetchedUsers.map(user => ({
              name: user.firstName + " " + user.lastName,
              role: "Voyageur",
              flightNumber: ""
            }))
          ];

          setTravellers(updatedTravellers);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUsers();
  }, [travel, account]);

  const [errorMsg, setErrorMsg] = useState('');

  const inscriptionTrajet = (e) => {
    e.preventDefault();
    if (travel.idVoyageurs.length + 1 === travel.nombreDePassagers) {
      setErrorMsg('Ce trajet est complet');
    } else if (!localStorage.getItem('isConnected')) {
      setErrorMsg('Vous devez être connecté pour vous inscrire à un trajet');
    } else if (localStorage.getItem('user') === travel.idCompte || travel.idVoyageurs.includes(localStorage.getItem('user'))) {
      setErrorMsg('Vous êtes déjà inscrit à ce trajet');
<<<<<<< HEAD
    } else if (dateDepart < currentDate) {
=======
    } else if (travel.heureDepart < currentDate) {
>>>>>>> 995d8c2254f53ef3d4d0ce4c1b2e5ee812472200
      setErrorMsg('Le trajet sélectionné est en cours ou terminé')
    } else {
      setErrorMsg('');

      axios.put(`${API_TRAVEL_URL}/` + props.id + '/user/' + localStorage.getItem('user'))
        .then(response => {
          console.log(response.data.user);
        })
        .catch(error => {
          console.log(error);
        });

      window.location.reload();
    }
  };

  return (
    <>
      <div className="travelInfosContainer">
        <div className="travelInfosContainer_startTravel">
          <div className="travelInfosContainer_startTravel_travelTimeAndName"> {startTravelTime} {startTravelName} - {jourDepart} </div>
        </div>
        <div className="travelInfosContainer_middleArrowAndPrice">
          <img className='travelInfosContainer_middleArrowAndPrice_arrowIcon' src={`${process.env.PUBLIC_URL}/assets/images/${downArrow}`} alt="Fleche vers le bas" />
          <div className="travelInfosContainer_middleArrowAndPrice_priceValue"> {price} €* </div>
        </div>
        <div className="travelInfosContainer_endTravel">
          <div className="travelInfosContainer_endTravel_travelTimeAndName"> {endTravelTime} {endTravelName} </div>
        </div>
        <div className="travelInfosContainer_travellers">
          {travellers.map((traveller, index) => (
            <div className="travelInfosContainer_travellers_traveller" key={index}>
              <div className="travelInfosContainer_travellers_traveller_travellerInfos">
                <img className='travelInfosContainer_travellers_traveller_travellerInfos_manIco' src={`${process.env.PUBLIC_URL}/assets/images/${manIco}`} alt="icone Monsieur" />
                {traveller.name && `${traveller.name} `}
                ({traveller.role})
                {traveller.flightNumber}
              </div>
            </div>
          ))}
        </div>
        <p className='travelInfosContainer_msgBagage'>Type de bagage : {travel.tailleBagage}</p>
        <button className='travelInfosContainer_reservationButton' onClick={(e) => inscriptionTrajet(e)}> {reservationButton} </button>
      </div>
      <p className='errorMsg'>{errorMsg}</p>
    </>
  );
};

export default TravelInfos;
