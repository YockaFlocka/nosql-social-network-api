const router = require('express').Router();

const { User, Thought, Reaction } = require('../models');

// ============  User Routes  ============== //

// Get all users
router.get('/user', async (req, res) => {
    try {
      const allUsers = await User.find()
      res.status(200).json({ status: "success", payload: allUsers });
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }    
  });

// Get a user by id with thought and friends data
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate({ path: "thoughts", path: "friends" })
        res.status(200).json({ status: "success", payload: user });
      } catch (err) {
        res.status(400).json({ msg: err.message });
      }
})  

// create user  
router.post('/user', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(200).json({ status: "success", payload: newUser });  
    } catch(err) {
        res.status(500).json({ msg: err.message });
    }
})

// ============  Thought Routes  ============= //

// create thought
router.post('/thought', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        res.status(200).json({ status: "success", payload: newThought });  
    } catch(error) {
        res.status(500).json({ msg: error.message });
    }
})

// ============  Reaction Routes  ============= //


module.exports = router;