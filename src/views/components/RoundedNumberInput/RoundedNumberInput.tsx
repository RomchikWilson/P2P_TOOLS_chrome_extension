import { useEffect, useState } from "react";

interface Props {
  initialValue?: number | undefined;
  value: number;
  decimalPlaces: number;
  required?: boolean;
  onChange: (value: number) => void;
}

const RoundedNumberInput: React.FC<Props> = ({
  initialValue = undefined,
  value,
  decimalPlaces,
  required = false,
  onChange,
}) => {
  const [localValue, setLocalValue] = useState<string>("");

  useEffect(() => {
    setLocalValue(value.toString());
  }, [value]);

  const showError = required && (localValue.trim() === "" || parseFloat(localValue) === 0);
  const isChanged = typeof initialValue === "number" && value !== initialValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(",", ".");
    const regex = new RegExp(`^\\d*(\\.\\d{0,${decimalPlaces}})?$`);
    if (input === "" || regex.test(input)) {
      setLocalValue(input);
    }
  };

  const handleBlur = () => {
    const parsed = parseFloat(localValue);
    if (!isNaN(parsed)) {
      const factor = Math.pow(10, decimalPlaces);
      const rounded = Math.floor(parsed * factor) / factor;
      onChange(parseFloat(rounded.toFixed(decimalPlaces)));
    } else {
      onChange(0);
    }
  };

  return (
    <input
      type="text"
      inputMode="decimal"
      value={localValue}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={"0." + "0".repeat(decimalPlaces)}
      onWheel={(e) => e.preventDefault()}
      className={showError ? "value-error" : isChanged ? "value-changed" : ""}
    />
  );
};

export default RoundedNumberInput;
