"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { token } = useAuth();

  if (!token) {
    router.push("/login");
    return null;
  }

  return (
    <main>
      CRUD-USERS
      <table></table>
    </main>
  );
}
