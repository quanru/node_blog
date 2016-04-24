import express from 'express';
import Post from '../../models/post.js';
var router = express.Router();

router.route('/')
    .get(function (req, res) {
        res.render('post');
    })
    .post(function (req, res, next) {
        Post.create({
            title: req.body.title,
            content: req.body.content,
            author: req.user.id
        }, function (err, post) {
            if (err) return next(err);
            else return res.redirect('/admin/post');
        });
    });

export default router;