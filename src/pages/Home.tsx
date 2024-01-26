import React, { useEffect, useState } from 'react';


import { FormuleDataType } from '../interfaces/types';
import { API_BASE_URL } from '../config';







const Home = () => {


  const [formule, setFormule] = useState<FormuleDataType[]>([]);
  const tableHeaders = ['_pts', '_3R', '_2R', '_3T', '_2T', '_lt', '_lr', '_ro', '_rd', '_in', '_pd', '_ct', '_fte', '_bp', '_total'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/stats/formule`);
        const data = await response.json();
        setFormule(data);
        console.log(data);
   
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };
    
    fetchData();
  }, []);




  // Vérifier si formule est vide avant d'accéder à ses éléments
  if (formule.length === 0) {
    return <p>Chargement en cours...</p>;
  }

  const playersData = formule.map((player, index) => {
    const data: { [key: string]: any } = {
        _pts: player.pts,
        _3R: player.threeR,
        _2R: player.twoR,
        _3T: player.threeT,
        _2T: player.twoT,
        _lt: player.lt,
        _lr: player.lr,
        _ro: player.ro,
        _rd: player.rd,
        _in: player.in,
        _pd: player.pd,
        _ct: player.ct,
        _fte: player.fte,
        _bp: player.bp,
      };
      


    // Calculer le total ou toute autre valeur dérivée si nécessaire
    let _total = data._pts + 0.4 * (data._2R + data._3R) - 0.7 * (data._2T + data._3T) - 0.4 * (data._lt - data._lr) + (0.7 * data._ro) + (0.3 * data._rd) + data._in + (0.7 * data._pd) + (0.7 * data._ct) - 0.4 * data._fte - data._bp;




    // Mettre à jour l'objet data pour inclure _total
    data._total = _total.toFixed(2);

    return (
      <tr key={index}>
        {tableHeaders.map(header => (
          <td key={header}>{(data as any)[header]}</td>
        ))}
      </tr>
    );
  });

  return (
    <>




      <table border={1}>
        <thead>
          <tr>
            {tableHeaders.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{playersData}</tbody>
      </table>





    </>
  );
};

export default Home;
