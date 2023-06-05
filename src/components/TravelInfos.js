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

  const [popUpVisibility, setPopUpVisibility] = useState(false);
  const [selectedTraveller, setSelectedTraveller] = useState();

  useEffect(() => {
    axios.get(`${API_TRAVEL_URL}/` + props.id)
      .then(response => {
        setTravel(response.data.travel)
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
    } else if (localStorage.getItem('user') === travel.idCompte) {
      setErrorMsg('Vous le créateur de ce trajet');
    } else if (dateDepart < currentDate) {
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

  const handleTravellerClick = async (traveller) => {
    if (selectedTraveller && traveller === selectedTraveller._id) {
      setPopUpVisibility(!popUpVisibility);
    } else {
      setPopUpVisibility(true);
    }

    try {
      const response = await axios.get(`${API_USER_URL}/id/` + traveller);
      console.log(response);
      setSelectedTraveller(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const desinscriptionTrajet = (e) => {
    if (currentDate >= dateDepart) {
      setErrorMsg('Le trajet a déjà commencé ou est déjà terminé');
    } else {
      setErrorMsg('');
      axios.put(`${API_TRAVEL_URL}/` + props.id + '/userRemove/' + localStorage.getItem('user'))
      .then(response => {
        console.log(response.data.user);
      })
      .catch(error => {
        console.log(error);
      });

      window.location.reload();
    }
  };

  const prixTrajet = () => {
    if (travel && travel.idVoyageurs) {
      if (travel.lieuDepart === 'Orly Airport (ORY)' || travel.lieuArrivee === 'Orly Airport (ORY)') {
        return (38 / (travel.idVoyageurs.length + 1)).toFixed(2);
      } else {
        return (59 / (travel.idVoyageurs.length + 1)).toFixed(2);
      }
    }
    return "";
  };
  

  return (
    <>
      <div className="travelInfosContainer">

        <div className="travelInfosContainer_startTravel">
          <div className="travelInfosContainer_startTravel_travelTimeAndName"> {startTravelTime} {startTravelName} - {jourDepart} </div>
        </div>

        <div className="travelInfosContainer_middleArrowAndPrice">
          <img className='travelInfosContainer_middleArrowAndPrice_arrowIcon' src={`${process.env.PUBLIC_URL}/assets/images/${downArrow}`} alt="Fleche vers le bas" />
          <div className="travelInfosContainer_middleArrowAndPrice_priceValue"> {prixTrajet()} €* </div>
        </div>

        <div className="travelInfosContainer_endTravel">
          <div className="travelInfosContainer_endTravel_travelTimeAndName"> {endTravelTime} {endTravelName} </div>
        </div>

        <div className="travelInfosContainer_travellers">
          {travellers.map((traveller, index) => (
            <div className="travelInfosContainer_travellers_traveller" key={index}>
              {travel.idCompte === localStorage.getItem('user') && index > 0 ? (
                <div className="travelInfosContainer_travellers_traveller_travellerInfos">
                  <img
                    className='travelInfosContainer_travellers_traveller_travellerInfos_manIco'
                    src={`${process.env.PUBLIC_URL}/assets/images/${manIco}`}
                    alt="icone Monsieur"
                  />
                  <p
                    className='travelInfosContainer_travellers_traveller_travellerInfos_pClicable'
                    onClick={() => handleTravellerClick(travel.idVoyageurs[index - 1])}
                  >
                    {traveller.name && `${traveller.name} `} ({traveller.role}) {traveller.flightNumber}
                  </p>
                </div>
              ) : travel.idVoyageurs.includes(localStorage.getItem('user')) && index === 0 ? (
                <div className="travelInfosContainer_travellers_traveller_travellerInfos">
                  <img
                    className='travelInfosContainer_travellers_traveller_travellerInfos_manIco'
                    src={`${process.env.PUBLIC_URL}/assets/images/${manIco}`}
                    alt="icone Monsieur"
                  />
                  <p
                    className='travelInfosContainer_travellers_traveller_travellerInfos_pClicable'
                    onClick={() => handleTravellerClick(travel.idCompte)}
                  >
                    {traveller.name && `${traveller.name} `} ({traveller.role}) {traveller.flightNumber}
                  </p>
                </div>
              ) : (
                <div className="travelInfosContainer_travellers_traveller_travellerInfos">
                  <img
                    className='travelInfosContainer_travellers_traveller_travellerInfos_manIco'
                    src={`${process.env.PUBLIC_URL}/assets/images/${manIco}`}
                    alt="icone Monsieur"
                  />
                  <p className='travelInfosContainer_travellers_traveller_travellerInfos_p'>
                    {traveller.name && `${traveller.name} `} ({traveller.role}) {traveller.flightNumber}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>


        {popUpVisibility && selectedTraveller && account && (
          <div className='accountDetailsContainer'>
            <section className='accountDetailsContainer_accountInformationsSection'>
              <h1 className='accountDetailsContainer_accountInformationsSection_mainTitle'> Informations personnelles </h1>
              <div className='accountDetailsContainer_accountInformationsSection_container'>
                <div className='accountDetailsContainer_accountInformationsSection_container_firstLastNames'>
                  <label className='accountDetailsContainer_accountInformationsSection_container_firstLastNames_labelTitle'> Prénom </label>
                  <label className='accountDetailsContainer_accountInformationsSection_container_firstLastNames_labelContent'> {selectedTraveller.firstName} </label>

                  <label className='accountDetailsContainer_accountInformationsSection_container_firstLastNames_labelTitle lastNameTitle'> Nom </label>
                  <label className='accountDetailsContainer_accountInformationsSection_container_firstLastNames_labelContent lastNameContent'> {selectedTraveller.lastName} </label>
                </div>

                <label className='accountDetailsContainer_accountInformationsSection_container_labelTitle'> Email </label>
                <label className='accountDetailsContainer_accountInformationsSection_container_labelContent'> {selectedTraveller.email} </label>

                <label className='accountDetailsContainer_accountInformationsSection_container_labelTitle'> Numéro de téléphone </label>
                <label className='accountDetailsContainer_accountInformationsSection_container_labelContent'> {selectedTraveller.phoneNumber} </label>
              </div>
            </section>
          </div>
        )}

        <p className='travelInfosContainer_msgBagage'>Type de bagage : {travel.tailleBagage}</p>

        {travel && travel.idVoyageurs && travel.idVoyageurs.includes(localStorage.getItem('user')) ?
          <button className='travelInfosContainer_reservationButton' onClick={(e) => desinscriptionTrajet(e)}> Se désinscrire </button>
          :
          <button className='travelInfosContainer_reservationButton' onClick={(e) => inscriptionTrajet(e)}> {reservationButton} </button>}
      </div>

      <p className='errorMsg'> {errorMsg} </p>

    </>
  );
};

export default TravelInfos;