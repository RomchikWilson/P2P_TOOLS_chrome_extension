import { useAuth } from "../../../context/AuthContext";
import styles from "./Header.module.css";
import LogoutIcon from "../../../assets/icons/logout.png";


interface HeaderProps {
    text: string;
    showLogoutBtn?: boolean;
}

const Header: React.FC<HeaderProps> = ({ text, showLogoutBtn = false }) => {
  const { logout } = useAuth();

  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{text}</h2>
      {showLogoutBtn && (
        <button className={styles.logout_btn} title="Выйти" onClick={logout}>
            <img src={LogoutIcon} alt="Logout" className={styles.logoutIcon} />
        </button>
      )}
    </div>
  );
};

export default Header;