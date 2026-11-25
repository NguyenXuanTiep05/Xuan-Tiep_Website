import FinanceOverview from "../components/dashboard/FinanceOverview";
import Clock from "@/components/shared/Clock";

const DashboardView = () => {
    return (
        <div className="slide-in content-wrapper flex gap-4">
            <Clock
                dTimeClassName=""
                ContainerClassName="card w-[200] h-fit"
                showFocus={false}
            />
            <FinanceOverview />
        </div>
    );
};

export default DashboardView;
