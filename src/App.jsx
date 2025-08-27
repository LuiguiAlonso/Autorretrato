import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MusicProvider } from './componentes/MusicContext'
import MusicControls from './componentes/MusicControls'
import Uno from './componentes/Uno'
import Dos from './componentes/Dos'
import Tres from './componentes/Tres'
import Cuatro from './componentes/Cuatro'
import Cinco from './componentes/Cinco'

function App() {
  return (
    <MusicProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Uno />} />
            <Route path="/dos" element={<Dos />} />
            <Route path="/tres" element={<Tres />} />
            <Route path="/cuatro" element={<Cuatro />} />
            <Route path="/cinco" element={<Cinco />} />
          </Routes>
          {/* Controles de música flotantes - aparecerán en todas las rutas */}
          <MusicControls />
        </div>
      </Router>
    </MusicProvider>
  )
}

export default App