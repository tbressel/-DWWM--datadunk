import styled from "styled-components";
import { colors } from "../colors";
import { useState } from "react";
import { UsersListDataType } from "../interfaces/types";



const UserCardContainer = styled.div`
    background-color: ${colors.blanc};
    padding: 10px;
    border-radius: 10px;
`;
const UserCardUl = styled.ul`  
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    background-color: ${colors.violet1};
    box-shadow: #d0d0d0 5px 5px 5px;
    opacity: 0.7;
    transition: 200ms ease-in-out;
    overflow-y: hidden;

    &:hover {
        opacity: 1;
        transition: 200ms ease-in-out;

    }
`;
const Li = styled.li`
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 100%;
   
`;
const UserHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 10px;
`;
const UserProfile = styled.div`
    display: flex;
    align-items: center;
    width: 100%;

   
`;
const UserAvatar = styled.div` 
    img {
        width: 48px;
        height: 48px; 
        border-radius: 48px;
        border: 4px solid var(--Orange, #E1533D);
        margin: 0 10px 0 0;
    }
`;
const UserInfos = styled.div` 
width: 100%;
font-family: 'Gibson Medium';
font-style: normal;
p:nth-child(1) {    
        width: 100%;
        color: var(--noir, #000);
        text-align: left;
        text-transform: capitalize;
        font-size: 16px;
        font-weight: 600;
        line-height: normal;
        letter-spacing: -0.16px;
    }

    p:nth-child(2) {
        width: 100%;
        color: var(--noir, #000);
        text-align: left;

        font-size: 13px;
   
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.13px;
    }

`;
const UserActions = styled.div` 
display: flex;

justify-content: space-between;


div {
    display: flex;

img {
    padding: 10px;

}

img:nth-child(1) {
    width: 32px;    
}
img:nth-child(2) {
    width: 24px;    
}


}

`;
const UserExtend = styled.div`
cursor: pointer;
display: flex;
width: 30px;
height: 48px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;

img  {

    width: 20px;
    height: 10px;
    flex-shrink: 0;
    stroke-width: 2px;
    stroke: var(--noir, #000);
    transform: rotate(180deg);
    transition: 200ms ease-in-out;
}


`;
const UserDrawerUl = styled.ul`
display: flex;
flex-direction: column;
`;
const UserDrawerLi = styled.li`
font-family: 'Gibson Light';
display: flex;
align-items: center;
gap: 10px;
align-self: stretch;
margin: 10px;


span {
  font-family: 'Gibson Medium';
    font-weight: 600;
}

`;


const UserCards: React.FC<{ user: UsersListDataType }> = (props) => {

  
  const { id, user_pseudo, user_avatar, user_role, user_lastname, user_firstname, user_email } = props.user;

  const [ShowDrawerOnClick, setShowDrawerOnClick] = useState(false);

  const handlerShowDrawer = () => {
    setShowDrawerOnClick(!ShowDrawerOnClick);
  };


  // {`assets/images/leagues/${league_logo}`}
  return (
    <>
      <UserCardContainer>
        <UserCardUl>

          <Li id={`${id}`}>
            <UserHeader>
              <UserProfile>
                <UserAvatar>
                  <img src={`assets/images/avatars/${user_avatar}`} alt="" />
                </UserAvatar>
                <UserInfos>
                  <p>{`${user_pseudo}`}</p>
                  <p>{`${user_role}`}</p>
                </UserInfos>
              </UserProfile>
              <UserActions>
                <div>
                  <img src="assets/images/icons/icon-delete.svg" alt="" />
                  <img src="assets/images/icons/icon-write.svg" alt="" />
                </div>
              </UserActions>
              <UserExtend onClick={handlerShowDrawer}>
                <img src="assets/images/icons/icon-chevron.svg" alt=""
                  style={{ transform: ShowDrawerOnClick ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </UserExtend>
            </UserHeader>

            {ShowDrawerOnClick ? (
              <UserDrawerUl>
                <UserDrawerLi>
                  <p><span>Nom : </span>{`${user_lastname}`}</p>
                </UserDrawerLi>
                <UserDrawerLi>
                  <p><span>Prénom : </span>{`${user_firstname}`}</p>
                </UserDrawerLi>
                <UserDrawerLi>
                  <p><span>Email : </span>{`${user_email}`}</p>
                </UserDrawerLi>
              </UserDrawerUl>
            ) : null}
          </Li>




        </UserCardUl>
      </UserCardContainer>
    </>
  );
};
export default UserCards;
