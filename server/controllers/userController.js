const router = require('express').Router();
const User = require('../db').import('../models/user');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateSession  = require('../middleware/validate-session')

router.post('/signin', (request, response) => {
    User.findOne({where : {email: request.body.email}})
    .then(user => {
        if(user){
            bcrypt.compare(request.body.password, user.password, (err,matches)=> {
                if(matches){
                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
                    response.json({
                        user:user,
                        message:"successfully authenticated",
                        sessionToken:token
                    })
                } else {
                    response.status(502).send({error: err + 'bad gateway'});
                }
            })
        } else {
            response.status(500).send({error: 'failed to authenticate'})
        }
    }
    )
    err => response.status(501).send({error: 'failed to process'});
});

router.post('/signup', (request,response) => {
    User.create({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: bcrypt.hashSync(request.body.password, 10)
    })
    .then(
        createSuccess = (user) => {
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

            response.json({
                user: user,
                message: "user created",
                sessionToken: token
            })
        },
        createError = err => response.send(500, err)
    );
});

router.put('/:id',validateSession, (request, response) => {
    User.update(request.body, { where: { id: request.params.id },
    returning: true
    })
      .then(User => response.status(200).json(User))
      .catch(err => response.status(500).json({error: err}))
  });


  router.delete('/:id',validateSession, (request, response) => {
    User.destroy({ where: { id: request.params.id },
    })
      .then(User => response.status(200).json(User))
      .catch(err => response.status(500).json({error: err}))
  });


module.exports = router;
