import bcrypt from "bcrypt";

import UserRepository from "./user.repo";
import { CreateUserInput, LoginInput } from "./user.validation";
import { 
  generateAccessToken, 
  generateRefreshToken, 
  verifyRefreshToken 
} from "../../commen/utils/jwt";

class UserService {
  async createUser(data: CreateUserInput) {
    const existingUser = await UserRepository.findByEmail(
      data.email
    );

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      10
    );

    const user = await UserRepository.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  }

    async loginUser(data: LoginInput) {
    const user =
      await UserRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const payload = {
      id: user.id,
      email: user.email,
    };


    const accessToken =
      generateAccessToken(payload);

    const refreshToken =
      generateRefreshToken(payload);

      await UserRepository.saveRefreshToken(
    user.id,
    refreshToken
  );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }


  async refreshToken(token: string) {


  if (!token) {
    throw new Error("Refresh token required");
  }

  const decoded: any =
    verifyRefreshToken(token);

  const user =
    await UserRepository.findByRefreshToken(
      token
    );

  if (!user) {
    throw new Error(
      "Invalid refresh token"
    );
  }

  const payload = {
    id: user.id,
    email: user.email,
  };

  const newAccessToken =
    generateAccessToken(payload);

  return {
    accessToken: newAccessToken,
  };
}

async getCurrentUser(userId: string) {
  const user =
    await UserRepository.findById(
      userId
    );

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}


async logout(userId: string) {
  await UserRepository.removeRefreshToken(
    userId
  );
}

async changeUserRole(userId: string, newRole: "candidate" | "employer") {
  const result = await UserRepository.changeRole(userId, newRole);

  return {
    data: result,
    success: true,
    message: "User role updated successfully",
  };
}
}

export default new UserService();
