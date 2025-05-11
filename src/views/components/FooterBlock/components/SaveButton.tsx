import React, { MouseEventHandler } from "react";
import FooterButton from "./FooterButton/FooterButton";

interface Props {
    disabled?: boolean; 
    onClick: MouseEventHandler;
}

const SaveButton: React.FC<Props> = ({ disabled = false, onClick }) => {
    return (
        <FooterButton 
            title={"Create"} 
            disabled={disabled}
            color="#005b8c" 
            hoverColor="#006b8c" 
            onClick={onClick} />
    );
};
  
export default SaveButton;