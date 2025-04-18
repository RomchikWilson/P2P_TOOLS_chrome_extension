export interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  value: string;
  needEmptyOption?: boolean;
  emptyOptionLabel?: string;
  isEmptyOptionHidden?: boolean;
  required?: boolean;
  onChange: (value: string) => void;
}

const CustomSelect: React.FC<Props> = ({
  options,
  value,
  needEmptyOption = false,
  emptyOptionLabel = "...",
  isEmptyOptionHidden = false,
  required = false,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let input = e.target.value;
    onChange(input);
  };

  const showError = required && value.trim() === "";

  return (
    <select 
      value={value}
      onChange={handleChange}
      className={showError ? "error-border" : ""}
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