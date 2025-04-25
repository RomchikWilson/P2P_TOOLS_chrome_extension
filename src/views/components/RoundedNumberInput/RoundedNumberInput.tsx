interface Props {
  value?: string | number;
  decimalPlaces: number;
  required?: boolean;
  onChange: (value: number) => void;
}

const RoundedNumberInput: React.FC<Props> = ({
  value = "",
  decimalPlaces,
  required = false,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(",", ".");
    const regex = new RegExp(`^(?:\\d+)?(?:\\.\\d{0,${decimalPlaces}})?$`);

    if (input === "" || regex.test(input)) {
      const parsed = parseFloat(input);
      onChange(input === "" || isNaN(parsed) ? 0 : parsed);
    }
  };

  const handleBlur = () => {
    if (value === "" || isNaN(Number(value))) return;

    const parsed = parseFloat(String(value));
    const factor = Math.pow(10, decimalPlaces);
    const rounded = Math.floor(parsed * factor) / factor;
    const final = rounded.toFixed(decimalPlaces);
    onChange(parseFloat(final));
  };

  const showError =
    required && (String(value).trim() === "" || parseFloat(String(value)) === 0);

  return (
    <input
      type="text"
      inputMode="decimal"
      value={String(value)}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={"0." + "0".repeat(decimalPlaces)}
      className={showError ? "error-border" : ""}
    />
  );
};


export default RoundedNumberInput;
