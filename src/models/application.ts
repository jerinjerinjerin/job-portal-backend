import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "../config/database";
import { ApplicationAttributes } from "../interface/model";



interface ApplicationCreationAttributes extends Optional<ApplicationAttributes, 'id'> {}

class Application extends Model<ApplicationAttributes, ApplicationCreationAttributes>

implements ApplicationAttributes {
    public id!: string;
    public userId!: string;
    public jobId!: string;
    public status!: 'pending' | 'accepted' | 'rejected';

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Application.init(
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
        },
        jobId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'jobs',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        status: {
            type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
            defaultValue: 'pending',
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "applications",
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['userId', 'jobId'],
            },
        ]
    },
);

export default Application;