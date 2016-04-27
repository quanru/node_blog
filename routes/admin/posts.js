import express from 'express';
import Post from '../../models/post.js';

const router = express.Router();

router.route('/')
    .get((req, res, next) => {
        Post.find({author: req.user.id}, (err, posts) => {
            if(err) return next(err);

            res.render('posts', {
                posts: posts
            });
        });
    });

export default router;