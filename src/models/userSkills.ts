import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class UserSkill extends Model {
  public userId!: string;
  public skillId!: string;
}

UserSkill.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    skillId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "user_skills",
    timestamps: false,
  }
);

export default UserSkill;
