import app from './app.js';
import sequelize from './config/dbConnect.js';
import dotenv from 'dotenv';
dotenv.config({path: '../.env'});
const PORT = process.env.PORT;
sequelize.authenticate()
  .then(() => {
    console.log('Database connected.');
    return sequelize.sync();

  })
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

