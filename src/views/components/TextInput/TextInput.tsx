interface Props {
  initialValue?: string | null;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
}

const TextInput: React.FC<Props> = ({
  initialValue = null,
  value,
  required = false,
  onChange,
}) => {
  const showError = required && value.trim() === "";
  const isChanged = typeof initialValue === "number" && value !== initialValue;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      inputMode="text"
      value={value}
      onChange={handleInputChange}
      className={showError ? "error-border" : isChanged ? "changed-border" : ""}
    />
  );
};


export default TextInput;
