import { Model, DataTypes } from 'sequelize';
import { sequelize } from './Init';
import { Member } from './Member';

export class Mention extends Model {
    public id!: number;
    public group_id!: number;
    public name!: string;
}

Mention.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'groups',
            key: 'id',
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'mentions',
});

Mention.hasMany(Member, { foreignKey: 'mention_id', as: 'members', onDelete: 'CASCADE' });
Member.belongsTo(Mention, { foreignKey: 'mention_id', as: 'mention' });
