const multer = require('multer');
const storage = multer.memoryStorage(); // keep file in memory buffer
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
});

module.exports = upload;
