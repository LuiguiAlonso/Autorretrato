import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Uno from './componentes/Uno'
import Dos from './componentes/Dos'
import Tres from './componentes/Tres'
import Cuatro from './componentes/Cuatro'
import Cinco from './componentes/Cinco'

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Uno />} />
          <Route path="/dos" element={<Dos />} />
          <Route path="/tres" element={<Tres />} />
          <Route path="/cuatro" element={<Cuatro />} />
          <Route path="/cinco" element={<Cinco />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App