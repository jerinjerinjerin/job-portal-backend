import { Request, Response, NextFunction } from "express";
import userService from "./user.service";
import { createUserSchema, loginSchema } from "./user.validation";

class UserResolver {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // Zod validation
      const validatedData =
        createUserSchema.parse(req.body);

      const user = await userService.createUser(
        validatedData
      );

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }


  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const validatedData =
        loginSchema.parse(req.body);

      const result =
        await userService.loginUser(
          validatedData
        );

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async refresh(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { refreshToken } = req.body;

    const result =
      await userService.refreshToken(
        refreshToken
      );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async currentUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user =
      await userService.getCurrentUser(
        userId
      );

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}


async logout(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found",
      });
    }
    const userId = req.user.id as unknown as string; 

    await userService.logout(userId);

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
}

async changeRole (req: Request, res: Response, next: NextFunction) {
  try {
    let userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    
    const { newRole } = req.body;

    if (!["candidate", "employer"].includes(newRole)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be 'candidate' or 'employer'.",
      });
    }

    const result = await userService.changeUserRole(userId, newRole);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}


}

export default new UserResolver();
