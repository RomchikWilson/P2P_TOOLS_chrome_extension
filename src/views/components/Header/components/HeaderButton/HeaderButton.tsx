import styles from "./HeaderButton.module.css";
import { MouseEventHandler } from "react";


interface HeaderProps {
  showBtn: boolean;
  title: string;
  imgSrc: string;
  onClick: MouseEventHandler;
  color?: 'red';
}

const HeaderButton: React.FC<HeaderProps> = ({ showBtn, title, imgSrc, onClick, color }) => {
  if (showBtn) {
    return (
      <button 
        className={`${styles.headerButton} ${color ? styles[color] : ''}`} 
        title={title} 
        onClick={onClick}
      >
        <img src={imgSrc} alt={title} className={styles.buttonIcon} />
      </button>
    );
  }
};

export default HeaderButton;