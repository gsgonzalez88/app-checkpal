import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/start" element={<Welcome />} />
          {/* Futuras rutas como /agregar, /perfil, etc. */}
        </Routes>
      </main>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
