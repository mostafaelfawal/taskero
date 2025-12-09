import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No Token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    (req as any).user = { id: decoded.id };

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}
