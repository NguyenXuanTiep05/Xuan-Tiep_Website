const DashboardView = () => {
    return (
        <div className='w-full h-full p-6 text-(--text)'>
            <h1 className='text-4xl font-bold'>Dashboard</h1>
            <hr className='mb-6 mt-3 border-(--border)'/>

            {/* Stats Row */}
            <div className='grid grid-cols-3 gap-4 mb-6'>
                <div className='bg-(--bg) rounded-2xl p-4 shadow-sm shadow-gray-300'>
                    <p className='text-(--bg-light)'>Total Users</p>
                    <h2 className='text-3xl font-bold'>1,284</h2>
                </div>
                <div className='bg-(--bg) rounded-2xl p-4 shadow-sm shadow-gray-300'>
                    <p className='text-(--bg-light)'>Active Sessions</p>
                    <h2 className='text-3xl font-bold'>42</h2>
                </div>
                <div className='bg-(--bg) rounded-2xl p-4 shadow-sm shadow-gray-300'>
                    <p className='text-(--bg-light)'>Revenue</p>
                    <h2 className='text-3xl font-bold'>$9,420</h2>
                </div>
            </div>

            {/* Recent Activity */}
            <div className='bg-(--bg) rounded-2xl p-4 shadow-sm shadow-gray-300'>
                <h2 className='text-xl font-bold mb-4'>Recent Activity</h2>
                <table className='w-full text-left'>
                    <thead>
                        <tr className='border-b border-(--border)'>
                            <th className='pb-2'>User</th>
                            <th className='pb-2'>Action</th>
                            <th className='pb-2'>Date</th>
                            <th className='pb-2'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { user: "admin", action: "Login", date: "2024-01-01", status: "Success" },
                            { user: "peter", action: "Update Profile", date: "2024-01-02", status: "Success" },
                            { user: "john", action: "Login", date: "2024-01-03", status: "Failed" },
                        ].map((row, i) => (
                            <tr key={i} className='border-b border-(--border)'>
                                <td className='py-2'>{row.user}</td>
                                <td className='py-2'>{row.action}</td>
                                <td className='py-2'>{row.date}</td>
                                <td className='py-2'>
                                    <span className={`px-2 py-1 rounded-lg text-sm ${row.status === "Success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                        {row.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardView;