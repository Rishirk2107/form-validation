import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/dbconfig';
import empRoutes from './routes/empRoutes'
import cors from 'cors'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use('/employees', empRoutes);

// Test Database Connection and Sync Models
sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.error('Error connecting to the database:', err));

sequelize.sync({ force: false }) // Set force: true to recreate the database
  .then(() => console.log('Models synchronized with the database...'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
