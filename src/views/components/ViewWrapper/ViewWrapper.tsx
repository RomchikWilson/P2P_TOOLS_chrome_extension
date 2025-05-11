import React, { ReactNode } from "react";
import styles from "./ViewWrapper.module.css";
import LoadingView from "../../LoadingView/LoadingView";

interface Props {
  children: ReactNode;
  loading?: boolean;
  hasError?: boolean;
}

//@ts-ignore
const ViewWrapper: React.FC<Props> = ({ children, loading = false, hasError = false }) => {
  if (loading) return <LoadingView />;

  return (
    <div className={styles.view}>
      {children}
    </div>
  );
};

export default ViewWrapper;
