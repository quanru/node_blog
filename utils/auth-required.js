export default (req, res, next) =>{
    if(req.user && req.session.authenticated) return next();
    return res.redirect('/account/login?next=' + req.originalUrl);
};