import styles from "./WorkerPanel.module.css"
import ToolPanel from "./components/ToolPanel/ToolPanel.tsx";

const WorkerPanel: React.FC = () => {
    return (
        <div className={styles.base}>
            <ToolPanel />
        </div>
    );
};

export default WorkerPanel;