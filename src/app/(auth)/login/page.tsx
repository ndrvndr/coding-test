"use client";
import Button from "@/components/elements/Button";
import InputForm from "@/components/elements/InputForm";
import { useAuth } from "@/context/AuthContext";
import useField from "@/hooks/useField";
import { loginUser } from "@/services/userService";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function Page() {
  const router = useRouter();
  const { login } = useAuth();

  const emailInput = useField();
  const passwordInput = useField();
  const [loginErrorMessage, setLoginErrorMessage] = React.useState("");

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { token, id } = await loginUser(
        emailInput.value,
        passwordInput.value,
      );

      login(token, id);

      emailInput.reset();
      passwordInput.reset();

      router.push("/");
    } catch (error: any) {
      const errorMessage =
        error.message && error.message.length > 0
          ? error.message[0]
          : "Unknown error";
      setLoginErrorMessage(errorMessage);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <InputForm
          id="email"
          label="Email"
          type="email"
          placeholder="Enter email address"
          value={emailInput.value}
          onchange={emailInput.onChange}
        />
        <InputForm
          id="password"
          label="Password"
          type="password"
          placeholder="Enter password"
          value={passwordInput.value}
          onchange={passwordInput.onChange}
        />
        <Button value="Login" />
      </form>

      {loginErrorMessage && (
        <p className="mt-4 h-6 text-center text-red-500">{loginErrorMessage}</p>
      )}
    </>
  );
}
