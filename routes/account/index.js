import express from 'express';
import login from './login';
import active from './active';
import logout from './logout';
import register from './register';

var router = express.Router();

router.use('/login', login);
router.use('/active', active);
router.use('/logout', logout);
router.use('/register', register);

export default router;