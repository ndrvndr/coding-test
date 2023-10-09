interface Props {
  id: string;
  type: string;
  placeholder: string;
}

export default function Input({ id, type, placeholder }: Props) {
  return (
    <input
      id={id}
      type={type}
      className="w-full rounded border px-3 py-2 text-sm text-slate-700 placeholder:opacity-50"
      placeholder={placeholder}
    />
  );
}
