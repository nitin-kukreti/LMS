const bcrypt = require('bcrypt');
const { student } = require('../Users/userModel');
const JWT=require('jsonwebtoken');
const authenticate = async (req, res) => {
    try{

        const { email, password } = req.body;
        console.log(req.body)
        const user = await student.findOne({ email:email });
        console.log(email,password);
        console.log(user);
        if (user) {
            if (bcrypt.compare(password, user.password)) {
                const token=await JWT.sign({user},"key");
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
    }catch(err){
        console.log(err);
        res.json(404,{msg:"Internal err"})
    }

}

module.exports=authenticate;


