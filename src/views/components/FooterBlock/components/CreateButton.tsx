import React, { MouseEventHandler } from "react";
import FooterButton from "../components/FooterButton/FooterButton";

interface Props {
    disabled?: boolean; 
    onClick: MouseEventHandler;
}

const CreateButton: React.FC<Props> = ({ disabled = false, onClick }) => {
    return (
        <FooterButton 
            title={"Create"} 
            disabled={disabled}
            color="#008c0c" 
            hoverColor="#00af0e" 
            onClick={onClick} />
    );
};
  
export default CreateButton;