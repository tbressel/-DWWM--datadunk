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
import { MatchSummaryPlayersDataType } from '../interfaces/types';

import frJson from '../datas/lang/fr.json';

////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////


const SummaryStatTable = styled.div`
  background-color: ${colors.violet1};
  box-shadow: ${colors.gris1} 2px 2px 2px;
  border-radius: 20px;
  margin-bottom: 40px;
  padding: 20px 20px 20px 0;
  overflow-x: scroll;
`
const HeaderTr = styled.tr`
  
  border-bottom: 2px solid ${colors.blanc};
  font-size: 1.2 rem;
  font-weight: 100;
  font-family: 'Barlow Bold';
`
const HeaderTh = styled.th`
      cursor: pointer;
      padding: 10px;
      white-space: nowrap;
      background-color: ${colors.gris1};
      border-right: 1px solid ${colors.violet1};

&.fixed {
  position: sticky;
  left: 0;

}


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
  text-align: left;
  vertical-align: middle;

  &.fixed {
    position: sticky;
    left: 0;
    background-color: ${colors.violet1};
    border-right: 1px solid ${colors.gris1};
}
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


`
const ImagePlayer = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;

    &p {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      font-size: 13px;
    }
`
const NamePlayer = styled.span`
font-family: 'Barlow Bold';
font-size: 1.2rem;
`
const BodyDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

    .player__name  {
      font-family: 'Barlow Medium';
      font-weight: 800;
    }

    .player__firstname  {
      display: none;
      font-family: 'Barlow Regular';
      font-weight: 200;
}
@media screen and (min-width: 768px){
        .player__firstname  {
          display: block;
        }
    }
`
////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const MatchSummaryPlayers: React.FC<{ matchId: string, matches: MatchDataType[] }> = (props) => {
  // console.log(props.matchId);
  // const matchsummary = props.matches.find(match => match.id_games === Number(props.matchId));


  const [summaryplayers, setSummaryPlayers] = useState<MatchSummaryPlayersDataType[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/statplayers/matchsummaryplayers/${props.matchId}`);
        const data = await response.json();
        setSummaryPlayers(data);
        // console.log(data);
        console.log(data);

      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };

    fetchData();
  }, []);

  if (summaryplayers.length > 1) {
    console.log(summaryplayers[0][0].id_franchise);
  }

  const summaryTableHeaders = ['5D', 'MIN', 'PTS', 'FGM', 'FGA', 'FG%', '2PM', '2PA', '2P%', '3PM', '3PA', '3P%', 'FTM', 'FTA', 'FT%', 'OREB', 'DREB', 'REB', 'AST', 'TOV', 'STL', 'BLK', 'PF', 'PFD', 'EVAL'];


  return (
    <>
      <SummaryContainer>
        {summaryplayers.length > 1 ? (
          <>
            <h2>Statistiques Globales</h2>

            <SummaryStatTable>
              <Table>
                <thead>
                  <HeaderTr>
                    <HeaderTh className='fixed'>Joueur</HeaderTh>
                    {summaryTableHeaders.map((header, index) => (
                      <HeaderTh key={index}>{header}
                      </HeaderTh>
                    ))}
                  </HeaderTr>
                </thead>
                <tbody>
                  {summaryplayers && Object.values(summaryplayers[0]).map((player: any, i: number) => (
                    <BodyTr key={i}>
                      <BodyTd className='fixed'>
                        <BodyDiv>
                          <ImagePlayer src={`assets/images/players-2023-2024/${player.player_photo}.webp`} alt={player.player_firstname + ' ' + player.player_name} />
                          <span className='player__firstname'>{player.player_firstname}</span>
                          <span><pre>  </pre></span>
                          <span className='player__name'>{player.player_name}</span>
                        </BodyDiv>
                      </BodyTd>
                      <td>{player.fiveD}</td>
                      <td>{player.min}</td>
                      <td>{player.pts}</td>
                      <td>{(player.twoR) + (player.threeR)}</td>
                      <td>{(player.twoT) + (player.threeT)}</td>
                      <td>{(player.twoPerc) + (player.threetPerc) / 2}</td>
                      <td>{player.twoR}</td>
                      <td>{player.twoT}</td>
                      <td>{player.twoPerc}</td>
                      <td>{player.threeR}</td>
                      <td>{player.threeT}</td>
                      <td>{player.threetPerc}</td>
                      <td>{player.lr}</td>
                      <td>{player.lt}</td>
                      <td>{player.lPerc}</td>
                      <td>{player.ro}</td>
                      <td>{player.rd}</td>
                      <td>{player.rt}</td>
                      <td>{player.pd}</td>
                      <td>{player.bp}</td>
                      <td>{player.in}</td>
                      <td>{player.ct}</td>
                      <td>{player.fte}</td>
                      <td>{player.cs}</td>
                      <td>{player.eval}</td>
                    </BodyTr>
                  ))}
                </tbody>
              </Table>
            </SummaryStatTable>
          </>
        ) : (
          <p>Chargement des données...</p>
        )}
      </SummaryContainer>



      <SummaryContainer>
        {summaryplayers.length > 1 ? (
          <SummaryStatTable>
          <Table>
            <thead>
              <HeaderTr>
                <HeaderTh className='fixed'>Joueur</HeaderTh>
                {summaryTableHeaders.map((header, index) => (
                  <HeaderTh key={index}>{header}
                  </HeaderTh>
                ))}
              </HeaderTr>
            </thead>
            <tbody>
              {summaryplayers && Object.values(summaryplayers[1]).map((player: any, i: number) => (
                <BodyTr key={i}>
                  <BodyTd className='fixed'>
                    <BodyDiv>
                      <ImagePlayer src={`assets/images/players-2023-2024/${player.player_photo}.webp`} alt={player.player_firstname + ' ' + player.player_name} />
                      <span className='player__firstname'>{player.player_firstname}</span>
                      <span className='player__name'>{player.player_name}</span>
                    </BodyDiv>
                  </BodyTd>
                  <td>{player.fiveD}</td>
                  <td>{player.min}</td>
                  <td>{player.pts}</td>
                  <td>{(player.twoR) + (player.threeR)}</td>
                  <td>{(player.twoT) + (player.threeT)}</td>
                  <td>{(player.twoPerc) + (player.threetPerc) / 2}</td>
                  <td>{player.twoR}</td>
                  <td>{player.twoT}</td>
                  <td>{player.twoPerc}</td>
                  <td>{player.threeR}</td>
                  <td>{player.threeT}</td>
                  <td>{player.threetPerc}</td>
                  <td>{player.lr}</td>
                  <td>{player.lt}</td>
                  <td>{player.lPerc}</td>
                  <td>{player.ro}</td>
                  <td>{player.rd}</td>
                  <td>{player.rt}</td>
                  <td>{player.pd}</td>
                  <td>{player.bp}</td>
                  <td>{player.in}</td>
                  <td>{player.ct}</td>
                  <td>{player.fte}</td>
                  <td>{player.cs}</td>
                  <td>{player.eval}</td>
                </BodyTr>
              ))}
            </tbody>
          </Table>
        </SummaryStatTable>
        ) : (
          <p>Chargement des données...</p>
        )}
      </SummaryContainer>

    </>
  );
};


export default MatchSummaryPlayers;



