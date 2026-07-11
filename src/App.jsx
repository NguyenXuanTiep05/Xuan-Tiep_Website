

import { useEffect } from 'react'


import LoginView from "./view/LoginView";
import DashboardView from "./view/DashboardView.jsx";

import { useGlobal } from "./hooks/UseGlobal.jsx";

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
      {isLogged ? (
          <DashboardView />
      ) : (
          <LoginView />
      )}
    </>
  );
}

export default App
