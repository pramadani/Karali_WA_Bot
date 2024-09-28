import express from 'express';
import groupRoutes from './routes/groupRoutes';
import mentionRoutes from './routes/mentionRoutes';
import memberRoutes from './routes/memberRoutes';
import { Config } from './config';
import { sequelize } from './models/Init';

const app = express();

app.use(express.json());

app.use('/groups', groupRoutes);
app.use('/mentions', mentionRoutes);
app.use('/members', memberRoutes);

async function connectWithRetry() {
    while (true) {
        try {
            await sequelize.authenticate();
            console.log('Database connection established successfully.');
            await sequelize.sync();
            app.listen(Config.PORT, () => {
                console.log(`Server is running on port ${Config.PORT}`);
            });
            return;
        } catch (error) {
            console.error('Unable to connect to the database');
            console.log('Retrying to connect in 5 seconds...');
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

connectWithRetry();