import React from 'react'

const LogOut = async () => {
    try {
        const response = await fetch("https://xuan-tiep.com/api/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
			credentials: "include" 
        });

        if (!response.ok) {
            setError("There was problem with logging you out");
            return;
        }
		window.location.reload();

    } catch {
        setError(`Something went wrong`);
    }
}


const Header = () => {
  return (
	<div className='absolute top-0 w-full h-15 border-b border-(--border) flex items-center pl-30 pr-14'>
		<h1 className='text-3xl'>Dashboard</h1>
		<button onClick={() => LogOut} className='ml-auto text-(--text-muted) cursor-pointer'>Log out</button>
	</div>
  )
}

export default Header