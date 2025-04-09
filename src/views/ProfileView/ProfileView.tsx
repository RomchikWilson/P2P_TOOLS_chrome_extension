import styles from "./ProfileView.module.css"
import Header from "../components/Header/Header.tsx";
import WorkerPanel from "./components/WorkerPanel/WorkerPanel.tsx";
import { useEffect, useState } from "react";
import Loading from "../LoadingView/LoadingView.tsx";
import { ProfileData } from "../../types/profileTypes.ts";
import { getProfileData } from "../../api/profileAPI.ts";

const ProfileView: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<ProfileData>();

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await getProfileData();
            if (data) {
                setData(data);
            }
            setIsLoading(false);
        };
    
        fetchProfile();
    }, []);

    if (isLoading || !data) return <Loading />;

    return (
        <div className={styles.base}>
            <Header text={"Profile"} showLogoutBtn={true} />
            <WorkerPanel data={data}/>
        </div>
    );
};

export default ProfileView;
