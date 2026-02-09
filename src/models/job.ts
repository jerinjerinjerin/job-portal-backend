import {DataTypes, Model, Optional } from "sequelize";

import sequelize from "../config/database";
import { JobAttributes } from "../interface/model";



interface JobCreationAttributes extends Optional<JobAttributes, 'id'> {}

class Job extends Model<JobAttributes, JobCreationAttributes>
implements JobAttributes {
    public id!: string;
    public userId!: string;
    public title!: string;
    public description!: string;
    public company!: string;
    public location!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Job.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "jobs",
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['userId', 'company'],
            }
        ]
    }
);

export default Job;
