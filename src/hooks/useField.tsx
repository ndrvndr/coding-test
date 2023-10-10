import * as React from "react";

interface UseFieldProp {
  initialValue?: string;
}

interface UseFieldReturn {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
}

const useField = ({ initialValue = "" }: UseFieldProp = {}): UseFieldReturn => {
  const [value, setValue] = React.useState<string>(initialValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    value,
    onChange,
    reset,
  };
};

export default useField;
