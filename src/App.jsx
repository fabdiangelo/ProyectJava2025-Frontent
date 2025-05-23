import React from 'react';
import { 
  createBrowserRouter, 
  RouterProvider,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import VideoCurso from './pages/VideoCurso';
import Session11 from './pages/Session11';
import Layout from './components/Layout';
import Paquete from './pages/Paquete';

import Index from './pages/Index';
import PaqueteMenu from './pages/PaqueteMenu';
import CursoMenu from './pages/CursoMenu';
import PaqueteModificar from './pages/PaqueteModificar';
import CursoModificacion from './pages/CursoModificacion';
import Pago from './pages/Pago';
import Carrito from './pages/Carrito';
import Curso from './pages/Curso';

import CryptoJS from 'crypto-js';

// Función para encriptar
export function encryptToken(token) {
  return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
}

// Función para desencriptar
export function decryptToken(encryptedToken) {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}


// Configurar las rutas con las nuevas banderas
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/VideoCurso" element={<VideoCurso />} />
      <Route path="/session11" element={<Session11 />} />
      <Route path="/index" element={<Index />} />
      <Route path="/AgregarPaquete" element={<PaqueteMenu />} />
      <Route path="/AgregarCurso" element={<CursoMenu />} />
      <Route path="/ModificarPaquete" element={<PaqueteModificar />} />
      <Route path="/ModificarCurso" element={<CursoModificacion />} />
      <Route path="/Pago" element={<Pago />} />
      <Route path="/Carrito" element={<Carrito />} />
      <Route path="/Paquete" element={<Paquete />} />
      <Route path="/Curso" element={<Curso />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
