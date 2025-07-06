import './App.css'
import Home from './components/Home/Home'
import Sidebar from './components/Sidebar/Sidebar';
import React from 'react';

function App() {
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
