import express from 'express';
import passport from 'passport';
import url from 'url';
import isEmpty from '../../utils/isEmpty';

let router = express.Router();
let app = express();

router.get('/', (req, res) => {
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;
  app.locals.next = query;
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
    console.log(req.user);
    if(!user) {
      return res.redirect('/account/login');
    }
    req.logIn(user, (err) => {
      console.log(req.user);
      if(err) return next(err);
      req.session.authenticated = true;
      let jump = app.locals.next;
      if(!isEmpty(jump)) {
        return res.redirect(jump.next);
      } else {
        return res.redirect('/');
      }
    });
  })(req, res, next);
});

export default router;