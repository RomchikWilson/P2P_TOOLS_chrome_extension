import React from "react";
import styles from "./ToolPanel.module.css";

import CheckReceiptIcon from "../../../../../../assets/icons/worker-tools/check-receipt.png";
import AnswerIcon from "../../../../../../assets/icons/worker-tools/answers.png";

const tools = [
    { id: 1, icon: CheckReceiptIcon, title: "Check the receipt" },
    { id: 2, icon: AnswerIcon, title: "Answers" },
];

const ToolPanel: React.FC = () => {
    return (
        <div className={styles.toolPanel}>
            {tools.map((tool) => (
                <button key={tool.id} className={styles.toolButton} title={tool.title}>
                    <img src={tool.icon} alt={tool.title} className={styles.toolIcon} />
                </button>
            ))}
        </div>
    );
};

export default ToolPanel;