import styles from "./ProfileView.module.css"
import Header from "../components/Header/Header.tsx";
import WorkerPanel from "./components/WorkerPanel/WorkerPanel.tsx";

const ProfileView: React.FC = () => {
    return (
        <div className={styles.base}>
            <Header
                text={"Profile"}
                showLogoutBtn={true} />
            <WorkerPanel />
        </div>
    );
};

export default ProfileView;
