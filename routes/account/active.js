import express from 'express';
import User from '../../models/user';
const router = express.Router();

router.get('/:activeToken',  (req, res, next) => {
    User.findOne({
        activeToken: req.params.activeToken,
        activeExpires: {$gt: Date.now()}
    },  (err, user) => {
        if (err) return next(err);
        if (!user) {
            return res.render('message', {
                title: '激活失败',
                content: '您的激活链接无效，请重新 <a href="/account/signup">注册</a>'
            });
          }
        if(user.active) {
          return res.render('message', {
              title: '已经激活',
              content: user.username + '已经激活过了，请前往 <a href="/account/login">登录</a>'
            });
        }
        user.active = true;
        user.save((err, user) => {
            if (err) return next(err);
            return res.render('message', {
                title: '激活成功',
                content: user.username + '已成功激活，请前往 <a href="/account/login">登录</a>'
              });
        });
    });
});

export default router;