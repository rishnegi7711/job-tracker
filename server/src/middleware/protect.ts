declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
import { env } from "../env";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "No token provided" });
    return;
  }
  const token = authHeader.split(" ")[1]!;

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as unknown as {
      userId: string;
    };
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default protect;
