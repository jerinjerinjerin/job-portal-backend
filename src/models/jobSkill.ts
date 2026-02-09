import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { JobSkillAttributes } from "../interface/model";



/* =======================
   Creation Interface
======================= */

interface JobSkillCreationAttributes
  extends Optional<JobSkillAttributes, "id"> {}

/* =======================
   Model Class
======================= */

class JobSkill
  extends Model<JobSkillAttributes, JobSkillCreationAttributes>
  implements JobSkillAttributes
{
  public id!: string;
  public jobId!: string;
  public skillId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

/* =======================
   Init
======================= */

JobSkill.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    jobId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "jobs",
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
    tableName: "job_skills",
    timestamps: true,

    indexes: [
      {
        unique: true,
        fields: ["jobId", "skillId"], // Prevent duplicate mapping
      },
    ],
  }
);

export default JobSkill;
