import logger from '../utils/logger';
import { createSequelize } from './db-loader';

const sequelize = createSequelize();

sequelize.sync().then(() => {
    logger.success("Sequelize Successfully Loaded!");
}).catch((err) => logger.error(err));

export default sequelize;