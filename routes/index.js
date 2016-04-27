import express from 'express';
import Post from '../models/post';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    console.log(req.user.id);
    Post.find({author: req.user.id}, (err, posts) => {
        if(err) return next(err);
        res.render('index', {
            posts: posts,
            title: '你的日记'
        });
    });
});

export default router;
