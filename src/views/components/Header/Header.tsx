import { useAuth } from "../../../context/AuthContext";
import styles from "./Header.module.css";
import HeaderButton from "./components/HeaderButton/HeaderButton";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "../../../assets/icons/logout.png";
import BackIcon from "../../../assets/icons/back.png";


interface HeaderProps {
  text: string;
  showLogoutBtn?: boolean;
  showBackBtn?: boolean;
}

const Header: React.FC<HeaderProps> = ({ text, showLogoutBtn = false, showBackBtn = false }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const backToProfile = () => {
    navigate('/profile');
    console.log('backToProfile - Complete')
  };

  return (
    <div className={styles.header}>
      <HeaderButton 
        showBtn={showBackBtn} 
        title="Back" 
        imgSrc={BackIcon}
        onClick={backToProfile}
      />
      <h2 className={styles.title}>{text}</h2>
      <HeaderButton 
        showBtn={showLogoutBtn} 
        title="Logout" 
        imgSrc={LogoutIcon}
        onClick={logout}
        color='red'
      />
    </div>
  );
};

export default Header;