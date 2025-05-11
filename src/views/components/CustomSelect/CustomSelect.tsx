export interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  initialValue?: string | undefined;
  value: string;
  needEmptyOption?: boolean;
  emptyOptionLabel?: string;
  isEmptyOptionHidden?: boolean;
  required?: boolean;
  onChange: (value: string) => void;
}

const CustomSelect: React.FC<Props> = ({
  options,
  initialValue = undefined,
  value,
  needEmptyOption = false,
  emptyOptionLabel = "...",
  isEmptyOptionHidden = false,
  required = false,
  onChange,
}) => {
  console.log('-=>', value);
  const showError = required && value.trim() === "";
  const isChanged = typeof initialValue === "string" && value !== initialValue;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let input = e.target.value;
    onChange(input);
  };

  return (
    <select 
      value={value}
      onChange={handleChange}
      className={showError ? "value-error" : isChanged ? "value-changed" : ""}
    >
      { needEmptyOption &&
        <option
          value=""
          disabled={isEmptyOptionHidden} hidden={isEmptyOptionHidden}
        >{emptyOptionLabel}</option>
      }
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
};

export default CustomSelect;