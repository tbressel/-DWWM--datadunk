import { useContext, useEffect,useState } from "react";
import { API_BASE_URL } from "../config";

import { LoginContext } from "../contexts/LoginContext";

import styled from "styled-components";
import { colors } from "../colors";


import { MatchSummaryTeamsDataType } from '../interfaces/types';

////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////
const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100vw;
    height: 100vh;

`
const NotificationContainer = styled.div`
    position: absolute;
    top: calc(100vh / 2 - (189px / 2));
    left: calc(100vw / 2 - (544px / 2));

    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 544px;
    height: 189px;

    border-radius: 20px;
    background: ${colors.blanc};
    box-shadow: #d0d0d0 5px 5px 5px;
    z-index: 0;
`;
const NotificationTitle = styled.div`
    color: #000;
    text-align: center;
    font-family: Barlow;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

        p {
            color: ${colors.bleu};
            font-family: 'Barlow Medium';

            font-style: normal;
            font-weight: 600;
            line-height: 4rem;
            letter-spacing: -0.13px;
        }    
        
        img {
          width: 150px
        }
`;



////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////
const Home = () => {

  const [summary, setSummary] = useState<MatchSummaryTeamsDataType[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/statteams/matchsummaryteams/26501`);
        const data = await response.json();
        setSummary(data);

        console.log(data);

      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };

    fetchData();
  }, []);








  const { user } = useContext(LoginContext);


 if (user) {
//  if (!user?.token || user?.status !== 2) {
    return (
      <>
        <MainContainer>
          <NotificationContainer>
            <NotificationTitle>
              <p>Vous devez être membre pour accéder à cette page</p>
            </NotificationTitle>
          </NotificationContainer>
        </MainContainer>
      </>
    )
 } else 

  return (
    <>
    <MainContainer>
          <NotificationContainer>
            <NotificationTitle>
            <h1>Page en cours de construction</h1>
      <div>
        <img src="./assets/images/ball.png" alt="Page en cours de construction" />
      </div>
            </NotificationTitle>
          </NotificationContainer>
        </MainContainer>
      
    </>
  );
};

export default Home;
