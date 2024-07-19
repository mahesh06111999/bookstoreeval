const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { initSockets } = require('./config/socket');
const { initCronJobs } = require('./config/cronJobs');
const logger = require('./config/logger');
const eventEmitter = require('./utils/eventEmitter');
const { orderPlaced } = require('./utils/eventEmitter');
const requestLogger = require('./middlewares/logger');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { isAuthenticated, isAdmin } = require('./middlewares/auth');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const createUserTable = require('./models/User');
const createOrderTable = require('./models/Order');
const mongoConnect = require('./config/mongo');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const bookRoutes = require('./routes/bookRoutes');

const cors = require('cors');
const db_url = process.env.MONGODB_URI;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

(async () => {
  try {
    await createUserTable();
    await createOrderTable();
    await mongoConnect(db_url);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
})();

app.use(express.json());
app.use(requestLogger);

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
      httpOnly: true,
    },
  })
);
app.use(morgan('dev'));
app.get('/', (req, res) => {
  try {
    res.status(200).send('this is my home route');
  } catch (err) {}
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth', authRoutes);
app.use('/orders', isAuthenticated, orderRoutes);
app.use('/reviews', reviewRoutes);
app.use('/books', bookRoutes);
app.use('/admin', adminRoutes);

initSockets(io);
initCronJobs();

orderPlaced.on('orderPlaced', (order) => {
  console.log('Order placed event received:', order);
});

const PORT = process.env.PORT || 9090;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
