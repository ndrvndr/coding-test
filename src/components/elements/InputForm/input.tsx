interface Props {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  id,
  type,
  placeholder,
  value,
  onchange,
}: Props) {
  return (
    <input
      id={id}
      type={type}
      className="w-full rounded border px-3 py-2 text-sm text-slate-700 placeholder:opacity-50"
      placeholder={placeholder}
      value={value}
      onChange={onchange}
      required
    />
  );
}
