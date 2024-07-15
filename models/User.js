const db = require('../config/db');

const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(255) DEFAULT 'customer'
    )
  `;

  try {
    const [results, fields] = await db.query(query);
    console.log('User table created or already exists');
  } catch (err) {
    console.error('Error creating user table:', err);
    throw err;
  }
};

module.exports = createUserTable;
