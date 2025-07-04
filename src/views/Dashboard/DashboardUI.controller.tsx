import { useDashboardUIHook } from "./DashboardUI.hook";
import DashboardUIView from "./DashboardUI.view";

export const DashboardUI = () => {
    const hookData = useDashboardUIHook();

    return <DashboardUIView {...hookData} />;
};
