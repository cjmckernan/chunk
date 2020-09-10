const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
let User = require('../models/user.model');

router.get('/', auth, async (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.post("/register", async (req, res) => {
    try {
      let { username, password, passwordCheck } = req.body;
    
      if (!username || !password || !passwordCheck)
        return res.status(400).json({ msg: "Not all fields have been entered." });
      if (password.length < 5)
        return res
          .status(400)
          .json({ msg: "Password is too short" });
      if (password !== passwordCheck)
        return res
          .status(400)
          .json({ msg: "Passwords do not match" });
  
      const existingUser = await User.findOne({ username: username });
      if (existingUser)
        return res
          .status(400)
          .json({ msg: "Username already exists" });
  
 
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        username,
        password: passwordHash,
      });
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        //validate login details
        if(!username || !password){
            res.status(400).json({ msg: "Not all details entered."})
        }

        const user = await User.findOne({username: username});

        if(!user)
            return res.status(400).json({msg: "No user found with username"})
        
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch)
            return res.status(400).json({ msg: "No good!"})
        
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        res.json({
            token: token,
            user:{
                id: user._id,
                username: user.username
            },
        });
        
    } catch(err){
        res.status(500).json({ error: err.message})
    }
})

module.exports = router;