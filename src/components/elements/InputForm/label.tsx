interface Props {
  htmlfor: string;
  value: string;
}

export default function Label({ htmlfor, value }: Props) {
  return (
    <label
      htmlFor={htmlfor}
      className="mb-2 block text-sm font-bold text-slate-700"
    >
      {value}
    </label>
  );
}
