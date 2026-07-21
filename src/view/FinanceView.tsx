import { useEffect } from 'react';

import { useGlobal } from '../hooks/UseGlobal'

import Header from '../components/shared/Header';



const FinanceView = () => {
	const { setTitle } = useGlobal();
    useEffect(() => {
	    setTitle("Finances");
    }, [setTitle])

    return (
        
        <div className='w-full h-full pt-15 text-(--text)'>
            <Header/>
            <div className='slide-in w-full h-full main-bg p-5'>

            </div>
        </div>
        

    );
}

export default FinanceView