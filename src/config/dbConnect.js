import { Sequelize } from 'sequelize';
const DB_USER = 'postgres';
const DB_PASS = 'postgres';
const DB_HOST = 'localhost';
const DB_NAME = 'ecommerce';

const dbConnect = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false,
});

async function testConnection() {
  try {
    await dbConnect.authenticate();
    console.log('Connected to PostgreSQL.');
  } catch (error) {
    console.error('Could not connect to PostgreSQL:', error.message);
  }
}

testConnection();

export default dbConnect;
