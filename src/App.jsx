import './App.css'
import Home from './components/Home/Home'
import Sidebar from './components/Sidebar/Sidebar';
import React from 'react';
import useAutoLogout from './hook/useAutoLogout';

function App() {
  // 10 min autolout aftre inactivity
  useAutoLogout(10); 
  return (
    <>
      <div className="main-container">
        <Sidebar />
        <Home />
      </div>
    </>
  )
}

export default App
