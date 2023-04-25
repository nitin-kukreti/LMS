const mongoose=require('mongoose')

const host="mongodb://127.0.0.1:27017";
const dbName="LMS";

mongoose.connect(`${host}/${dbName}`)
