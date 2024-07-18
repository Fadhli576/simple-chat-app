import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger, { token } from 'morgan';
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
dotenv.config();

mongoose.connect(process.env.URL_MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log('terkoneksi');
})

import cors from "cors"
import chatRouter from './routes/chat.js';
import usersRouter from './routes/users.js';
import testAPIRouter from './routes/testAPI.js'
import Message from './models/message.js';
import User from './models/user.js';

var app = express();

// view engine setup


app.use(cors())

const io = new Server(8000, {
  cors :{
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/', indexRouter);
app.use(usersRouter);
app.use(chatRouter)
app.use(testAPIRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);
  socket.on("send-message", ({message, data, receiver}) => {
    const msg = new Message()
    msg.body = message;
    msg.send_id = data.id
    msg.receiver_id = receiver
    msg.save()
      .then((res) => {
        User.findOne({_id : data.id})
        .then(user => {
          user.messages.push(msg)
          user.save()
        })
      })
      .catch((err) => {
        console.log(err);
      })
    io.emit('receive-message', ({body : message, send_id:data.id, receiver_id:receiver, createdAt: new Date()}))
  })
})


export default app