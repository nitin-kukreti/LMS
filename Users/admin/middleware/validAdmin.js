
const jwt = require('jsonwebtoken')
const validAdmin = (req, res, next) => {
    var tokenheader = req.headers['authorization'];
    if (tokenheader !== undefined) {
        try {
            var data = tokenheader.split(" ");
            const token = data[1];
            jwt.verify(token, "key", (error, authdata) => {
                if (error) {
                    res.json(401, { msg: "incorrect token is provided" })
                    return;
                }
                if (authdata.user.userType !== 'admin') {
                    res.json(401, { msg: "you are not admin" }) 
                    return;
                }
                console.log("valid admin")
                return next();
            })

        } catch (error) {
            res.json(401, { msg: "recheck token formate" })
        }

    } else {
        res.json(401, { msg: "token is not provided" })
    }

};

module.exports = validAdmin;