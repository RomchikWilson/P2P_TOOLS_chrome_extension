import styles from "./LoadingView.module.css";

const LoadingView = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
        </div>
    );
};

export default LoadingView;