import User from "../../models/user";
import { CreateUserInput } from "./user.validation";

class UserRepository {
  async create(data: CreateUserInput) {
    return await User.create({
      ...data,
      username: data.name ?? data.name 
    });
  }

  async findByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  async findById(id: string) {
    return await User.findByPk(id);
  }

  async saveRefreshToken(
    userId: string,
    token: string
  ) {
    await User.update(
      { refreshToken: token },
      { where: { id: userId } }
    );
  }

  async findByRefreshToken(token: string) {
    return await User.findOne({
      where: { refreshToken: token },
    });
  }

  async removeRefreshToken(userId: string) {
    await User.update(
      { refreshToken: null },
      { where: { id: userId } }
    );
  }

  async changeRole(userId: string, newRole: "candidate" | "employer") {
    await User.update(
      { role: newRole },
      { where: { id: userId } }
    );
  }
}



export default new UserRepository();
