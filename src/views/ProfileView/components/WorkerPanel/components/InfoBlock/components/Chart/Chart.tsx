import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { ResultData } from "../../../../../../../../types/profileTypes";


interface Props {
    currentMonth: ResultData;
}

const Chart: React.FC<Props> = ({ currentMonth }) => {
    const monthResults = useMemo(() => [
        { label: "Income", value: currentMonth.income },
        { label: "Bonus", value: currentMonth.bonus },
        { label: "Loss", value: currentMonth.loss },
    ], [currentMonth]);

    const hasData = monthResults.reduce((sum, item) => sum + item.value, 0) > 0;

    const COLORS = ['#4caf50', '#2196f3', '#f44336'];

    const renderCustomLabel = ({ percent }: { percent: number }) => (
        percent > 0 ? `${(percent * 100).toFixed(0)}%` : ""
    );

    return (
        <ResponsiveContainer width="100%" height={157}>
            <PieChart>
                <Pie
                    data={hasData ? monthResults : [{ label: "No data", value: 1 }]}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="56%"
                    outerRadius={40}
                    labelLine={false}
                    label={hasData ? renderCustomLabel : () => ""}
                >
                    {(hasData ? monthResults : [{ value: 1 }]).map((_, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={hasData ? COLORS[index % COLORS.length] : '#555'}
                            stroke="none"
                        />
                    ))}
                </Pie>
                {hasData && (<Tooltip wrapperStyle={{ wordBreak: 'break-word', whiteSpace: 'normal' }} />)}
                <Legend verticalAlign='bottom' wrapperStyle={{ whiteSpace: 'normal', wordBreak: 'break-word' }} />
            </PieChart>
        </ResponsiveContainer>
    );
};


export default Chart;
