import React from 'react'

import { useAuth } from "../hooks/UseAuth.jsx";

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
 	const { setIsLogged } = useAuth();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");


	const [error, setError] = useState(null);

	const handleLogin = async (e) => {

		SidePanelAnimation()
		setTimeout(() => {
        	setIsLogged(true);
		}, 900);
	    e.preventDefault();
	    setError(null);

	    try {
	        const response = await fetch("https://xuan-tiep.com/api/login", {
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

	    } catch (err) {
			
	        setError(`Something went wrong`);
	    }
	};

	return (
		<div id='login-form' className='animate z-10 absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 w-120 h-93 bg-(--bg) rounded-2xl shadow-sm shadow-gray-300 p-6 text-(--text)'>

			{/* <span className='text-red-700'>{error}</span> */}
			<form onSubmit={handleLogin}>
				<h1 className='text-4xl font-bold'>Log in</h1>
				<hr className='mb-6 mt-3 border-(--border)'/>
				<label className='text-xl'>Username:</label><br/>
				<input name='username' type='text' placeholder='Enter your username' 
					className='mt-2 h-10 w-full bg-(--highlight) rounded-lg px-3 text-(--bg-dark) placeholder-(--bg-light) outline-none border border-(--bg-light) focus:border-(--text) transition-colors duration-200'
					onChange={(e) => setUsername(e.target.value)}/>
				<label className='text-xl'>Password:</label><br/>
				<input name='password' type='password' placeholder='Enter your password' 
					className='mt-2 h-10 w-full bg-(--highlight) rounded-lg px-3 text-(--bg-dark) placeholder-(--bg-light) outline-none border border-(--bg-light) focus:border-(--text) transition-colors duration-200'
					onChange={(e) => setPassword(e.target.value)}/>

				<div className=' flex w-100%'>
					<button  onClick={handleLogin} type='submit' id='login-btn' className='primary-btn ml-auto mt-6'>Log in</button>
				</div>

			</form>
		</div>
	)
}

export default LoginForm