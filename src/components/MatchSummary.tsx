////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////


// Style importations
import styled from 'styled-components';
import { colors } from '../colors';

// Types importation
import { MatchDataType } from '../interfaces/types';

////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////

const MatchBanner = styled.div`
  display: flex;
padding: 0px 10px;
flex-direction: column;
justify-content: center;
align-items: center;
align-self: stretch;
border-radius: 20px;
background: var(--blanc, #FFF);
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

const TeamsName = styled.div `
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

const Date = styled.div `
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

const SummaryStatTable = styled.div `



`


////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const MatchSummary: React.FC<{ matchId: string,  matches: MatchDataType[]  }> = (props) => {

  

    console.log(props.matchId);


const matchsummary = props.matches.find(match => match.id_games === Number(props.matchId));


console.log(matchsummary);
    
        return (
          <>
          {matchsummary &&
          <MatchBanner>
            <Title>
              <img src={`./assets/images/teamsh/${matchsummary.home_franchise_logo}`} alt="" />
              <h2>PREVIEW J10A</h2>
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
}

          <SummaryStatTable>
<SummaryStatTable>
  <table>
    <tbody>
      {Array.from({ length: 3 }).map((_, rowIndex) => (
        <tr key={rowIndex}>
          {Array.from({ length: 28 }).map((_, colIndex) => (
            <td key={colIndex}>Cellule {rowIndex + 1}-{colIndex + 1}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</SummaryStatTable>
<SummaryStatTable>
  
</SummaryStatTable>
          </SummaryStatTable>
    
          </>
        );
      };
      
    
      export default MatchSummary;