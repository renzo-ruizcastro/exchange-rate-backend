const dotenv = require('dotenv');
const Sequelize = require('sequelize');

dotenv.config({ path: './.env' });
const DB_PASS = process.argv[2] || process.env.DB_PASS;

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: console.log,
    dialectOptions: {
      ssl: 'Amazon RDS',
    },
  }
);

sequelize
  .authenticate()
  .then(() => console.log('DB connection succesful!'))
  .catch(e => console.log('DB connection failed!', e));
