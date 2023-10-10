"use client";
import Button from "@/components/elements/Button";
import InputForm from "@/components/elements/InputForm";
import useField from "@/hooks/useField";
import { UserData } from "@/interface/user";
import { fetchUserById, updateUser } from "@/services/userService";
import Link from "next/link";
import * as React from "react";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [creatUserErrorMessage, setCreatUserErrorMessage] =
    React.useState<string>("");
  console.log(creatUserErrorMessage);

  const nameInput = useField();
  const emailInput = useField();
  const bioInput = useField();
  const avatarInput = useField();
  const [selectedRole, setSelectedRole] = React.useState<string>(
    "648c4a358f6c1f606c750c1d",
  );

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  React.useEffect(() => {
    const userId = params.id;
    async function fetchUser() {
      if (userId) {
        try {
          const response = await fetchUserById(userId);
          setUserData(response.data);
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    }

    fetchUser();
  }, [params]);

  React.useEffect(() => {
    if (userData) {
      nameInput.setValue(userData.name || "");
      emailInput.setValue(userData.email || "");
      bioInput.setValue(userData.bio || "");
      avatarInput.setValue(userData.avatar || "");
      setSelectedRole(userData.role._id || "");
    }
    // eslint-disable-next-line
  }, [userData]);

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await updateUser(
        params.id,
        nameInput.value,
        emailInput.value,
        bioInput.value,
        avatarInput.value,
        selectedRole,
      );

      nameInput.reset();
      emailInput.reset();
      bioInput.reset();
      avatarInput.reset();
      setSelectedRole("648c4a358f6c1f606c750c1d");

      router.push("/");
    } catch (error: any) {
      const errorMessage =
        error.message && error.message.length > 0
          ? error.message[0]
          : "Unknown error";
      setCreatUserErrorMessage(errorMessage);
    }
  };

  return (
    <main>
      <div className="m-auto h-[calc(100vh-80px)] max-w-7xl pt-7">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Modify User</h1>
          <Link
            className="rounded-md bg-blue-500 px-4 py-2 text-white"
            href="/"
          >
            Back
          </Link>
        </div>

        <form className="mt-7" onSubmit={handleSubmitForm}>
          <InputForm
            id="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
            value={nameInput.value}
            onchange={nameInput.onChange}
          />
          <InputForm
            id="email"
            label="Email"
            type="email"
            placeholder="Enter email address"
            value={emailInput.value}
            onchange={emailInput.onChange}
          />
          <InputForm
            id="bio"
            label="Bio"
            type="text"
            placeholder="Enter bio"
            value={bioInput.value}
            onchange={bioInput.onChange}
          />
          <InputForm
            id="avatar"
            label="Avatar"
            type="url"
            placeholder="Enter avatar url"
            value={avatarInput.value}
            onchange={avatarInput.onChange}
          />
          <div className="mb-12">
            <label htmlFor="role">Choose a role:</label>
            <select
              name="role"
              id="role"
              value={selectedRole}
              onChange={handleRoleChange}
            >
              <option className="text-sm" value="648c4a358f6c1f606c750c1d">
                User
              </option>
              <option className="text-sm" value="648c4a358f6c1f606c750c1c">
                Admin
              </option>
            </select>
          </div>

          {/* {loginErrorMessage && (
            <p className="my-4 h-6 text-center text-red-500">
              {loginErrorMessage}
            </p>
          )} */}

          <Button value="Save" />
        </form>
      </div>
    </main>
  );
}
