import { useState } from "react";

interface Props {
  decimalPlaces: number;
  required?: boolean;
  onChange: (value: string) => void;
}

const RoundedNumberInput: React.FC<Props> = ({
  decimalPlaces,
  required = false,
  onChange,
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(",", ".");
    const regex = new RegExp(`^(?:\\d+)?(?:\\.\\d{0,${decimalPlaces}})?$`);

    if (input === "" || regex.test(input)) {
      setValue(input);
      onChange(value);
    }
  };

  const handleBlur = () => {
    if (value === "") return;

    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      const factor = Math.pow(10, decimalPlaces);
      const rounded = Math.floor(parsed * factor) / factor;
      setValue(rounded.toFixed(decimalPlaces));
    } else {
      setValue("");
    }
    onChange(value);
  };

  const showError =
    required && (value.trim() === "" || parseFloat(value) === 0);

  return (
    <input
      type="text"
      inputMode="decimal"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={"0." + "0".repeat(decimalPlaces)}
      className={showError ? "error-border" : ""}
    />
  );
};

export default RoundedNumberInput;