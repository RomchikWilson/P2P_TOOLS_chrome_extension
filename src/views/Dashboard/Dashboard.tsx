import styles from "./Dashboard.module.css"
import Header from "../components/Header/Header.tsx";

const Dashboard: React.FC = () => {
    return (
        <div className={styles.base}>
            <Header text={"Profile"}/>
            <h2>Панель инструментов</h2>
            <p>Здесь будут твои инструменты!</p>
        </div>
    );
};

export default Dashboard;