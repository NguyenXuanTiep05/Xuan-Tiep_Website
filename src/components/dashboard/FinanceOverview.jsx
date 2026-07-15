import React from 'react'
import '../../assets/FinanceOverview.css'

import { useEffect ,useState} from 'react'

const FinanceOverview = () => {
    const [data, setData] = useState([]);
    const [err, setErr] = useState("");
    useEffect(() => {
        fetch("https://xuan-tiep.com/api/finance/overview", {
			credentials: "include"
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error: ${res.status}`);
            }
            return res.json();
        })
        .then(json => {
			console.log(json);
            setData(json);
        })
        .catch(error => {
            setErr(error.message);
        })
    },[]);

	const income = data[0]?.totalIncome ?? 0;
	const expenses = data[0]?.totalExpenses ?? 0;
	const curr = data[0]?.currency ?? "";
	const procent = ((expenses * 100) / income);


	return (
		<div className='w-[40%] bg-(--bg) rounded-sm p-5'>
			<h2 className='font-semibold text-sm text-(--warning)'>{err}</h2>
			<h2 className='font-semibold text-xl'>Finance Overview</h2>
			<div className='w-full flex flex-row'>
				<h3 className='font-medium text-md'>Spending</h3>
				<h3 className='ml-auto font-medium text-md text-(--success)'>{expenses} {curr}</h3>
			</div>
			<div className='w-full h-5 bg-(--bg-light)'>
				<div className='fill h-full bg-(--warning)' style={{ width: `${procent}%` }}></div>
			</div>
			<div className='w-full flex flex-row'>
				<h3 className='font-medium text-md'>Income</h3>
				<h3 className='ml-auto font-medium text-md text-(--success)'>{income} {curr}</h3>
			</div>
			<div className='w-full h-5 bg-(--bg-light)'>
				<div className='fill w-full h-full bg-(--success)'></div>
			</div>
		</div>
	)
}

export default FinanceOverview