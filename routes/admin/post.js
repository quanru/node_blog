import express from 'express';
import Post from '../../models/post';
import User from '../../models/user';

var router = express.Router();

router.route('/')
    .get(function (req, res) {
        var user = res.locals.user;
        if(!user.active) {
            return res.render('message', {
                title: '请先激活',
                content: user.username + '您好！请前往 <a href="http://' + user.username.match(/@(.{1,})/)[1] + '">登陆邮箱</a>并激活账户。'
              });
        }
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