import express from 'express';
import path from 'path';
import multer from 'multer';

let router = express.Router();
let upload = multer({ dest: path.resolve('public/uploads')});

router.route('/')
    .get((req, res) => {
        res.render('profile', {user: req.user});
    })
    .post(upload.single('avatar'), (req, res, next) => {
        req.user.title = req.body.title;
        req.user.description = req.body.description;
        if(req.file && req.file.originalname){
            req.user.avatar = '/uploads/' + path.basename(req.file.path);
        }
        req.user.save((err, user) => {
             if (err) next(err);
             res.render('profile', {user: user});
             res.redirect('/admin/profile');
         });
    });

export default router;