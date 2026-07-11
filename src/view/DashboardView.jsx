import { useEffect } from 'react';

import { useGlobal } from '../hooks/UseGlobal'

import Header from '../components/shared/Header';


const DashboardView = () => {
	const { setTitle } = useGlobal();
    useEffect(() => {
	    setTitle("DashBoard");
    }, [setTitle])

    return (
        
        <div className='slide-in w-full h-full text-(--text)'>
            <Header/>
        </div>
        

    );
};

export default DashboardView;