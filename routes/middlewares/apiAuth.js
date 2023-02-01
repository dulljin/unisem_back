const jwt = require('jsonwebtoken');

const authCheck = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.query.token

    if (!token || token == null || token == 'undefined') {
        return res.status(401).json({
            needLogin: true,
            msg: 'need login..'
        });
    } else {
        console.log('token next call....');
        next();
    }
/*
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }
    */
}

module.exports = authCheck;