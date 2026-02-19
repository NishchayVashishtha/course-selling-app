const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");

function adminMiddleware(req, res, next) {
    const token = req.headers.token;

    try {
        const decoded = jwt.verify(token, JWT_ADMIN_SECRET);

        if(decoded) {
            req.userId = decoded.id;
            next();
        } else {
            res.status(403).json({
                message : "User not signed-in!"
            })
        }
    } catch(e) {
        res.status(404).json({
            message : "Invalid Token"
        })
    }
}

module.exports = {
    adminMiddleware : adminMiddleware
}