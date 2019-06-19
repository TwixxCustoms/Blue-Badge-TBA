const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');

const validateSession = (request, response, next) => {
    const token = request.headers.authorization;
    jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken)=> {
        if(!err && decodeToken){
            User.findOne({where: {id: decodeToken.id}})
            .then(user => {
                if(!user) throw err;
                request.user = user;
                return next();
            })
            .catch(err => next(err));
        } else {
            request.errors = err;
            return response.status(500).send('Not Authorized');
        }
    });

};
module.exports = validateSession;