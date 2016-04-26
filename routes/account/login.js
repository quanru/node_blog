import express from 'express';
import passport from 'passport';
import url from 'url';

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
    // var url_parts = url.parse(req.url, true);
    // var query = url_parts.query;
    // console.log(req);
    passport.authenticate('local', (err, user, info) => {
    if(err) return next(err);
    if(!user) {
      console.log(info);
      return res.redirect('/account/login');
    }
    req.logIn(user, (err) => {
      if(err) return next(err);
      req.session.authenticated = true;
      if(query) {
        // return res.redirect(query.toString());
      } else {
        return res.redirect('/');
      }
    });
  })(req, res, next);
});

export default router;