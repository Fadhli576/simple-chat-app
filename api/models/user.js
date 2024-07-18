import mongoose from 'mongoose'
var Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    no_hp: String,
    password : String,
    messages : [{type: Schema.Types.ObjectId, ref: 'Message'}]
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

export default User