const env = process.env.NODE_ENV === 'production' ? '' : '.development';
require('dotenv').config({ path: `.env${env}` });

require('./models/exchangeModel');
require('./models/userModel');
require('./models/auditModel');

const app = require('./app');
const sequelize = require('./database/database');

const port = process.env.PORT || 3000;

async function main() {
  try {
    // await sequelize.authenticate();
    // console.log('DB connection succesful!');
    await sequelize.sync({ force: true });
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (e) {
    console.log('DB connection failed!', e);
  }
}

main();
