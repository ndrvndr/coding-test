import Input from "./input";
import Label from "./label";

interface Props {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minlength?: number;
}

export default function InputForm({
  id,
  label,
  type,
  placeholder,
  value,
  onchange,
  minlength,
}: Props) {
  return (
    <div className="mb-6">
      <Label htmlfor={id} value={label} />
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onchange={onchange}
        minlength={minlength}
      />
    </div>
  );
}
