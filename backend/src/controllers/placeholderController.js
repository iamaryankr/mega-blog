const express = require('express');
const router = express.Router();

// GET /api/placeholder
router.get('/', (req, res) => {
  res.json({ message: 'Hello from API placeholder!' });
});

module.exports = router;
