import { DataTypes, Model, Optional} from 'sequelize';

import sequelize from '../config/database';
import { UserAttributes } from '../interface/model';



interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes>
implements UserAttributes {
    public id!: string;
    public username!: string;
    public email!: string;
    public refreshToken!: string | null;
    public password!: string;
    public role!: 'employer' | 'candidate';

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('employer', 'candidate'),
            allowNull: false,
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "users",
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['email'],
            }
        ]
    }
);

export default User;