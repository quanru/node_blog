import express from 'express';
import Post from '../models/post';

let router = express.Router();

router.get('/', (req, res, next) => {
    if(req.user) {
        console.log(req.user.id);
        Post.find({author: req.user.id}, (err, posts) => {
            if(err) return next(err);
            res.render('index', {
                posts: posts,
                title: '你的日记'
            });
        });
    } else {
        res.render('index', {
            title: '你的日记'
        });
    }
});

export default router;
