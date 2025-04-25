import { useAuth } from "../../../context/AuthContext";
import styles from "./HeaderBlock.module.css";
import HeaderButton from "./components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "../../../assets/icons/logout.png";
import BackIcon from "../../../assets/icons/back.png";


interface Props {
  text: string;
  showLogoutBtn?: boolean;
  disableBackBtn?: boolean;
}

const HeaderBlock: React.FC<Props> = ({ text, showLogoutBtn = false, disableBackBtn = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleBackClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const shouldShowBack = location.pathname !== "/" && !disableBackBtn;

  return (
    <div className={styles.header}>
      <HeaderButton 
        showBtn={shouldShowBack} 
        title="Back" 
        imgSrc={BackIcon}
        onClick={handleBackClick}
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

export default HeaderBlock;