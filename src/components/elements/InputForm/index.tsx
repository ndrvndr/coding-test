import Input from "./input";
import Label from "./label";

interface Props {
  id: string;
  type: string;
  placeholder: string;
  htmlfor: string;
  value: string;
}

export default function InputForm({
  id,
  type,
  placeholder,
  htmlfor,
  value,
}: Props) {
  return (
    <div className="mb-6">
      <Label htmlfor={htmlfor} value={value} />
      <Input id={id} type={type} placeholder={placeholder} />
    </div>
  );
}
