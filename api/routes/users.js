const express = require('express');

const router = express.Router();

const UsersContoller = require('../controllers/UsersController');

router.get('/', UsersContoller.getUsers);

router.get('/:userId', UsersContoller.getUser);

router.post('/', UsersContoller.signUp);

router.post('/signIn', UsersContoller.signIn);

router.delete('/:userId', UsersContoller.deleteUser);

module.exports = router;