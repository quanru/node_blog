import express from 'express';
import Post from '../../models/post';
import mongodb from 'mongodb';

const router = express.Router();
const ObjectID = mongodb.ObjectID;

router.route('/:pid')
    .get((req, res) => {
        Post.remove({
            _id: new ObjectID(req.params.pid)
        }, (err, post) => {
            if(err) return next(err);
            console.log(post);
            if(!post) {
                return res.render('message', {
                    title: '日记不存在',
                    content: '该日记不存在，无法删除'
                });
            } else {
                return res.redirect('/admin/posts');
            }
        });
    });

export default router;