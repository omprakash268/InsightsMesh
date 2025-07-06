import './App.css'
import Home from './components/Home/Home'
import Sidebar from './components/Sidebar/Sidebar'

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
