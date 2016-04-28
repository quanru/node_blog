import express from 'express';
import User from '../../models/user';
import mailer from '../../utils/mailer';
import crypto from 'crypto';
import config from '../../config';
let router = express.Router();

router.get('/', (req, res) => {
    res.render('register.hbs', {
        title: '注册'
    });
});
// 接受用户注册表单
router.post('/', (req, res, next) => {
    let username = req.body.username || '',
        password = req.body.password || '';
    if (username.length === 0 || password.length === 0) {
        return res.status(400).end('用户名或密码不合法');
    }
    User.register(new User({username: username}), password, (err, user) => {
      if (err) return next(err);
      crypto.randomBytes(20, (err, buf) => {
      user.activeToken = user._id + buf.toString('hex');
      user.activeExpires = Date.now() + 24 * 3600 * 1000;
      let link = config.schema + config.host + ':' + config.port + '/account/active/' + user.activeToken;

      mailer({
        to: username,
        subject: '欢迎注册你的日记',
        text: '请完成注册',
        html: '请点击如下链接激活：' + link
      });

      user.save((err, user) => {
        if(err) return next(err);
        res.send('已发送邮件至' + username + '，请在24小时内按照邮件提示激活。');
      });
      });
    });
});

export default router;