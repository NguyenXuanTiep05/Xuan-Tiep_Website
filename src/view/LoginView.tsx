import LoginForm from '../components/Login/LoginForm'

import { useGlobal } from '../hooks/UseGlobal'


import '../assets/LoginView.css'
import { useEffect } from 'react';


const LoginView = () => {

	const { setTitle } = useGlobal();
	useEffect(() =>{
			setTitle("Please log in");
	},[setTitle]);
  return (
	<>
	<div className='animate panel-left w-1/2 h-full bg-(--bg-dark) text-(--text) flex items-center justify-center'>

	</div>
	<LoginForm/>

	<div className='animate panel-right w-1/2 h-full bg-(--bg-dark) text-(--text) flex items-center justify-center'>
	</div>
	</>
  )
}

export default LoginView