import styled from 'styled-components';
import { colors } from '../colors';

// import data from '../datas/teams/proa.json';
// import { TeamDataType } from '../interfaces/types';


const MatchCard = () => {

    const MatchCardContainer = styled.div`
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 450px;
        max-width: 450px;
        border-radius: 10px;
        background-color: ${colors.violet1};
        padding: 5px 20px 5px 20px;
        box-shadow: #d0d0d0 5px 5px 5px;
        transition: 200ms ease-in-out;
        opacity: 0.7;
            
            &:hover {
                transition: 200ms ease-in-out;
                opacity: 1;
            }
    ;`

    const MatchBoxUp = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    ;`

    const MatchBoxDown = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;

        .match__gameday--text {
            color: ${colors.gris1};           
            text-align: center;
            text-transform: uppercase;
            font-family: Barlow;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;

            span {
                font-family: 'Barlow Bold';
                font-size: 18px;
                letter-spacing: 0.1rem;
            }


        }
    ;`

    const MatchTeam = styled.div`
        display: flex;
        width: 120px;
        flex-direction: column;
            p {
                font-family: 'Barlow Medium'; 
                    text-transform: uppercase;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: normal; 
            }

            .match__team--name p {
               text-align: center;
               width: 100%;
            }

            .match__logo img {
                width: 100%;
            }

            .loose {
                filter: grayscale();
                opacity: 0.5;
            }
            .win {
                filter: none;
            }
    ;`

    const MatchScore = styled.div` 
        text-align: center;
            .match__score--text {
                font-family: Barlow Bold;
                font-size: 40px;
                font-style: normal;
                font-weight: 700;
                line-height: normal; 
            }
            .match__league img{
                width: 100px;
                padding: 20px;
            }
    ;`




    return (
        <>

            <MatchCardContainer>

                <MatchBoxUp>

                    <MatchTeam>
                        <div className="match__team--name">
                            <p>
                                DRAKKARS HCC CLUB
                            </p>
                        </div>
                        <div className="match__logo win">
                            <img src="assets/images/teamsh/team-blois.png" alt="" />
                        </div>
                    </MatchTeam>

                    <MatchScore>

                        <div className="match__league">
                            <img src="assets/images/leagues/lnbprob.png" alt="" />
                        </div>


                        <p>
                            <span className="match__score--text">86</span>
                            <span className="match__score--text"> - </span>
                            <span className="match__score--text">64</span>
                        </p>
                    </MatchScore>

                    <MatchTeam>
                        <div className="match__team--name">
                            <p>
                                SPO BASKET ROUEN
                            </p>
                        </div>
                        <div className="match__logo loose">
                            <img src="assets/images/teamsh/team-monaco.png" alt="" />
                        </div>
                    </MatchTeam>
                </MatchBoxUp>

                <MatchBoxDown>
                    <div className="match__gameday--text">
                        <span>13eme journée</span>
                        <span> - </span>
                        <span>12.12.2023</span>
                    </div>
                </MatchBoxDown>
            </MatchCardContainer>
        </>
    )



}



export default MatchCard;
