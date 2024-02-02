////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

import { useState, useEffect } from 'react';

import { API_BASE_URL } from '../config';
// Style importations
import styled from 'styled-components';
import { colors } from '../colors';

// Types importation
import { MatchDataType } from '../interfaces/types';
import { MatchSummaryDataType } from '../interfaces/types';

import { matchsummary } from '../datas/lang/fr.json';

////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////

const MatchBanner = styled.div`
  display: flex;
padding: 0px 10px;
margin-bottom: 40px;
flex-direction: column;
justify-content: center;
align-items: center;
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
const SummaryStatTable = styled.div`

`
const HeaderTr = styled.tr`
  
  border-bottom: 2px solid ${colors.blanc};
  font-size: 1.2 rem;
  font-weight: 100;
  font-family: 'Barlow Bold';
  `
  const HeaderTh = styled.th`
      padding: 10px;
white-space: nowrap;
    background-color: ${colors.gris1};
  `
const BodyTr = styled.tr`
white-space: nowrap;
  font-size: 1.2 rem;
  font-weight: 100;
  font-family: 'Barlow Regular';
  text-align: center;
  `
const BodyTd = styled.td`
    padding: 10px;
`
const Table = styled.table`
width: 100%;
`
const SummaryContainer = styled.div`
  display: flex;
padding: 20px 10px;
margin-bottom: 40px;
flex-direction: column;
justify-content: center;

border-radius: 20px;
background: var(--blanc, #FFF);
overflow-x: scroll;

`;

////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const MatchSummary: React.FC<{ matchId: string, matches: MatchDataType[] }> = (props) => {
  // console.log(props.matchId);
  const matchsummary = props.matches.find(match => match.id_games === Number(props.matchId));

  const [summary, setSummary] = useState<MatchSummaryDataType[]>([]);

  // console.log(matchsummary);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/stats/matchsummary/${props.matchId}`);
        const data = await response.json();
        setSummary(data);
        console.log(data);

      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };

    fetchData();
  }, []);

  const summaryTableHeaders = ['Equipe', 'PTS', 'OPP PTS', 'FGM', 'FGA', 'FG%', '2PM', '2PA', '2P%', '3PM', '3PA', '3P%', 'FTM', 'FTA', 'FT%', 'OREB', 'DREB', 'REB', 'AST', 'TOV', 'STL', 'BLK', 'PF', 'PFD', 'EVAL'];

  // const summaryTableHeaders = Object.values(matchsummary);
  
  let summaryTableDatas: any[] = [];
  
  if (summary[0] && matchsummary) {
    summaryTableDatas = [
      [matchsummary.home_franchise_name,
      summary[0].pts,
      summary[1].pts,
      (summary[0].twoR) + (summary[0].twoR),
      (summary[0].twoT) + (summary[0].twoT),
      ((summary[0].twoPerc) + (summary[0].threetPerc)).toFixed(2) + '%',
      summary[0].twoR,
      summary[0].twoT,
      summary[0].twoPerc + '%',
      summary[0].threeR,
      summary[0].threeT,
      summary[0].threetPerc + '%',
      summary[0].lr,
      summary[0].lt,
      summary[0].lPerc + '%',
      summary[0].ro,
      summary[0].rd,
      summary[0].rt,
      summary[0].pd,
      summary[0].bp,
      summary[0].in,
      summary[0].ct,
      summary[0].fte,
      summary[0].cs,
      summary[0].eval],
      [matchsummary.visitor_franchise_name,
      summary[1].pts,
      summary[0].pts,
      (summary[1].twoR) + (summary[1].twoR),
      (summary[1].twoT) + (summary[1].twoT),
      ((summary[1].twoPerc) + (summary[1].threetPerc)).toFixed(2) + '%',
      summary[1].twoR,
      summary[1].twoT,
      summary[1].twoPerc + '%',
      summary[1].threeR,
      summary[1].threeT,
      summary[1].threetPerc + '%',
      summary[1].lr,
      summary[1].lt,
      summary[1].lPerc + '%',
      summary[1].ro,
      summary[1].rd,
      summary[1].rt,
      summary[1].pd,
      summary[1].bp,
      summary[1].in,
      summary[1].ct,
      summary[1].fte,
      summary[1].cs,
      summary[1].eval],
    ];
  }

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

      {summary[0] &&

      <SummaryContainer>

        <SummaryStatTable>
          <Table>
            <thead>
              <HeaderTr>
                {summaryTableHeaders.map((header, index) => (
                  <HeaderTh key={index}>{header}</HeaderTh>
                ))}
              </HeaderTr>
            </thead>
            <tbody>
              {summaryTableDatas.map((row: any[], rowIndex: number) => (
                <BodyTr key={rowIndex}>
                  {row.map((cell: any, cellIndex: number) => (
                    <BodyTd key={cellIndex}>{cell}</BodyTd>
                    ))}
                </BodyTr>
              ))}
            </tbody>
          </Table>
        </SummaryStatTable>
      </SummaryContainer>
      }

    </>
  );
};


export default MatchSummary;



