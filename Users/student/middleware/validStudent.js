const JWT=require("jsonwebtoken")

const validStudent=(req,res,next)=>{
    const tokenHeader=req.header['authorization'];
    try {
         const data=tokenHeader.split(" ");
         const token=data[1];
         if(token){
              JWT.verify(token,'key',(err,data)=>{
                if(err){
                    res.json(401,{msg:"provid valid token"});
                    return;
                }
                if(data.userType!=="student") {
                    res.json(401,{msg:"you are not allowed to access its only for student"});
                    return; 
                }
                next();
              })
         }else{
            res.json(401,{msg:"check your token format"});
         }
    } catch (error) {
        res.json(401,{msg:"provide token"});
    }
}
module.exports=validStudent