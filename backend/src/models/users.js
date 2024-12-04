import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        lowercase : true,
        minlength : 3,
        maxlength : 30
    },
    lastName : {
        type : String,
        required : true,
        lowercase : true,
        minlength : 3,
        maxlength : 30
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    }
})

export const Users = mongoose.model("Users",UserSchema);