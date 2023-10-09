export default function Button({ value }: { value: string }) {
  return (
    <button
      className="h-10 w-full rounded-md bg-blue-600 px-6 font-semibold text-white"
      type="submit"
    >
      {value}
    </button>
  );
}
