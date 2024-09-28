import { Model, DataTypes } from 'sequelize';
import { sequelize } from './Init';

export class Member extends Model {
    public id!: number;
    public phone_number!: string;
    public mention_id!: number;
}

Member.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mention_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'mentions',
            key: 'id',
        },
    },
}, {
    sequelize,
    tableName: 'members',
});
