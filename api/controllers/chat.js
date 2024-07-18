import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Message from "../models/message.js";

const chatController = {
  chat: (req, res) => {
    res.json(req.user);
  },

  user: async (req, res) => {
    const users = await User.find({ no_hp : {$ne : req.user.no_hp}});
    return res.json(users)
  },

  message: (req, res) => {
    const { sender, receiver } = req.params;
    Message.find({
      $or: [
        { sender, receiver },
        { send_id: receiver, receiver_id: sender },
      ],
      $or: [
        { send_id: req.params.sender, receiver_id: req.params.receiver },
        { send_id: req.params.receiver, receiver_id: req.params.sender },
      ],
    })
      .exec()
      .then((messages) => {
        res.json(messages);
      })
      .catch((err) => {
        console.error("Error fetching messages:", err);
        res.status(500).json({ error: "Error fetching messages" });
      });
    // await Message.find({})
    // .then(messages => res.json(messages))
  },
};

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  });
}

export { chatController, authenticateToken };
