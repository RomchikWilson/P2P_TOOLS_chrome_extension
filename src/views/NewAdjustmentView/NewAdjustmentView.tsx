import { useState } from "react";
import { Exchange, TransactionType } from "../../enums";
import Header from "../components/HeaderBlock/HeaderBlock";
import RoundedNumberInput from "../components/RoundedNumberInput/RoundedNumberInput";
import styles from "./NewAdjustmentView.module.css";
import { BaseAdjustmentData } from "../../types/ordersTypes";
import CustomSelect, { Option } from "../components/CustomSelect/CustomSelect";
import { useNavigate, useParams } from "react-router-dom";
import ViewWrapper from "../components/ViewWrapper/ViewWrapper";
import ContentBlock from "../components/ContentBlock/ContentBlock";
import FooterBlock from "../components/FooterBlock/FooterBlock";
import CreateButton from "../components/FooterBlock/components/CreateButton";
import { safeGoBack } from "../../utils/navigation";
import { createAdjustment } from "../../api/ordersAPI";
import TextInput from "../components/TextInput/TextInput";
import Panel from "../components/Panel/Panel";

const NewAdjustmentView: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState<BaseAdjustmentData>({
        coinAmount: 0,
        type: '' as keyof typeof TransactionType,
        exchange: '' as keyof typeof Exchange,
        comment: '',
    });

    const typeOptions: Option[] = Object.entries(TransactionType).map(([key, value]) => ({
        value: key,
        label: value,
    }));

    const exchangeOptions: Option[] = Object.keys(Exchange).map((key) => ({
        value: key,
        label: key,
    }));
    
    const handleCreateBtnClick = async () => {
        const { coinAmount, type, exchange, comment } = formData;

        if ( !coinAmount || !type || !exchange || !comment ) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }
        
        const response = await createAdjustment(id!, formData);
        if ( response ) {
            safeGoBack(navigate);
        } else {
            alert("Failed to create adjustment.");
        }
    };

    const handleFormDataChange = <K extends keyof BaseAdjustmentData>(key: K, value: BaseAdjustmentData[K]) => {
        setFormData((prev) => ({
          ...prev,
          [key]: value,
        }));
    };

    return (
        <ViewWrapper>
            <Header text={`New adjustment (order: ${id})`} />
            <ContentBlock>
                <Panel>
                    <div className={styles.formGrid}>
                        <div className={styles.formField}>
                            <label>Type</label>
                            <CustomSelect
                                value={formData.type}
                                options={typeOptions}
                                needEmptyOption
                                isEmptyOptionHidden
                                required
                                onChange={(val) => handleFormDataChange("type", val as keyof typeof TransactionType)} />
                        </div>
                        
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
                            <label>Coin amount</label>
                            <RoundedNumberInput
                                value={formData.coinAmount}
                                decimalPlaces={3}
                                required
                                onChange={(val) => handleFormDataChange("coinAmount", val)} />
                        </div>

                        <div className={styles.formField}>
                            <label>Comment</label>
                            <TextInput
                                value={formData.comment}
                                required
                                onChange={(val) => handleFormDataChange("comment", val)} />
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

export default NewAdjustmentView;