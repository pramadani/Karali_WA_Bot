import { Sequelize } from 'sequelize';
import { Config } from '../config';

export const sequelize = new Sequelize(Config.DATABASE_URL);