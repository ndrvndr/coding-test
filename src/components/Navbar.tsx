"use client";
import { useAuth } from "@/context/AuthContext";
import { UserData } from "@/interface/user";
import { fetchUserById } from "@/services/userService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function Navbar() {
  const router = useRouter();
  const { logout } = useAuth();
  const [userData, setUserData] = React.useState<UserData | null>(null);

  React.useEffect(() => {
    const userId = localStorage.getItem("userId");

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
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-blue-500 py-5 text-white">
      <div className="m-auto flex max-w-7xl items-center justify-between">
        <h1 className="h-fit text-2xl font-bold">Admin Dashboard</h1>
        {userData ? (
          <div className="flex items-center gap-2">
            <Image
              src={userData.avatar}
              alt="Image"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span>{userData.name}</span>
            <button
              className="ml-2 rounded-md bg-red-500 px-2 py-1"
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex animate-pulse items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-white bg-opacity-50"></div>
            <div className="h-5 w-14 bg-white bg-opacity-50"></div>
          </div>
        )}
      </div>
    </nav>
  );
}
