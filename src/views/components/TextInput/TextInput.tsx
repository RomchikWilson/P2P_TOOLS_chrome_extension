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
  const isChanged = initialValue && value !== initialValue;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      inputMode="text"
      value={value}
      onChange={handleInputChange}
      className={showError ? "value-error" : isChanged ? "value-changed" : ""}
    />
  );
};


export default TextInput;
