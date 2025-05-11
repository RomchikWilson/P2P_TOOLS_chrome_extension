import React from "react";
import styles from "./Divider.module.css";

type Props = {
    type: 'horizontal' | 'vertical',
    margin?: number,
};

const Divider: React.FC<Props> = ({ type, margin=0 }) => {
    const isHorizontal = type === 'horizontal';

    return (
        <hr className={styles.divider}
            style={{
                width: isHorizontal ? '100%' : '1px',
                height: isHorizontal ? '1px' : '100%',
                margin: isHorizontal ? `${margin}px 0` : `0 ${margin}px`,
            }}
        />
    );
};

export default Divider;