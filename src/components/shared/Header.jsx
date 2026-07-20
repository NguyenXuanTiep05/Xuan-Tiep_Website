import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useGlobal } from '../../hooks/UseGlobal';


const Header = () => {
	const [error, setError] = useState(null);
	const {setIsLogged} = useGlobal();


	const LogOut = async () => {
	
	    try {
	        const response = await fetch("https://xuan-tiep.com/api/auth/logout", {
	            method: "POST",
	            headers: { "Content-Type": "application/json" },
				credentials: "include" 
	        });
		
	        if (!response.ok) {
	            setError("There was problem with logging you out");
	            return;
	        }
			setIsLogged(false);
		
	    } catch {
	        setError(`Something went wrong`);
	    }
	}



 	return (
		<div className='absolute top-0 w-full h-15 border-b border-(--border) flex items-center pl-30 pr-14 z-50'>
			<Link to="/" className='text-3xl font-bold hover:-translate-y-0.5 transition-transform duration-100 text-(--text) '>Xuan Tiep</Link>
			<button onClick={() => LogOut()} className='ml-auto text-(--text-muted) cursor-pointer hover:text-(--text) hover:font-bold transition-all duration-150'>Log out</button>
		</div>
 	)
}

export default Header