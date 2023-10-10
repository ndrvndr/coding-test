"use client";
import { useAuth } from "@/context/AuthContext";
import { UserData } from "@/interface/user";
import { deleteUser, getUsers } from "@/services/userService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function Page() {
  const [users, setUsers] = React.useState<UserData[] | null>(null);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const itemsPerPage = 8;

  const router = useRouter();
  const { token } = useAuth();

  const fetchUsers = React.useCallback(async () => {
    try {
      const page = currentPage;
      const limit = itemsPerPage;
      const response = await getUsers(page, limit);
      setUsers(response.data.docs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, [currentPage]);

  React.useEffect(() => {
    !token ? router.push("/login") : fetchUsers();
  }, [token, router, fetchUsers]);

  const handleDeleteUser = async (userId: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteUser(userId);
        fetchUsers();
      } catch (error) {
        console.error("An error occurred while deleting the user:", error);
      }
    }
  };

  return (
    <main className="m-auto mt-7 h-[calc(100vh-108px)] max-w-7xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button className="rounded-md bg-blue-500 px-4 py-2 text-white">
          Add User
        </button>
      </div>

      <table className="mt-7 w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users
            ? users.map((user) => (
                <tr key={user._id}>
                  <td className="flex items-center gap-4">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-blue-500"></div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-bold">{user.name}</span>
                      <span>{user.bio}</span>
                    </div>
                  </td>
                  <td>{user.role.name}</td>
                  <td>
                    <button className="mr-2 rounded-md bg-yellow-500 px-4 py-2 text-white">
                      Modify
                    </button>
                    <button
                      className="rounded-md bg-red-500 px-4 py-2 text-white"
                      onClick={() => handleDeleteUser(user._id, user.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : Array.from({ length: 8 }).map((_, index) => (
                <tr key={index} className="h-16 animate-pulse bg-slate-200">
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-md bg-blue-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-opacity-50"
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-md bg-blue-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
}
