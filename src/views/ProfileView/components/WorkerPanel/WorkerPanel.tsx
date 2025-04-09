import styles from "./WorkerPanel.module.css"
import ToolPanel from "./components/ToolPanel/ToolPanel.tsx";
import InfoBlock from "./components/InfoBlock/InfoBlock.tsx";
import OrdersPanel from "./components/OrdersPanel/OrdersPanel.tsx";
import { ProfileData } from "../../../../types/profileTypes.ts";


interface Props {
    data: ProfileData;
}

const WorkerPanel: React.FC<Props> = ({ data }) => {
    return (
        <div className={styles.workerPanel}>
            <ToolPanel />
            <InfoBlock userInfo={data.userInfo} results={data.results}/>
            <OrdersPanel activeOrders={data.activeOrders}/>
        </div>
    );
};

export default WorkerPanel;