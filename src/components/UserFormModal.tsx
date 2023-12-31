import useField from "@/hooks/useField";
import { UserData } from "@/interface/user";
import { createUser, updateUser } from "@/services/userService";
import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import Button from "./elements/Button";
import InputForm from "./elements/InputForm";

interface Prop {
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
  fetchUsers: () => void;
  selectedUser: UserData | null;
  isModify: boolean;
}

export default function UserFormModal({
  setIsModalActive,
  fetchUsers,
  selectedUser,
  isModify,
}: Prop) {
  const nameInput = useField();
  const emailInput = useField();
  const passwordInput = useField();
  const bioInput = useField();
  const avatarInput = useField();

  const [selectedRole, setSelectedRole] = React.useState<string>(
    "648c4a358f6c1f606c750c1d",
  );
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  const [loginErrorMessage, setLoginErrorMessage] = React.useState("");

  React.useEffect(() => {
    if (selectedUser && isModify) {
      nameInput.setValue(selectedUser.name || "");
      emailInput.setValue(selectedUser.email || "");
      bioInput.setValue(selectedUser.bio || "");
      avatarInput.setValue(selectedUser.avatar || "");
      setSelectedRole(selectedUser.role._id || "");
    }
    // eslint-disable-next-line
  }, [selectedUser]);

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      selectedUser
        ? await updateUser(
            selectedUser._id,
            nameInput.value,
            emailInput.value,
            bioInput.value,
            avatarInput.value,
            selectedRole,
          )
        : await createUser(
            nameInput.value,
            emailInput.value,
            passwordInput.value,
            bioInput.value,
            avatarInput.value,
            selectedRole,
          );

      nameInput.reset();
      emailInput.reset();
      passwordInput.reset();
      bioInput.reset();
      avatarInput.reset();
      setSelectedRole("648c4a358f6c1f606c750c1d");

      setIsModalActive(false);
      fetchUsers();
    } catch (error: any) {
      const errorMessage =
        error.message && error.message.length > 0
          ? error.message[0]
          : "Unknown error";
      setLoginErrorMessage(errorMessage);
    }
  };

  return (
    <div className="absolute top-0 flex h-screen w-full items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 rounded-md bg-white p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold">New User</h1>
          <button
            className="rounded-md bg-red-500 px-3 py-1 text-white"
            onClick={() => setIsModalActive(false)}
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmitForm}>
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
          {!selectedUser && (
            <InputForm
              id="password"
              label="Password"
              type="password"
              placeholder="Enter password"
              value={passwordInput.value}
              onchange={passwordInput.onChange}
              minlength={8}
            />
          )}
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

          {loginErrorMessage && (
            <p className="my-4 h-6 text-center text-red-500">
              {loginErrorMessage}
            </p>
          )}

          <Button value="Save" />
        </form>
      </div>
    </div>
  );
}
