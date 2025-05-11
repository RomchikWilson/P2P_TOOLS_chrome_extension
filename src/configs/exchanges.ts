import { Exchange } from "../enums";
import okxIcon from "../assets/icons/crypto-exchanges/okx.png";
import bybitIcon from "../assets/icons/crypto-exchanges/bybit.png";

export const EXCHANGE_CONFIG = {
    [Exchange.OKX]: {
        icon: okxIcon,
        url: "https://www.okx.com",
    },
    [Exchange.BYBIT]: {
        icon: bybitIcon,
        url: "https://www.bybit.com",
    },
} as const;
