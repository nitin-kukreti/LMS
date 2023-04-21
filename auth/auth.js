const bcrypt = require('bcrypt');
const { student } = require('../Users/userModel');
const JWT=require('jsonwebtoken');
const authenticate = async (req, res) => {
    const { email, password } = req.body;
    const user = await student.findOne({ email:email });
    if (user) {
        if (bcrypt.compare(password, user.password)) {
            const token=await JWT.sign(user,"key");
            res.json(200,{
                msg:"sign in successfully",
                token:token
            })
            
        } else {
            res.json(404,{msg:"password not match"})
        }

    }else{
        res.json(404,{msg:"user not found check your email"})
    }

}

module.exports=auth;


