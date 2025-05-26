import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const DB_NAME = 'ecommerce';
const DB_USER = 'postgres';
const DB_PASS = 'postgres';
const DB_HOST = 'localhost';
// const PORT = 3000;
const dbConnect = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false,
});

export default dbConnect;
