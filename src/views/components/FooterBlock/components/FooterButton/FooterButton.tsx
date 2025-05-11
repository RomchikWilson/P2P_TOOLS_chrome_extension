import React, { MouseEventHandler } from "react";
import styles from "./FooterButton.module.css";

interface Props {
    title: string;
    disabled?: boolean;
    color?: string;
    hoverColor?: string;
    onClick: MouseEventHandler;
}

const FooterButton: React.FC<Props> = ({ 
    title, 
    disabled = false,
    color = '',
    hoverColor = '',
    onClick,
}) => {
    return (
        <button 
            className={ styles.footerButton } 
            style={{ backgroundColor: color }}
            onMouseEnter={(e) => {
                if (hoverColor) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = hoverColor;
                }
            }}
            onMouseLeave={(e) => {
                if (color) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = color;
                }
            }}
            disabled={disabled}
            onClick={onClick}
        > {title} </button>
    );
};
  
export default FooterButton;