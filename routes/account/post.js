import express from 'express';
import Post from '../../models/post';
import mongodb from 'mongodb';

let ObjectID = mongodb.ObjectID;
let router = express.Router();

router.route('/:pid')
    .get((req, res) => {
        Post.findOne({
            _id: new ObjectID(req.params.pid)
        }, (err, post) => {
            if(err) return next(err);
            if(!post) {
                return res.render('message', {
                    title: '日记不存在',
                    content: '该日记不存在，可能被删了喔'
                });
            } else {
                return res.render('postDetail', post);
            }
        });
    });

export default router;