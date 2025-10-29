const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_PATH = path.join(__dirname, 'data', 'content.json');

app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, 'public')));

const readContent = () => {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
};

const writeContent = (content) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(content, null, 2));
};

app.get('/api/content', (req, res) => {
  try {
    const content = readContent();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Failed to read content file', error: error.message });
  }
});

app.put('/api/content', (req, res) => {
  try {
    const content = req.body;
    writeContent(content);
    res.json({ status: 'ok' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to write content file', error: error.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
