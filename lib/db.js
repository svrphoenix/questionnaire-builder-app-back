import Sequelize from 'sequelize';
import { config } from 'dotenv';

config();

const sequelize = new Sequelize({
  logging: console.log,
  dialect: process.env.DB_DIALECT,
  port: +process.env.DB_PORT,
  host: process.env.DB_HOSTNAME,
  username: process.env.DB_USERNAME,
  password: `${process.env.DB_PASSWORD}`,
  database: process.env.DB_DATABASE,

  define: {
    timestamps: false,
  },
});

export async function initDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
}

export default sequelize;
