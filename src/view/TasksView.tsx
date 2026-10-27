"use client";
import Clock from "@/components/shared/Clock";

const TasksView = () => {
    return (
        <div className="slide-in content-wrapper">
            <div className="w-full h-full">
                <Clock
                    dTimeClassName=""
                    ContainerClassName="card w-[250] h-[250]"
                />
            </div>
        </div>
    );
};

export default TasksView;
