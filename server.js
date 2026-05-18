const express = require('express');
const fetch = require('node-fetch');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config();

const app = express();
const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Convert
router.get('/convert', async (req, res) => {
  try {
    const { base, target, amount } = req.query;

    const response = await fetch(
      `https://api.frankfurter.dev/v2/rate/${base}/${target}`
    );
    const data = await response.json();

    if (!data.rate) {
      return res.status(400).json({ error: data.message || 'Rate not found' });
    }

    const rate = data.rate;
    const converted = (Number(amount) * rate).toFixed(2);

    res.json({ rate, converted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/history', async (req, res) => {
  try {
    const { base, target, from, to } = req.query;

    const response = await fetch(
      `https://api.frankfurter.dev/v2/rates?base=${base}&quotes=${target}&from=${from}&to=${to}`
    );
    const data = await response.json();

    // API returns array of { date, base, quote, rate }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get favorites
router.get('/favorites', async (req, res) => {
  try {
    const { data, error } = await supabase.from('favorites').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save favorite
router.post('/favorites', async (req, res) => {
  try {
    const { base_currency, target_currency } = req.body;
    const { data, error } = await supabase
      .from('favorites')
      .insert([{ base_currency, target_currency }])
      .select();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete favorite
router.delete('/favorites/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('favorites')
      .delete()
      .eq('id', id)
      .select();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use('/api', router);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
