const Jwt = require('jsonwebtoken');
const Validator = require('validator');
const cookies = require('cookie')

const authenticateToken = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }

    Jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
        if (err) {
            return res.status(403).send({ message: 'Invalid token' });
        }

        req.user = decodedToken;
        next();
    })
}



module.exports = { authenticateToken };
