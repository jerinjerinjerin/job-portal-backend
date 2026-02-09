import { DataTypes, Model, Optional} from 'sequelize';

import sequelize from '../config/database';
import { ProfileAttributes } from '../interface/model';



interface ProfileCreationAttributes extends Optional<ProfileAttributes, 'id'> {}

class Profile extends Model<ProfileAttributes, ProfileCreationAttributes>
implements ProfileAttributes {
    public id!: string;
    public userId!: string;
    public bio!: string;
    public avatar!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Profile.init(
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
        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "profiles",
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['userId'],
            },
        ]
    }
);

export default Profile;
