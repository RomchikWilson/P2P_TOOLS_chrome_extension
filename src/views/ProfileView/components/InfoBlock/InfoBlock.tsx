import React, { useMemo } from "react";
import styles from "./InfoBlock.module.css";
import Chart from "./components/Chart/Chart";
import { ResultsData, UserData } from "../../../../types/profileTypes";
import Panel from "../../../components/Panel/Panel";

interface Props {
    userInfo: UserData;
    results: ResultsData;
}

const InfoBlock: React.FC<Props> = ({ userInfo, results }) => {
    const generalDetails = useMemo(() => [
        { label: "Full name", value: userInfo.fullName },
        { label: "Debt", value: userInfo.debt },
        { label: "Interest rate", value: userInfo.interestRate },
    ], [userInfo]);

    const todayResults = useMemo(() => [
        { label: "Income", value: results.currentDay.income, valueColor: styles.valueGreen },
        { label: "Bonuses", value: results.currentDay.bonus, valueColor: styles.valueBlue },
        { label: "Loss", value: results.currentDay.loss, valueColor: styles.valueRed },
    ], [results]);

    const renderDetailsBlock = (details: { label: string; value: string | number; valueColor?: string }[]) => (
        details.map((item, index) => (
            <div key={index} className={styles.detailItem}>
                <span className={styles.label}>{item.label}:</span>
                <span className={item.valueColor && item.value ? item.valueColor : styles.valueDefault}>
                    {item.value}
                </span>
            </div>
        ))
    );

    return (
        <Panel>
            <div className={styles.infoBlock}>
                <div className={styles.leftBlock}>
                    <h2 className={styles.title}>General info</h2>
                    {renderDetailsBlock(generalDetails)}
                    <div className={styles.todayResults}>
                        <h2 className={styles.title}>Today's Results</h2>
                        {renderDetailsBlock(todayResults)}
                    </div>
                </div>
                <div className={styles.rightBlock}>
                    <h2 className={styles.rightTitle}>Monthly Breakdown</h2>
                    <Chart currentMonth={results.currentMonth} />
                </div>
            </div>
        </Panel>
    );
};

export default InfoBlock;
