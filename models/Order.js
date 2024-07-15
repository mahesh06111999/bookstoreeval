const db = require('../config/db');

const createOrderTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL,
      totalAmount FLOAT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `;
  

  try {
    await db.query(query);
    console.log('Order table created or already exists');
  } catch (err) {
    console.error('Error creating order table:', err);
    throw err;
  }
};

module.exports = createOrderTable;
