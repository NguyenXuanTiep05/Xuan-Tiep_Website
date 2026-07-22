import Header from '../components/shared/Header';

import FinanceOverview from '../components/dashboard/FinanceOverview';


const DashboardView = () => {

    return (
        
        <div className='slide-in w-full h-full pt-15 text-(--text)'>
            <Header/>
            <div className='w-full h-full main-bg p-5'>
                <FinanceOverview/>
            </div>
        </div>
        

    );
};

export default DashboardView;