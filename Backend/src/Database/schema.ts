import mongoose, { Schema} from 'mongoose';



const user = new Schema({
    email : {type:String,required:true,unique:true},
    password : {type:String,required:true},
    username : {type:String,required:true,unique:true},
    firstName : String,
    lastName : String
})

export const UserModel = mongoose.model('User',user);

const Content = new Schema({
    title:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId, ref:"Tag"}],
    userId:[{type:mongoose.Types.ObjectId, ref:user}]
})

export const ContentModel = mongoose.model('Content',Content);

