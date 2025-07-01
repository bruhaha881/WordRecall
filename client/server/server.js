const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { savePrompt, getRecentPrompts, getTopPrompts } = require('./db/queries');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

app.post('/api/wordrecall', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  savePrompt(prompt); // 💾 Зберігаємо в базу

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3-8b-instruct',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    console.log("🧠 OpenRouter RAW response:", data); // ← додаємо це

    const reply = data.choices?.[0]?.message?.content?.trim() || '';
    const words = reply
      .split('\n')
      .map(line => line.replace(/^[-*•\d. ]+/, '').trim())
      .filter(Boolean);

    res.json({ words });
  } catch (error) {
    console.error('OpenRouter API error:', error);
    res.status(500).json({ error: 'Failed to contact OpenRouter' });
  }
});

app.get('/api/recent', (req, res) => {
  getRecentPrompts(8, (prompts) => {
    res.json({ prompts });
  });
});

app.get('/api/popular', (req, res) => {
  getTopPrompts(8, (prompts) => {
    res.json({ prompts });
  });
});

// API для отримання топ-запитів
app.get('/api/popular-prompts', (req, res) => {
  getTopPrompts(5, (prompts) => {
    res.json({ prompts });
  });
});

app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../client/index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('index.html not found');
  }
});

app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
