"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var requireAuth_1 = require("../middleware/requireAuth");
var router = express_1.Router();
exports.router = router;
router.post('/auth/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password) {
        req.session = { loggedIn: true };
        res.redirect('/');
    }
    else {
        res.send('Invalid email or password');
    }
});
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n      <div>\n        <div>You are logged in</div>\n        <a href=\"/logout\">Logout</a>\n      </div>\n    ");
    }
    else {
        res.send("\n      <div>\n        <div>You are not logged in</div>\n        <a href=\"/auth/login\">Login</a>\n      </div>\n    ");
    }
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth_1.requireAuth, function (req, res) {
    res.send('Welcome to protected route, logged in user!');
});
