////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

// Style importations
import styled from 'styled-components';
import { colors } from '../colors';

// React importations
import { useContext, useState } from 'react';


// Context importation
import { LoginContext } from '../contexts/LoginContext';

// Types importation
import { MatchDataType } from '../interfaces/types';

// Components importations
import MatchSummaryTeams from './MatchSummaryTeams';
import MatchSummaryPlayers from './MatchSummaryPlayers';
import SwitchFilter from './subcomponents/SwitchFilter';


////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////

const BannerContainer = styled.div` 
  background: ${colors.blanc};
  border-radius: 20px;
  margin: 40px 0;
  padding: 20px 20px 0px 20px;
`;

const MatchBanner = styled.div`
  display: flex;
  padding: 0px 10px;
  margin-bottom: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: ${colors.blanc};
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;

  h2 {
    color: #000;
    text-align: center;
    font-family: 'Barlow Regular';
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  img {
    width: 87px;
  }
`;

const TeamsName = styled.div`
  display: flex;
  padding: 0px 60px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;

  h3 {
    display: flex;
    width: 190px;
    flex-direction: column;
    justify-content: center;
    align-self: stretch;
    color: #000;
    text-align: center;
    font-family: 'Barlow Medium';
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const Date = styled.div`
  align-self: stretch;
  color: #000;
  text-align: center;
  font-family: 'Barlow Medium';
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  p {
    color: #000;
    text-align: center;
    font-family: 'Barlow Medium';
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const SummaryContainer = styled.div`
  display: flex;
  padding: 20px 10px;
  margin-bottom: 40px;
  flex-direction: column;
  justify-content: center;
  border-radius: 20px;
  background: ${colors.blanc};
  overflow-x: scroll;

  h2 {
    text-align: center;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 1.5rem;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100vw;
  height: 100vh;
`;

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
  z-index: 3;
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
    width: 150px;
  }
`;


////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const MatchSummary: React.FC<{ matchId: string, matches: MatchDataType[] }> = (props) => {
  // console.log(props.matchId);

  // get the id of the match from the props
  const matchsummary = props.matches.find(match => match.id_games === Number(props.matchId));

  // get the user from the context
  const { user } = useContext(LoginContext);

  // get the token from the local storage
  const sessionToken = localStorage.getItem('sessionToken');

  // console.log(sessionToken)
  // console.log(user)

  const [showForm, setShowForm] = useState(true);
  
  const switchText = [
    { switchName: "Filtres : " },
    { leftButtonText: "Joueurs" },
    { rightButtonText: "Equipes" },
  ];
  

  if (user) {
  // if (user?.status !== 2) {
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
    );
  } else {
    return (
      <>
        <SwitchFilter showForm={showForm} setShowForm={setShowForm} switchText={switchText} />
        {matchsummary &&
          <BannerContainer>
            <MatchBanner>
              <Title>
                <img src={`./assets/images/teamsh/${matchsummary.home_franchise_logo}`} alt="" />
                <h2>PREVIEW</h2>
                <img src={`./assets/images/teamsh/${matchsummary.visitor_franchise_logo}`} alt="" />
              </Title>
              <TeamsName>
                <h3>{matchsummary.home_franchise_name}</h3> <span> - </span>
                <h3>{matchsummary.visitor_franchise_name}</h3>
              </TeamsName>
              <Date>
                <p>Données mise à jours après  la {matchsummary.game_day}</p>
                <p>({matchsummary.game_date})</p>
              </Date>
            </MatchBanner>
          </BannerContainer>
        }

        <SummaryContainer>
          {showForm ? (
            <MatchSummaryTeams matchId={props.matchId} matches={props.matches} />
          ) : (
            <MatchSummaryPlayers matchId={props.matchId} matches={props.matches} />
          )}
        </SummaryContainer>
      </>
    );
  }
};

export default MatchSummary;
