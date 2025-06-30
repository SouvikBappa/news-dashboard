const express = require('express');
const cors = require('cors');
require('dotenv').config();

const summarizerRoutes = require('./routes/summarizer.routes.cjs');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/summarize', summarizerRoutes);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
