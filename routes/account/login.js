import express from 'express';
import passport from 'passport';

var router = express.Router();

router.get('/', (req, res) => {
    res.render('login.hbs', {
        title: '登陆'
    });
});
// 接受用户登录表单
router.post(
  '/', 
  (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
    if(err) return next(err);
    if(!user) {
      console.log(info);
      return res.redirect('/account/login');
    }
    req.logIn(user, (err) => {
      if(err) return next(err);
      req.session.authenticated = true;
      return res.redirect('/admin/profile');
    });
  })(req, res, next);
});

export default router;