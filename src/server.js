require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
console.log(process.env.NODE_ENV);

// require('./models/exchangeModel');
// require('./models/userModel');
// require('./models/auditModel');

const app = require('./app');
const sequelize = require('./database/database');

const port = process.env.PORT || 3000;

async function main() {
  try {
    // await sequelize.authenticate();
    // console.log('DB connection succesful!');
    await sequelize.sync({ force: false });
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (e) {
    console.log('DB connection failed!', e);
  }
}

main();
