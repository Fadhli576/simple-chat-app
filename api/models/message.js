import mongoose from "mongoose";
var Schema = mongoose.Schema

const MessageSchema = new Schema({
    body: String,
    send_id : String,
    receiver_id : String,
}, {timestamps : true})

const Message = mongoose.model('Message', MessageSchema)

export default Message