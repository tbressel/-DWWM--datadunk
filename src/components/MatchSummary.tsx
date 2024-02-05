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
import { MatchEfficiencyDataType } from '../interfaces/types';
import { MatchFourfactorsDataType } from '../interfaces/types';
import { MatchShootingsuccessDataType } from '../interfaces/types';
import { MatchShootingdefenseDataType } from '../interfaces/types';
import { MatchReboundEfficiencyDataType } from '../interfaces/types';
import { MatchDefenseAttackDataType } from '../interfaces/types';

import { matchsummary } from '../datas/lang/fr.json';

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
const SummaryStatTable = styled.div`
background-color: ${colors.violet1};
  box-shadow: ${colors.gris1} 2px 2px 2px;
  border-radius: 20px;
  margin-bottom: 40px;
  padding: 20px;
  overflow-x: scroll;
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
  const matchsummary = props.matches.find(match => match.id_games === Number(props.matchId));
  const matchefficiency = props.matches.find(match => match.id_games === Number(props.matchId));
  const matchfourfactors = props.matches.find(match => match.id_games === Number(props.matchId));
  const matchshootingsuccess = props.matches.find(match => match.id_games === Number(props.matchId));
  const matchshootingdefense = props.matches.find(match => match.id_games === Number(props.matchId));
  const matchreboundefficiency = props.matches.find(match => match.id_games === Number(props.matchId));
  const matchdefenseattack = props.matches.find(match => match.id_games === Number(props.matchId));

  const [summary, setSummary] = useState<MatchSummaryDataType[]>([]);
  const [efficiency, setEfficiency] = useState<MatchEfficiencyDataType[]>([]);
  const [fourfactors, setFourfactors] = useState<MatchFourfactorsDataType[]>([]);
  const [shootingsuccess, setShootingsuccess] = useState<MatchShootingsuccessDataType[]>([]);
  const [shootingdefense, setShootingdefense] = useState<MatchShootingdefenseDataType[]>([]);
  const [reboundefficiency, setReboundefficiency] = useState<MatchReboundEfficiencyDataType[]>([]);
  const [defenseattack, setDefenseattack] = useState<MatchDefenseAttackDataType[]>([]);

  // console.log(matchsummary);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/stats/matchsummary/${props.matchId}`);
        const data = await response.json();
        setSummary(data);
        setEfficiency(data);
        setFourfactors(data);
        setShootingsuccess(data);
        setShootingdefense(data);
        setReboundefficiency(data);
        setDefenseattack(data);
        console.log(data);

      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };

    fetchData();
  }, []);


//////////////////////////////////////////////
////////// STATISTIQUES GLOBALES /////////////
//////////////////////////////////////////////
  const summaryTableHeaders = ['Equipe', 'PTS', 'OPP PTS', 'FGM', 'FGA', 'FG%', '2PM', '2PA', '2P%', '3PM', '3PA', '3P%', 'FTM', 'FTA', 'FT%', 'OREB', 'DREB', 'REB', 'AST', 'TOV', 'STL', 'BLK', 'PF', 'PFD', 'EVAL'];
  let summaryTableDatas: any[] = [];
  if (summary[0] && matchsummary) {
    summaryTableDatas = [
      [matchsummary.home_franchise_name,
      summary[0].pts, summary[1].pts,
      (summary[0].twoR) + (summary[0].twoR),
      (summary[0].twoT) + (summary[0].twoT),
      ((summary[0].twoPerc) + (summary[0].threetPerc)).toFixed(2) + '%',
      summary[0].twoR, summary[0].twoT, summary[0].twoPerc + '%',
      summary[0].threeR, summary[0].threeT, summary[0].threetPerc + '%',
      summary[0].lr, summary[0].lt, summary[0].lPerc + '%',
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
////////////////////////////////////////////////////////////
////////// EFFICACITE OFFENSIVES ET DEFENSIVES /////////////
////////////////////////////////////////////////////////////
  const efficiencyTableHeaders = ['Equipe', 'Poss', 'Action', 'ORtg', 'Floor%', 'DRtg', 'Stop%', 'NetRtg'];
  let efficiencyTableDatas: any[] = [];
  if (efficiency[0] && matchefficiency) {
    efficiencyTableDatas = [];
  }
//////////////////////////////////
////////// 4 FACTORS /////////////
/////////////////////////////////
  const fourfactorsTableHeaders = ['Equipe', 'eFG%', '2PM', '2PA', '2P%', '3PM', '3PA', '3P%', 'FTM', 'FTA', '%tir2P', '%tri3P'];
  let fourfactorsTableDatas: any[] = [];
  if (fourfactors[0] && matchfourfactors) {
    fourfactorsTableDatas = [];
  }
/////////////////////////////////////////////
////////// SUCCESS  AUX TIRES /////////////
/////////////////////////////////////////////
  const shootingsuccessTableHeaders = ['Equipe', 'eFG%', '2PM', '2PA', '2P%', '3PM', '3PA', '3P%', 'FTM', 'FTA', 'FT%', '%tir2P', '%tir3P'];
  let shootingsuccessTableDatas: any[] = [];
  if (shootingsuccess[0] && matchshootingsuccess) {
    shootingsuccessTableDatas = [];
  }
/////////////////////////////////////////////
////////// STATISTIQUES DEFENSE /////////////
/////////////////////////////////////////////
  const shootingdefenseTableHeaders = ['Equipe', 'eFG% adv', '2PM adv', '2PA adv', '2P% adv', '3PM adv', '3PA adv', '3P% adv', 'FTM adv', 'FTA adv', 'FT% adv', '%tirs2P adv', '%tirs3P adv'];
  let shootingdefenseTableDatas: any[] = [];
  if (shootingdefense[0] && matchshootingdefense) {
    shootingdefenseTableDatas = [];
  }
//////////////////////////////////////
////////// SUCCES REBOND /////////////
//////////////////////////////////////
  const reboundefficiencyTableHeaders = ['Equipe','OREB','OREB%','DREB','DREB%','REB','REB%'];
  let reboundefficiencyTableDatas: any[] = [];
  if (reboundefficiency[0] && matchreboundefficiency) {
    reboundefficiencyTableDatas = [];
  }
///////////////////////////////////////////////////////
////////// SUCCES OFFENVIVE ET DEFENSIVES /////////////
///////////////////////////////////////////////////////
  const defenseattackTableHeaders = ['Equipe','AST%','AST/TOV','3PA/Poss','FTA/Poss','STL%', 'BLK%'];
  let defenseattackTableDatas: any[] = [];
  if (defenseattack[0] && matchdefenseattack) {
    defenseattackTableDatas = [];
  }


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
        {summary[0] &&
          <SummaryStatTable>
            <h2>STATISTIQUES GLOBALES</h2>
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
        }


        {efficiency[0] &&
          <SummaryStatTable>
            <h2>EFFICACITES OFFENSIVES ET DEFENSIVES</h2>
            <Table>
              <thead>
                <HeaderTr>
                  {efficiencyTableHeaders.map((header, index) => (
                    <HeaderTh key={index}>{header}</HeaderTh>
                  ))}
                </HeaderTr>
              </thead>
              <tbody>
                {efficiencyTableDatas.map((row: any[], rowIndex: number) => (
                  <BodyTr key={rowIndex}>
                    {row.map((cell: any, cellIndex: number) => (
                      <BodyTd key={cellIndex}>{cell}</BodyTd>
                    ))}
                  </BodyTr>
                ))}
              </tbody>
            </Table>
          </SummaryStatTable>
        }



        {fourfactors[0] &&
          <SummaryStatTable>
            <h2>4 FACTORS</h2>
            <Table>
              <thead>
                <HeaderTr>
                  {fourfactorsTableHeaders.map((header, index) => (
                    <HeaderTh key={index}>{header}</HeaderTh>
                  ))}
                </HeaderTr>
              </thead>
              <tbody>
                {fourfactorsTableDatas.map((row: any[], rowIndex: number) => (
                  <BodyTr key={rowIndex}>
                    {row.map((cell: any, cellIndex: number) => (
                      <BodyTd key={cellIndex}>{cell}</BodyTd>
                    ))}
                  </BodyTr>
                ))}
              </tbody>
            </Table>
          </SummaryStatTable>
        }


        {shootingsuccess[0] &&
          <SummaryStatTable>
            <h2>STATISTIQUES DE REUSSITE ET DE TENDANCE AUX TIRES</h2>
            <Table>
              <thead>
                <HeaderTr>
                  {shootingsuccessTableHeaders.map((header, index) => (
                    <HeaderTh key={index}>{header}</HeaderTh>
                  ))}
                </HeaderTr>
              </thead>
              <tbody>
                {shootingsuccessTableDatas.map((row: any[], rowIndex: number) => (
                  <BodyTr key={rowIndex}>
                    {row.map((cell: any, cellIndex: number) => (
                      <BodyTd key={cellIndex}>{cell}</BodyTd>
                    ))}
                  </BodyTr>
                ))}
              </tbody>
            </Table>
          </SummaryStatTable>
        }
        {shootingdefense[0] &&
          <SummaryStatTable>
            <h2>STATISTIQUES DE REUSSITE ET DE TENDANCE AUX TIRS - DEFENSE</h2>
            <Table>
              <thead>
                <HeaderTr>
                  {shootingdefenseTableHeaders.map((header, index) => (
                    <HeaderTh key={index}>{header}</HeaderTh>
                  ))}
                </HeaderTr>
              </thead>
              <tbody>
                {shootingdefenseTableDatas.map((row: any[], rowIndex: number) => (
                  <BodyTr key={rowIndex}>
                    {row.map((cell: any, cellIndex: number) => (
                      <BodyTd key={cellIndex}>{cell}</BodyTd>
                    ))}
                  </BodyTr>
                ))}
              </tbody>
            </Table>
          </SummaryStatTable>
        }



        {reboundefficiency[0] &&
          <SummaryStatTable>
            <h2>STATISTIQUES DE REBOND ET D'EFFICACITE AU REBOND</h2>
            <Table>
              <thead>
                <HeaderTr>
                  {reboundefficiencyTableHeaders.map((header, index) => (
                    <HeaderTh key={index}>{header}</HeaderTh>
                  ))}
                </HeaderTr>
              </thead>
              <tbody>
                {reboundefficiencyTableDatas.map((row: any[], rowIndex: number) => (
                  <BodyTr key={rowIndex}>
                    {row.map((cell: any, cellIndex: number) => (
                      <BodyTd key={cellIndex}>{cell}</BodyTd>
                    ))}
                  </BodyTr>
                ))}
              </tbody>
            </Table>
          </SummaryStatTable>
        }



        {defenseattack[0] &&
          <SummaryStatTable>
            <h2>TENDANCES OFFENSIVES ET DEFENSIVES</h2>
            <Table>
              <thead>
                <HeaderTr>
                  {defenseattackTableHeaders.map((header, index) => (
                    <HeaderTh key={index}>{header}</HeaderTh>
                  ))}
                </HeaderTr>
              </thead>
              <tbody>
                {defenseattackTableDatas.map((row: any[], rowIndex: number) => (
                  <BodyTr key={rowIndex}>
                    {row.map((cell: any, cellIndex: number) => (
                      <BodyTd key={cellIndex}>{cell}</BodyTd>
                    ))}
                  </BodyTr>
                ))}
              </tbody>
            </Table>
          </SummaryStatTable>
        }


      </SummaryContainer>
    </>
  );
};


export default MatchSummary;



