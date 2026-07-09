

import { useEffect } from 'react'


import LoginView from "./view/LoginView";
import DashboardView from "./view/DashboardView.jsx";

import { useAuth } from "./hooks/UseAuth.jsx";

import darkIcon from '/dashboardBlack.png'
import lightIcon from '/dashboardWhite.png'





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

function App() {
  useFavicon()
  const { isLogged } = useAuth();

  if (isLogged === undefined) return null;

  return (
    <>
      {isLogged ? (
          <DashboardView />
      ) : (
          <LoginView />
      )}
    </>
  );
}

export default App
