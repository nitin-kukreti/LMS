const bcrypt = require('bcrypt');
const { student } = require('../Users/userModel');
const JWT=require('jsonwebtoken');
const auth = async (req, res) => {
    const { email, password } = req.body;
    const data = await student.findOne({ email:email });
    if (data) {
        if (bcrypt.compare(password, data.password)) {
            const token=await JWT.sign(data,"key");
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


