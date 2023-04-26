const jwt = require('jsonwebtoken')

const validAuth = (req, res, next) => {
    var tokenheader = req.headers['authorization'];
    console.log(tokenheader)
    if (tokenheader !== undefined) {
        try {
            var data = tokenheader.split(" ");
            const token = data[1];
            jwt.verify(token, "key", (error, authdata) => {
                if (error) {
                    res.json(401, { msg: "incorrect token is provided" })
                    return;
                }
                req.user = authdata.user;
                next();
            })

        } catch (error) {
            res.json(401, { msg: "recheck token formate" })
        }

    } else {
        res.json(401, { msg: "token is not provided" })
    }

};

module.exports = validAuth;