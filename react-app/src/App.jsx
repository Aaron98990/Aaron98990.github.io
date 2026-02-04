import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Ejection from './pages/Ejection/Ejection'
import Map from './pages/Map/Map'
import Offside from './pages/Offside/Offside'
import Board from './pages/Board/Board'
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ejection" element={<Ejection />} />
        <Route path="/map" element={<Map />} />
        <Route path="/offside" element={<Offside />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </div>
  )
}

export default App