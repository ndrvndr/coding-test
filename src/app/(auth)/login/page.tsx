"use client";
import Button from "@/components/elements/Button";
import InputForm from "@/components/elements/InputForm";
import useField from "@/hooks/useField";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Page() {
  const router = useRouter();

  const emailInput = useField();
  const passwordInput = useField();
  const [errorMessage, setErrorMessage] = React.useState("");

  const { login } = useAuth();

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://api-test.sinardigital.co.id/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailInput.value,
            password: passwordInput.value,
          }),
        },
      );

      if (response.ok) {
        const res = await response.json();
        const token = res.data.access_token;
        login(token);

        emailInput.reset();
        passwordInput.reset();

        router.push("/");
      } else {
        const errorData = await response.json();
        if (errorData.message && errorData.message.length > 0) {
          const errorMessage = errorData.message[0];
          setErrorMessage(errorMessage);
        } else {
          setErrorMessage("Unknown error");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
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

      <p className={`mt-4 h-6 text-center text-red-500`}>
        {errorMessage ? errorMessage : ""}
      </p>
    </>
  );
}
