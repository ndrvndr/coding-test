export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(
      "https://api-test.sinardigital.co.id/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );

    if (response.ok) {
      const res = await response.json();
      const { access_token, id } = res.data;
      return { token: access_token, id };
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}

export async function fetchUserById(userId: string) {
  try {
    const response = await fetch(
      `https://api-test.sinardigital.co.id/users/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(
        `Failed to fetch user data: ${response.status} - ${response.statusText}`,
      );
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}

export async function getUsers(page: number, limit: number) {
  try {
    const response = await fetch(
      `https://api-test.sinardigital.co.id/users?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(
        `Failed to fetch user data: ${response.status} - ${response.statusText}`,
      );
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}

export async function deleteUser(userId: string) {
  try {
    const response = await fetch(
      `https://api-test.sinardigital.co.id/users/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.ok) {
      return "User deleted successfully";
    } else {
      throw new Error(
        `Failed to fetch user data: ${response.status} - ${response.statusText}`,
      );
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}

export async function createUser(
  name: string,
  email: string,
  password: string,
  bio: string,
  avatar: string,
  role: string,
) {
  try {
    const response = await fetch("https://api-test.sinardigital.co.id/users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        bio: bio,
        avatar: avatar,
        roleId: role,
      }),
    });

    if (response.ok) {
      const res = await response.json();
      return res.data;
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
