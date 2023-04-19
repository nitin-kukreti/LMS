const mongoose=require('mongoose')


const batchSchema=mongoose.Schema({
    batchName:String,
    decription:String
})

const batch=mongoose.model('batch',batchSchema)

module.exports=batch