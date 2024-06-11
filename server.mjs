import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import connectDB from './db.mjs';

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB();

const searchHistorySchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String },
  temperature: { type: Number },
  condition: { type: String },
  conditionText: { type: String },
  icon: { type: String },
  date: { type: Date, default: Date.now },
});

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

app.post('/api/history', async (req, res) => {
  try {
    const newSearch = new SearchHistory(req.body);
    await newSearch.save();
    res.status(201).json(newSearch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
