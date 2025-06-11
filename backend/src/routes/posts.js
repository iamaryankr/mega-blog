const express = require('express');
const router = express.Router();
const auth    = require('../middleware/auth');
const ctrl    = require('../controllers/postController');

// Public
router.get('/', ctrl.getAll);
router.get('/:slug', ctrl.getOne);

// Protected
router.post('/', auth, ctrl.create);
router.put('/:slug', auth, ctrl.update);
router.delete('/:slug', auth, ctrl.remove);

module.exports = router;
