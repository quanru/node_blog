import express from 'express';
let router = express.Router();

router.get('/', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;