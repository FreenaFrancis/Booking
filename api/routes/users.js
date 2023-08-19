const express = require('express');
const { createUser, updateUser, deleteUser, getUser, getUsers } = require('../controllers/user');
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

// Middleware for token verification
// router.use(verifyToken);

router.get("/checkauthentication", verifyToken ,(req, res, next) => {
    res.json("hello user you are logged in");
});

router.get("/checkuser/:id", verifyUser,(req, res, next) => {
    res.json("hello user");
});

router.get("/checkadmin/:id", verifyAdmin,(req, res, next) => {
    res.json("hello user, ypu are logged in and you can delete all the account");
});


router.post("/", createUser);

// update
router.put('/:id',verifyUser, updateUser);

// delete
router.delete('/:id',verifyUser, deleteUser);

// Get
router.get('/:id',verifyUser, getUser);

// Get all
router.get('/',verifyAdmin, getUsers);

module.exports = router;
