import express from 'express';
import passport from 'passport';
import url from 'url';
import isEmpty from '../../utils/isEmpty';

const router = express.Router();
const app = express();

router.get('/', (req, res) => {
  const url_parts = url.parse(req.url, true);
  const query = url_parts.query;
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
    if(!user) {
      console.log(info);
      return res.redirect('/account/login');
    }
    req.logIn(user, (err) => {
      if(err) return next(err);
      req.session.authenticated = true;
      const jump = app.locals.next;
      console.log(jump);
      if(!isEmpty(jump)) {
        return res.redirect(jump.next);
      } else {
        return res.redirect('/');
      }
    });
  })(req, res, next);
});

export default router;