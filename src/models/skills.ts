import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "../config/database";
import { SkillAttributes } from "../interface/model";



interface SkillCreationAttributes extends Optional<SkillAttributes, "id"> {}

class Skill
  extends Model<SkillAttributes, SkillCreationAttributes>
  implements SkillAttributes
{
  public id!: string;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Skill.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string) {
        this.setDataValue("name", value.trim().toLowerCase());
      },
    },
  },
  {
    sequelize,
    tableName: "skills",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["name"],
      },
    ],
  }
);

export default Skill;
