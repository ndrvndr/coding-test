import Button from "@/components/elements/Button";
import InputForm from "@/components/elements/InputForm";

export default function Page() {
  return (
    <form>
      <InputForm
        id="email"
        type="email"
        placeholder="Email"
        htmlfor="email"
        value="Email"
      />
      <InputForm
        id="password"
        type="password"
        placeholder="Password"
        htmlfor="password"
        value="Password"
      />
      <Button value="Login" />
    </form>
  );
}
