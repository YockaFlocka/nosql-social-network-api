const router = require('express').Router();

const { User, Thought, Reaction } = require('../models');

// ============  User Routes  ============== //

// Get all users
router.get('/user', async (req, res) => {
    try {
      const allUsers = await User.find();
      res.status(200).json({ status: "success", payload: allUsers });
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }    
  });

// Get a user by id with thought and friends data
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate({ path: "thoughts", path: "friends" });
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

// update user by id
router.put('/user/:id', async (req, res) => {
    try {
      const updateUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      res.status(200).json({ status: "success", payload: updateUser });  
    } catch (error) {
      res.status(400).json({ msg: error.message });  
    }
})

// delete user by id
router.delete('/user/:id', async (req, res) => {
    try {
      const deleteUser = await User.findOneAndDelete({ _id: req.params.id });
      res.status(200).json({ status: "success", message: "User has been deleted!" });  
    } catch (error) {
      res.status(400).json({ msg: error.message });  
    }
})


// ============  User Friend Routes ============ //


// add a new friend to user's friends list
router.post('/user/:userId/friends/:friendId', async (req, res) => {
  try {
    const addFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    res.status(200).json({ status: "success", payload: addFriend });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
})

// remove a friend from a user's friend list
router.delete('/user/:userId/friends/:friendId', async (req, res) => {
  try {
    const deleteFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    res.status(200).json({ status: "success", payload: deleteFriend });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
})


// ============  Thought Routes  ============= //


// Get all thoughts
router.get('/thought', async (req, res) => {
    try {
      const allThoughts = await Thought.find();
      res.status(200).json({ status: "success", payload: allThoughts });
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }    
  });

// Get a single thought by id
router.get('/thought/:id', async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.id });
        res.status(200).json({ status: "success", payload: thought });
      } catch (err) {
        res.status(400).json({ msg: err.message });
      }
})

// Create a thought
router.post('/thought', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        res.status(200).json({ status: "success", payload: newThought });  
    } catch(error) {
        res.status(500).json({ msg: error.message });
    }
})

// update thought by id
router.put('/thought/:id', async (req, res) => {
    try {
      const updateThought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      res.status(200).json({ status: "success", payload: updateThought });  
    } catch (error) {
      res.status(400).json({ msg: error.message });  
    }
})

// delete thought by id
router.delete('/thought/:id', async (req, res) => {
    try {
      const deleteThought = await Thought.findOneAndDelete({ _id: req.params.id });
      res.status(200).json({ status: "success", message: "Thought has been deleted!" });  
    } catch (error) {
      res.status(400).json({ msg: error.message });  
    }
})


// ============== Thought Reaction Routes ============ //

// add a reaction to a thought
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
  try {
    const addReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    res.status(200).json({ status: "success", payload: addReaction });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
})

// remove a reaction by reactionId
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
  console.log(req.params.reactionId)
  try {
    const deleteReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.params.reactionId } },
      { runValidators: true, new: true }
    );
    res.status(200).json({ status: "success", msg: "reaction removed" });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
})

module.exports = router;