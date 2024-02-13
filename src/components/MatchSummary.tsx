////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

// Style importations
import styled from 'styled-components';
import { colors } from '../colors';

// Types importation
import { MatchDataType } from '../interfaces/types';
import MatchSummaryTeams from './MatchSummaryTeams';
import MatchSummaryPlayers from './MatchSummaryPlayers';

import { useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';

////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////

const BannerContainer = styled.div` 
background: ${colors.blanc};
  border-radius: 20px;
  margin-bottom: 40px;
  padding: 20px 20px 0px 20px;
`
const MatchBanner = styled.div`
  display: flex;
padding: 0px 10px;
margin-bottom: 40px;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 20px;
background: ${colors.blanc};



`
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

`
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
`
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
`
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

////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const MatchSummary: React.FC<{ matchId: string, matches: MatchDataType[] }> = (props) => {
  // console.log(props.matchId);
  const { user } = useContext(LoginContext);



  if (!user?.token) {
      return (
          <>
              <h1>Vous n'avez pas les authorisation nécessaire pour acceder à cette page.</h1>
          </>
      )
  }
  const matchsummary = props.matches.find(match => match.id_games === Number(props.matchId));

  return (
    <>
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
      <MatchSummaryTeams matchId={props.matchId} matches={props.matches} />
      <MatchSummaryPlayers matchId={props.matchId} matches={props.matches} />

      </SummaryContainer>
    </>
  );
};


export default MatchSummary;



