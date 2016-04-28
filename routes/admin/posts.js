import express from 'express';
import Post from '../../models/post.js';
import dateFormat from '../../utils/dot-date-helper';

let router = express.Router();

router.route('/')
    .get((req, res, next) => {
        Post.find({author: req.user.id}, (err, posts) => {
            if(err) return next(err);

            res.render('posts', {
                posts: posts,
                title: '日记簿',
                dateFormat: dateFormat
            });
        });
    });

export default router;