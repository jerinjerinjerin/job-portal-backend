import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { AuthUser } from "../../types/express";
import userRepo from "../../modules/user/user.repo";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader =
    req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded =
      verifyAccessToken(token) as AuthUser;

       const user = await userRepo.findById(decoded.id);

    if (!user || !user.refreshToken) {
      return res.status(401).json({
        message: "Session expired. Please login again.",
      });
    }

    req.user = decoded; 

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
