const { Router } = require('express');
const AppController = require('../controllers/AppController');
const UserController = require('../controllers/UserController');

const router = Router();

router.get('/status', AppController.getStatus);

router.get('/stats', AppController.getStats);

router.post('/users', UserController.createUser);

module.exports = router;
