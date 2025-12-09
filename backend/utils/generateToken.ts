import jwt from "jsonwebtoken";

export default function generateToken(_id: string) {
  return jwt.sign({ id: _id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
    issuer: "taskero",
  });
}
