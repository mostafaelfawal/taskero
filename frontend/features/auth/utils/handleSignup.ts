import axios from "axios";
import { AuthSchemaType } from "../schemas/authSchema";

export default async function handleSignup(data: AuthSchemaType) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
      data,
      { withCredentials: true }
    );

    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response.data.message || "The account has not been created"
    );
  }
}
