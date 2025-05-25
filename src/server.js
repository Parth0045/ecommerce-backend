import app from './app.js';
import sequelize from './config/dbConnect.js';
const PORT = process.env.PORT || 4000;

async function startServer() {
  await sequelize.authenticate();
  console.log('Database connected successfully.');

  await sequelize.sync();
  console.log('Models synced.');

  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}

startServer();
