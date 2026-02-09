import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { ApplicationSkillAttributes } from "../interface/model";



interface ApplicationSkillCreationAttributes
  extends Optional<ApplicationSkillAttributes, "id"> {}

/* =========================
   Model Class
========================= */

class ApplicationSkill
  extends Model<
    ApplicationSkillAttributes,
    ApplicationSkillCreationAttributes
  >
  implements ApplicationSkillAttributes
{
  public id!: string;
  public applicationId!: string;
  public skillId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

/* =========================
   Init
========================= */

ApplicationSkill.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    applicationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "applications",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    skillId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "skills",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "application_skills",
    timestamps: true,

    indexes: [
      {
        unique: true,
        fields: ["applicationId", "skillId"],
      },
    ],
  }
);

export default ApplicationSkill;
