import express from 'express';
import profile from './profile';
import posts from './posts';
import post from './post';

let router = express.Router();

router.use('/profile', profile);
router.use('/posts', posts);
router.use('/post', post);

export default router;
