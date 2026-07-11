import React from 'react'
import LoginForm from '../components/Login/LoginForm'

import { useGlobal } from '../hooks/UseGlobal'


import '../assets/LoginView.css'


const LoginView = () => {

	const { setTitle } = useGlobal();
	setTitle("Please log in");

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