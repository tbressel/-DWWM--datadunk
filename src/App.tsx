////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////
import { API_BASE_URL } from './config';


// Style importations
import { Reset } from 'styled-reset';
import { GlobalStyle } from './globalstyle';
import styled from 'styled-components';


// React importations
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Context importation
import { LoginContext } from './contexts/LoginContext';
import { NotificationContext } from './contexts/NotificationContext';




// Types importation
import { UserDataType } from './interfaces/types';
import { NotificationDataType } from './interfaces/types';


// Components importation
import Home from './pages/Home';
import Articles from './pages/Articles';
import Guides from './pages/Guides';
import Leagues from './pages/Leagues';
import Matches from './pages/Matches';
import Teams from './pages/Teams';
import Players from './pages/Players';
import Error from './pages/Error';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import Header from './components/Header';


////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////
const Space = styled.div`
    height: 100px;
    width: 100%;
    `;


////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const App = () => {

 



  // declaration of the state variables
  const [user, setUser] = useState<UserDataType | null>(null);
  const [msg, setMsg] = useState<NotificationDataType | null>(null);

  // const [seasonsList, setSeasonsList] = useState<any[]>([]); 
  // const [teamsList, setTeamsList] = useState<any[]>([]); 
  // const [leaguesList, setLeaguesList] = useState<any[]>([]); 
  


  return (
    <>
      
      <LoginContext.Provider value={{ user, setUser }}>
        <NotificationContext.Provider value={{ msg, setMsg }}>
            <Reset />
            <GlobalStyle />
            <BrowserRouter>
    
              <Navbar /> 
              <Space></Space>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/articles' element={<Articles />} />
                <Route path='/guides' element={<Guides />} />
                <Route path='/leagues' element={<Leagues />} />
                <Route path='/matches' element={<Matches />} />
                <Route path='/teams' element={<Teams />} />
                <Route path='/players' element={<Players />} />
                <Route path='/admin' element={<Admin />} />
                <Route path="*" element={<Error />} />
              </Routes>
      
             
            </BrowserRouter>
        </NotificationContext.Provider>
      </LoginContext.Provider>
        

    </>
  );
}

export default App;
