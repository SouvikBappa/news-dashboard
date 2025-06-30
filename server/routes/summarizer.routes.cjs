const express = require('express');
const router = express.Router();
const { summarizeArticle } = require('../controllers/summarizer.controller.cjs');

router.post('/', summarizeArticle);

module.exports = router;
