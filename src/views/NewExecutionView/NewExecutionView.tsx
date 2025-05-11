import { useState } from "react";
import { Exchange } from "../../enums";
import Header from "../components/HeaderBlock/HeaderBlock";
import RoundedNumberInput from "../components/RoundedNumberInput/RoundedNumberInput";
import styles from "./NewExecutionView.module.css";
import { BaseExecutionData } from "../../types/ordersTypes";
import CustomSelect, { Option } from "../components/CustomSelect/CustomSelect";
import { useNavigate, useParams } from "react-router-dom";
import ViewWrapper from "../components/ViewWrapper/ViewWrapper";
import ContentBlock from "../components/ContentBlock/ContentBlock";
import FooterBlock from "../components/FooterBlock/FooterBlock";
import CreateButton from "../components/FooterBlock/components/CreateButton";
import { safeGoBack } from "../../utils/navigation";
import { createExecution } from "../../api/ordersAPI";
import Panel from "../components/Panel/Panel";

const NewExecutionView: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState<BaseExecutionData>({
        fiatAmount: 0,
        coinAmount: 0,
        price: 0,
        exchange: "" as keyof typeof Exchange,
    });

    const exchangeOptions: Option[] = Object.keys(Exchange).map((key) => ({
        value: key,
        label: key,
    }));

    const handleCreateBtnClick = async () => {
        const { exchange, price, fiatAmount, coinAmount } = formData;

        if (!exchange || !price || !fiatAmount || !coinAmount) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }
        
        const response = await createExecution(id!, formData);

        if ( response ) {
            safeGoBack(navigate);
        } else {
            alert("Failed to create execution.");
        }
    };

    const handleFormDataChange = <K extends keyof BaseExecutionData>(key: K, value: BaseExecutionData[K]) => {
        setFormData((prev) => ({
          ...prev,
          [key]: value,
        }));
    };

    return (
        <ViewWrapper>
            <Header text={`New execution (order: ${id})`} />
            <ContentBlock>
                <Panel>
                    <div className={styles.formGrid}>
                        <div className={styles.formField}>
                            <label>Exchange</label>
                            <CustomSelect
                                value={formData.exchange}
                                options={exchangeOptions}
                                needEmptyOption
                                isEmptyOptionHidden
                                required
                                onChange={(val) => handleFormDataChange("exchange", val as keyof typeof Exchange)} />
                        </div>
        
                        <div className={styles.formField}>
                            <label>Price</label>
                            <RoundedNumberInput
                                value={formData.price}
                                decimalPlaces={2}
                                required
                                onChange={(val) => handleFormDataChange("price", val)} />
                        </div>
            
                        <div className={styles.formField}>
                            <label>Fiat amount</label>
                            <RoundedNumberInput
                                value={formData.fiatAmount}
                                decimalPlaces={2}
                                required
                                onChange={(val) => handleFormDataChange("fiatAmount", val)} />
                        </div>
            
                        <div className={styles.formField}>
                            <label>Coin amount</label>
                            <RoundedNumberInput
                                value={formData.coinAmount}
                                decimalPlaces={3}
                                required
                                onChange={(val) => handleFormDataChange("coinAmount", val)} />
                        </div>
                    </div>
                </Panel>
            </ContentBlock>
            <FooterBlock>
                <CreateButton disabled={false} onClick={handleCreateBtnClick} />
            </FooterBlock>
        </ViewWrapper>
    );
};

export default NewExecutionView;