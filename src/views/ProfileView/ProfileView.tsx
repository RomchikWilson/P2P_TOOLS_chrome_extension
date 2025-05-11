import HeaderBlock from "../components/HeaderBlock/HeaderBlock.tsx";
import { getProfileData } from "../../api/profileAPI.ts";
import ContentBlock from "../components/ContentBlock/ContentBlock.tsx";
import ViewWrapper from "../components/ViewWrapper/ViewWrapper.tsx";
import InfoBlock from "./components/InfoBlock/InfoBlock.tsx";
import ToolPanel from "./components/ToolPanel/ToolPanel.tsx";
import OrdersPanel from "./components/OrdersPanel/OrdersPanel.tsx";
import { useLoadingData } from "../../utils/useLoadingData.ts";

const ProfileView: React.FC = () => {
    const { data, loading, hasError } = useLoadingData(getProfileData, "profile");

    return (
        <ViewWrapper loading={loading} hasError={hasError}>
            { data && (
                <>
                    <HeaderBlock text={"Profile"} showLogoutBtn={true} />
                    <ContentBlock>
                        <ToolPanel />
                        <InfoBlock userInfo={data.userInfo} results={data.results}/>
                        <OrdersPanel activeOrders={data.orders}/>
                    </ContentBlock>
                </>
            )}
        </ViewWrapper>
    );
};

export default ProfileView;