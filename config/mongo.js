const { connect } = require('mongoose');
require('dotenv').config();

const mongoConnect = async (db_url) => {
  try {
    await connect(db_url);
    console.log('Connectected to mongodb');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

module.exports = mongoConnect;
