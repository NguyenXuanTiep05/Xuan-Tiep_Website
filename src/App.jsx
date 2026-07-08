

import { useEffect, lazy, Suspense } from 'react'


const LoginView = lazy(() => import("./view/LoginView"));
const DashboardView = lazy(() => import("./view/DashboardView.jsx"));

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

  if (isLogged === undefined) return null; // or a spinner

  return (
    <>
      {isLogged ? (
        <Suspense fallback={<div className='m-auto text-white text-6xl'>Loading...</div>}>
          <DashboardView />
        </Suspense>
      ) : (
        <Suspense fallback={<div className='m-auto text-white text-6xl'>Loading...</div>}>
          <LoginView />
        </Suspense>
      )}
    </>
  );
}

export default App
