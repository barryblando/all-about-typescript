"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403).send('Not permitted!');
}
exports.requireAuth = requireAuth;
