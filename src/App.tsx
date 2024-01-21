import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Reset } from 'styled-reset';
import { GlobalStyle } from './globalstyle';
import styled from 'styled-components';


import { LoginContext } from './contexts/LoginContext';
import { UserDataType } from './interfaces/types';

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


const Space = styled.div`
    height: 100px;
    width: 100%;
`;



const App = () => {
  
  const [user, setUser] = useState<UserDataType | null>(null);

  
  return (
    <>
      <Reset />
      <GlobalStyle />
      <BrowserRouter>
<LoginContext.Provider value={{ user, setUser }}>
         <Navbar />
          <Space>

          </Space>
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
</LoginContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
