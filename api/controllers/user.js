import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const userController = {

  register: (req, res) => {
    User.create({
        name : req.body.name,
        no_hp : req.body.no_hp,
        password : bcrypt.hashSync(req.body.password, 10)
    })
    .then(res.send("User Craeted"))
  },

  login: (req, res) => {
    const { no_hp, password } = req.body;

    // Find user in the database
    User.findOne({no_hp})
    .then((user) => {
      console.log(user);
      if (!user) {
      // return res.status(404).json({ message: 'User not found' });
      console.log("User not Found");
    }

     // Check if password is correct
    bcrypt.compare(password, user.password)
      .then((isPasswordValid) => {
        if (!isPasswordValid) {
          console.log("invalid");
        }
    const token = jwt.sign({ id: user._id, no_hp: user.no_hp }, process.env.SECRET_KEY, { expiresIn: '1h' });
      res.json({token}); // Set the token as a cookie
      })
      .catch((err) => {
        console.log(err);
      })
      
    })
    .catch((err) => {
        console.log(err);
    })


    },

  logout: (req, res) => {
    req.logOut((err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

export default userController;
