import express from 'express';
import Employee from '../models/employee';
import { empcontroller } from '../controllers/empcontroller';

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await Employee.findAll();
  res.json(users);
});

router.post('/',empcontroller);

export default router;
