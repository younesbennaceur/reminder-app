import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';
import cron from 'node-cron';


import connectDB from './lib/db.js'; 
import reminderRoutes from './routes/reminderRoute.js';
import { sendDailyPrayers } from './controllers/pushController.js';

const app = express();

connectDB();

app.use(cors()); 
app.use(express.json()); 

app.use('/api', reminderRoutes);

cron.schedule('2 2 * * *', () => {
  console.log("⏰ DRIIIIING ! Test automatique (toutes les minutes)");
  sendDailyPrayers();
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});