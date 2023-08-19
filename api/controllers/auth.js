const User = require("../models/User");
const bcrypt = require('bcrypt');
const { createError } = require("../utils/error");
const jwt = require('jsonwebtoken')
// const saltRounds = 10; // Define the number of salt rounds here.

const register = async (req, res, next) => {
  try {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(req.body.password, salt, async function(err, hash) {
        if (err) {
          return next(err);
        }

        const newUser = new User({
         ...req.body,
          password: hash,
        });

        try {
          const savedUser = await newUser.save();
          res.status(201).json(savedUser); // Respond with the saved user if everything is successful.
        } catch (err) {
          next(err); // Pass any errors to the next middleware (error handler).
        }
      });
    });
  } catch (err) {
    next(err); // Pass any errors to the next middleware (error handler).
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) 
    return next(createError(400, "Wrong password or username"));

    
    const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, "sdfgh")  //changes should be made

const {password, isAdmin,...otherDetails} = user._doc;
    res.cookie("acces_token",token,{httpOnly:true,}).status(200).json({details:{...otherDetails}, isAdmin});
  } catch (err) {
    next(err); // Pass any errors to the next middleware (error handler).
  }
};

module.exports = {
  register,
  login,
};
