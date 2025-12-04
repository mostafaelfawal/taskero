import axios from "axios";

export default async function handleLogout() {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    return res.data;
  } catch (error: any) {
    throw new Error (
        error.response.data.message || "Failed to log out"
    )
  }
}
