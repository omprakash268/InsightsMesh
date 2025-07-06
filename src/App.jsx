import './App.css'
import Home from './components/Home/Home'
import Sidebar from './components/Sidebar/Sidebar';
import React, { useEffect } from 'react';
import run from './config/gemini';

function App() {
  useEffect(()=>{
    const res = run("What is react ?");
    console.log(res);
  },[])
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
