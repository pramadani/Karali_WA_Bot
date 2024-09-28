import { Model, DataTypes } from 'sequelize';
import { sequelize } from './Init';
import { Mention } from './Mention';

export class Group extends Model {
    public id!: number;
    public name!: string;
}

Group.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'groups',
});

Group.hasMany(Mention, { foreignKey: 'group_id', as: 'mentions' });
Mention.belongsTo(Group, { foreignKey: 'group_id', as: 'group' });
