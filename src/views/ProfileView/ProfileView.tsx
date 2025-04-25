import HeaderBlock from "../components/HeaderBlock/HeaderBlock.tsx";
import { useEffect, useState } from "react";
import Loading from "../LoadingView/LoadingView.tsx";
import { ProfileData } from "../../types/profileTypes.ts";
import { getProfileData } from "../../api/profileAPI.ts";
import ContentBlock from "../components/ContentBlock/ContentBlock.tsx";
import ViewWrapper from "../components/ViewWrapper/ViewWrapper.tsx";
import InfoBlock from "./components/InfoBlock/InfoBlock.tsx";
import ToolPanel from "./components/ToolPanel/ToolPanel.tsx";
import OrdersPanel from "./components/OrdersPanel/OrdersPanel.tsx";

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
        <ViewWrapper>
            <HeaderBlock text={"Profile"} showLogoutBtn={true} />
            <ContentBlock>
                <ToolPanel />
                <InfoBlock userInfo={data.userInfo} results={data.results}/>
                <OrdersPanel activeOrders={data.activeOrders}/>
            </ContentBlock>
        </ViewWrapper>
    );
};

export default ProfileView;
