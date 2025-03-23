import styles from "./WorkerPanel.module.css"
import ToolPanel from "./components/ToolPanel/ToolPanel.tsx";
import InfoBlock from "./components/InfoBlock/InfoBlock.tsx";
import BuyOrdersPanel from "./components/BuyOrdersPanel/BuyOrdersPanel.tsx";

const WorkerPanel: React.FC = () => {
    return (
        <div className={styles.workerPanel}>
            <ToolPanel />
            <InfoBlock />
            <BuyOrdersPanel />
        </div>
    );
};

export default WorkerPanel;