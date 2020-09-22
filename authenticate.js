require('dotenv/config');
const passport = require('passport'),
    LdapStrategy = require('passport-ldapauth'),
    jwt = require('jsonwebtoken'),
    ldap = require('ldapjs');

exports.LdapConnect = (username, password) => {
    passport.use(new LdapStrategy({
        server: {
            url: process.env.LDAP_HOST,
            bindDn: "cn=" + username + process.env.LDAP_BIND_DN,
            bindCredentials: password,
            searchBase: process.env.LDAP_SEARCH_BASE,
            searchFilter: "sAMAccountName=" + username,
            tlsOptions: {
                'rejectUnauthorized': false
            }
        }
    }))
}

exports.getToken = (user) => {
    return jwt.sign(user, process.env.SECRET_KEY,
        { expiresIn: 10000 })
}

exports.verifyUser = passport.authenticate('jwt', { session: false });