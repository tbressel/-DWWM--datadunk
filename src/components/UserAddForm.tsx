import styled from "styled-components";
import { colors } from "../colors";
import { on } from "events";


const Mask = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100vw;
    height: 100vh;
    background: rgba(17, 15, 26, 0.60);
    z-index: 1000;
`;
const UserAddFormContainer = styled.div`

display: flex;
padding: 25px 0px;
flex-direction: column;
border-radius: 20px;
background: ${colors.blanc};
position: relative;
top: 172px;
width: 90%;

`;
const UserAddFormTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    p {
            color: ${colors.bleu};
            font-family: 'Barlow Medium';
  
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            letter-spacing: -0.13px;
        }
        `;
const UserAddFormInputContainer = styled.div`   
    display: flex;
    padding: 15px 38px;
    flex-direction: column;  
    align-items: center;
    gap: 50px;
    
    `;
const InputField = styled.div`
        font-family: 'Barlow Medium';
        width: 100%;
            input {
                margin-top: 10px;
                width: 100%;
                height: 48px;
                border-radius: 10px;           
                background: ${colors.violet1};
                font-family: 'Barlow Medium';
                font-size: 13px;             
                font-weight: 600;             
                color: ${colors.violet3};
            }
    `;
const UserAddFormCheckboxContainer = styled.div`   
    display: flex;
    padding: 15px 38px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 50px;
    flex-wrap: wrap;

        .checkbox__container {        
            display: flex;
            width: 150px;
            height: 42px;
            justify-content: center;
            align-items: center;
            gap: 10px;

                input {
                    display: flex;
                    width: 159px;
                    height: 42px;
                    justify-content: center;
                    align-items: center;
                    gap: 14.292px;
                }
        }
`;
const UserAddFormPasswordContainer = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 15px;
    padding: 30px;

        .button__eye {
            display: flex;
            align-items: flex-end;
            gap: 15px;
            align-self: end;
            width: 40px;
            height: 40px;

            img {
                width: 40px;
            height: 40px;

            }
        }
`;
const UserAddFormButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 74px;
    align-self: stretch; 
`;
const UserAddPlainButton = styled.button`
    cursor: pointer;
    display: inline-flex;
    height: 50px;
    padding: 10px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 5px;
    background: var(--Orange, #E1533D);

    color: var(--Violet-1, #F3F2F8);

    /* Corps de texte */
    font-family: Barlow;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.13px;

`;
const UserAddEmptyButton = styled.button`
    cursor: pointer;
    display: inline-flex;
    height: 50px;
    padding: 10px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    border-radius: 5px;
    background: var(--blanc, #FFF);
    color: var(--orange, #E1533D);

    /* Corps de texte */
    font-family: Barlow;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.13px;

`;


const UserAddForm = () => {


    const onCancelButtonClicked = () => {
  
    }

    return (
        <>

            <Mask>

                <UserAddFormContainer>
                    <UserAddFormTitle>
                        <p>Ajouter un utilisateur</p>
                    </UserAddFormTitle>

                    <UserAddFormInputContainer>
                        <InputField>
                            <label htmlFor="lastnameField"><p>Nom </p>
                                <input id="lastnameField" name="lastname" type="text" placeholder="Saisissez votre nom ici ..." required autoComplete="userlastname" />
                            </label>
                        </InputField>
                        <InputField>
                            <label htmlFor="firstnameField"><p>Prénom </p>
                                <input id="firstnameField" name="firstname" type="text" placeholder="Saisissez votre prénom ici ..." required autoComplete="userfirstname" />
                            </label>
                        </InputField>
                        <InputField>
                            <label htmlFor="nicknameField"><p>Pseudo </p>
                                <input id="nicknameField" name="nickname" type="text" placeholder="Saisissez votre pseudo ici ..." required autoComplete="usernickname" />
                            </label>
                        </InputField>
                        <InputField>
                            <label htmlFor="emailField"><p>Email </p>
                                <input id="emailField" name="email" type="text" placeholder="Saisissez votre email ici ..." required autoComplete="useremail" />
                            </label>
                        </InputField>
                    </UserAddFormInputContainer>
                    <UserAddFormCheckboxContainer>
                        <div className="checkbox__container" >
                            <label htmlFor="checkbox1">Coatch</label>
                            <input type="checkbox" id="checkbox1" name="coatch" />
                        </div>
                        <div className="checkbox__container" >
                            <label htmlFor="checkbox2">Utilisateur</label>
                            <input type="checkbox" id="checkbox2" name="user" />
                        </div>
                        <div className="checkbox__container" >
                            <label htmlFor="checkbox3">Invité</label>
                            <input type="checkbox" id="checkbox3" name="guest" />
                        </div>
                        <div className="checkbox__container" >
                            <label htmlFor="checkbox4">Autre</label>
                            <input type="checkbox" id="checkbox4" name="other" />
                        </div>
                    </UserAddFormCheckboxContainer>

                    <UserAddFormPasswordContainer>
                        <InputField>
                            <label htmlFor="passwordField"><p>Mot de passe </p>
                                <input id="passwordField" name="password" type="text" placeholder="Saisissez votre mot de passe ici ..." required autoComplete="password" />
                            </label>
                        </InputField>
                        <div className="button__eye">
                            <img src="./assets/images/icons/icon-eye-close.svg" alt="" />
                        </div>
                        {/* <UserAddPlainButton type="submit">Générer</UserAddPlainButton> */}
                    </UserAddFormPasswordContainer>
                    <UserAddFormPasswordContainer>
                        <InputField>
                            <label htmlFor="passwordCheckField"><p>Resaisissez votre mot de passe </p>
                                <input id="passwordCheckField" name="passwordcheck" type="text" placeholder="Resaisissez votre mot de passe ici ..." required autoComplete="passwordcheck" />
                            </label>
                        </InputField>
                        <div className="button__eye">
                            <img src="./assets/images/icons/icon-eye-close.svg" alt="" />
                        </div>
                        {/* <UserAddPlainButton type="submit">Générer</UserAddPlainButton> */}
                    </UserAddFormPasswordContainer>

                    <UserAddFormButtonContainer>
                        <UserAddEmptyButton onClick={onCancelButtonClicked}>Annuler</UserAddEmptyButton>
                        <UserAddPlainButton type="submit">Valider</UserAddPlainButton>
                    </UserAddFormButtonContainer>
                </UserAddFormContainer>

            </Mask>



        </>
    );
}

export default UserAddForm;