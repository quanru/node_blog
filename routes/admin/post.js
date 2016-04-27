import express from 'express';
import Post from '../../models/post';
import User from '../../models/user';
import mongodb from 'mongodb';

const router = express.Router();
const ObjectID = mongodb.ObjectID;

router.route('/')
    .get((req, res) => {
        const user = res.locals.user;
        if(!user.active) {
            return res.render('message', {
                title: '请先激活',
                content: user.username + '您好！请前往 <a href="http://' + user.username.match(/@(.{1,})/)[1] + '">登陆邮箱</a>并激活账户。'
              });
        }
        res.render('post');
    })
    .post((req, res) => {
        Post.create({
            title: req.body.title,
            content: req.body.content,
            author: req.user.id
        },  (err, post) => {
            if (err) return next(err);
            else return res.redirect('/admin/posts');
        });
    });

router.route('/:pid')
    .get((req, res) => {
        Post.findOne({
            _id: new ObjectID(req.params.pid)
        }, (err, post) => {
            if(err) return next(err);
            if(!post) {
                res.render('message', {
                    title: '日记不存在',
                    content: '你访问的日记不存在'
                });
            } else {
                res.render('post', post);
            }
        });
    })
    .post((req, res) => {
        Post.findOne({
            _id: new ObjectID(req.params.pid)
        }, (err, post) => {
            if(err) return next(err);
            if(!post) {
                res.render('message', {
                    title: '日记不存在',
                    content: '你访问的日记不存在'
                });
            } else {
                post.title = req.body.title;
                post.content = req.body.content;
                post.author = req.user.id;
                post.save();
                res.redirect('/admin/posts');
            }
        });
    });

export default router;