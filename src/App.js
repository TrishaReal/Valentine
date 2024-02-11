import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BeMyValentine from './pages/beMyValentine';
import Intro from './pages/intro';
import Page404 from './pages/page404';
import HappyValentineDay from './pages/happyValentineDay';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Intro />} />
          <Route exact path="/be-my-valentine" element={<BeMyValentine />} />
          <Route path="/happy-valentine-day" element={<HappyValentineDay />} />
          <Route path="*" element={<Page404/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
