// app/search/page.tsx

import { User } from "@/lib/type";
import { BASE_API_URL } from "@/lib/utils";
import LoadingSpinner from "@/components/LoadingSpinner";
import NavigationLink from "@/components/NavigationLink";
import Search from "@/components/Search";

async function fetchUsers() {
  try {
    const response = await fetch(`${BASE_API_URL}/api/userdata`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const users: User[] = await response.json();
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
}

export default async function Page() {
  const users = await fetchUsers();

  return (
    <div className="min-h-screen flex flex-col items-center text-gray-200 py-4 px-2 overflow-x-hidden">
      <h1 className="text-2xl text-green-300 font-bold text-center m-6 px-4">
        Here is our all Super Human
      </h1>

      {/* Pass fetched users to the Search component */}
      <Search users={users} />

      <NavigationLink />
    </div>
  );
}
