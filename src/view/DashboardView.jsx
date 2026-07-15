import { useEffect } from 'react';

import { useGlobal } from '../hooks/UseGlobal'

import Header from '../components/shared/Header';

import FinanceOverview from '../components/dashboard/FinanceOverview';


const DashboardView = () => {
	const { setTitle } = useGlobal();
    useEffect(() => {
	    setTitle("Dashboard");
    }, [setTitle])

    return (
        
        <div className='slide-in w-full h-full pt-15 text-(--text)'>
            <Header/>
            <div className='w-full h-full p-5'>
                <FinanceOverview/>
            </div>
        </div>
        

    );
};

export default DashboardView;