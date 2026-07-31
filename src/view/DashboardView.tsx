import Header from "../components/shared/Header";

import FinanceOverview from "../components/dashboard/FinanceOverview";

const DashboardView = () => {
    return (
        <section className="slide-in w-full h-full pt-15 text-(--text)">
            <Header />
            <div className="content-wrapper">
                <FinanceOverview />
            </div>
        </section>
    );
};

export default DashboardView;
