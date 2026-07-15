

import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import LoginView from "./view/LoginView";
import DashboardView from "./view/DashboardView.jsx";

import { useGlobal } from "./hooks/UseGlobal.jsx";

import darkIcon from '/dashboardBlack.png'
import lightIcon from '/dashboardWhite.png'


function ProtectedRoute({ isLogged, children }) {
  return isLogged ? children : <Navigate to="/login" replace />;
}

function PublicOnlyRoute({ isLogged, children }) {
  return isLogged ? <Navigate to="/" replace /> : children;
}


const useFavicon = () => {
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    
    const setFavicon = (isDark) => {
      document.querySelector('#favicon').href = isDark
        ? lightIcon
        : darkIcon
    }

    setFavicon(media.matches)
    media.addEventListener('change', (e) => setFavicon(e.matches))
    return () => media.removeEventListener('change', (e) => setFavicon(e.matches))
  }, [])
}

const useTitle = (title) => {
  const titleEl = document.querySelector("#title")
  titleEl.innerHTML = title;
}

function App() {
  const { isLogged , title} = useGlobal();

  useFavicon()
  useTitle(title)

  if (isLogged === undefined) return null;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={
            <PublicOnlyRoute isLogged={isLogged}>
              <LoginView/>
            </PublicOnlyRoute>
          }></Route>
          <Route path='/*' element={
            <ProtectedRoute isLogged={isLogged}>
              <DashboardView/>
            </ProtectedRoute>
          }></Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App
