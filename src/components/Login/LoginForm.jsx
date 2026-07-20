import React from 'react'

import { useGlobal } from "../../hooks/UseGlobal.jsx";

import { useState } from 'react'


const SidePanelAnimation = () =>{
	const animations = document.querySelectorAll(".animate");
	if (animations.length > 0 ) {
	  animations.forEach(element => {
	    element.classList.add('slide');
	  });
	}
}



const LoginForm = () => {
 	const { setIsLogged } = useGlobal();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");


	const [error, setError] = useState(null);

	const handleLogin = async (e) => {

	    e.preventDefault();
	    setError(null);

	    try {
	        const response = await fetch("https://xuan-tiep.com/api/auth/login", {
	            method: "POST",
	            headers: { "Content-Type": "application/json" },
	            body: JSON.stringify({ username, password }),  
				credentials: "include" 
	        });

	        if (!response.ok) {
	            setError("Invalid credentials");
	            return;
	        }
			SidePanelAnimation()
			setTimeout(() => {
	        	setIsLogged(true);
			}, 900);

	    } catch {
			
			
	        setError(`Something went wrong`);
	    }
	};

	return (
		<div id='login-form' className='animate z-10 absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 w-120 h-fit bg-(--bg) rounded-2xl shadow-sm shadow-(color:--border) p-6 text-(--text)'>

			<form onSubmit={handleLogin}>
				<h1 className='text-4xl font-bold'>Welcome Back</h1>
				<h1 className='text-sm text-(--text-muted) mt-1 mb-7 font-semibold'>Sign in to continue</h1>
				<div className='text-(--warning) mb-4 ml-4'>{error}</div>
				<label className='text-md text-(--text-lighter)'>Username:</label><br/>
				<input name='username' type='text' placeholder='Enter your username' autoComplete='off' 
					className='mt-2 h-10 w-full bg-(--bg-light) rounded-lg px-3 text-(--text) placeholder-(--bg-light) outline-none border border-(--bg-light)  focus:border-(--text-muted) transition-colors duration-200'
					onChange={(e) => setUsername(e.target.value)}/>
				<label className='text-md text-(--text-lighter)'>Password:</label><br/>
				<input name='password' type='password' placeholder='Enter your password' autoComplete='off' 
					className='mt-2 h-10 w-full bg-(--bg-light) rounded-lg px-3 text-(--text) placeholder-(--bg-light) outline-none border border-(--bg-light)  focus:border-(--text-muted) transition-colors duration-200'
					onChange={(e) => setPassword(e.target.value)}/>

				<div className=' flex w-100%'>
					<button  onClick={handleLogin} type='submit' id='login-btn' className='primary-btn ml-auto mt-6'>Log in</button>
				</div>

			</form>
		</div>
	)
}

export default LoginForm