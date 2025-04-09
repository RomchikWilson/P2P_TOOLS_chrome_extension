import styles from "./WorkerPanel.module.css"
import ToolPanel from "./components/ToolPanel/ToolPanel.tsx";
import InfoBlock from "./components/InfoBlock/InfoBlock.tsx";
import BuyOrdersPanel from "./components/BuyOrdersPanel/BuyOrdersPanel.tsx";
import { ProfileData } from "../../../../types/profileTypes.ts";


interface Props {
    data: ProfileData;
}

const WorkerPanel: React.FC<Props> = ({ data }) => {
    return (
        <div className={styles.workerPanel}>
            <ToolPanel />
            <InfoBlock userInfo={data.userInfo} results={data.results}/>
            <BuyOrdersPanel activeOrders={data.activeOrders}/>
        </div>
    );
};

export default WorkerPanel;