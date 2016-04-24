import express from 'express';
var router = express.Router();

router.get('/', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;