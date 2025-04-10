import Sequelize from 'sequelize';
import mysql from 'mysql2/promise';
import { config } from 'dotenv';

config();

const connection = await mysql.createConnection({
  host: process.env.DB_HOSTNAME,
  port: +process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: `${process.env.DB_PASSWORD}`,
});

await connection.query(
  `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\`;`
);

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
