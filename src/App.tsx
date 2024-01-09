import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Reset } from 'styled-reset';

import { GlobalStyle } from './globalstyle';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Guides from './pages/Guides';
import Leagues from './pages/Leagues';
import Matches from './pages/Matches';
import Teams from './pages/Teams';
import Players from './pages/Players';
import Error from './pages/Error';



const App = () => {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/home' element={<Home />} />      
          <Route path='/articles' element={<Articles />} />      
          <Route path='/guides' element={<Guides />} />
          <Route path='/leagues' element={<Leagues />} />
          <Route path='/matches' element={<Matches />} />
          <Route path='/teams' element={<Teams />} />
          <Route path='/players' element={<Players />} />
          <Route path="*" element={<Error />} />    
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
