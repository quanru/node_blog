import express from 'express';
import login from './login';
import active from './active';
import logout from './logout';
import register from './register';
import user from './user';
import post from './post';
import delPost from './delPost';

let router = express.Router();

router.use('/login', login);
router.use('/active', active);
router.use('/logout', logout);
router.use('/register', register);
router.use('/user', user);
router.use('/post', post);
router.use('/delPost', delPost);

export default router;