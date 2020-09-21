const express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    authenticate = require('../authenticate'),
    router = express.Router();

router.use(bodyParser.json());

router.post('/', (req, res, next) => {
    authenticate.LdapConnect(req.body.username, req.body.password),
        passport.authenticate('ldapauth', (err, user, info) => {
            if (err) return next(err);
            if (!user)
                return res.status(401).send({
                    success: false,
                    message: info.message,
                    token: null
                });
            else if (user) {
                let token = authenticate.getToken({
                    id: user.sAMAccountName,
                    mail: user.mail
                });
                res.setHeader('Content-Type', 'application/json');
                return res.status(200).send({
                    success: true,
                    message: 'authentication succeeded',
                    token: token
                });
            }
        })(req, res, next);
});

module.exports = router;
