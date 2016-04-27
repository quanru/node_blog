import express from 'express';
import User from '../../models/user';
import Post from '../../models/post';
import 'mongoose-query-paginate';

const router = express.Router();

router.get('/:id', (req, res, next) => {
    User.findById(req.params.id, (err, author) => {
        if(err || !author) return next(err);

        const options = {
            perPage: 3,
            delta: 2,
            page: req.query.page || 1
        };
        Post.find({author: req.params.id})
                  .sort({_id: -1})
                  .paginate(options, (err, pager) => {
                    if(err) return next(err);
                    res.render('userPosts', {
                        pager: pager,
                        posts: pager.results,
                        author: author
                    });
                  });
    });
});

export default router;