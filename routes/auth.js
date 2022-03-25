const router = require('express').Router();
const User = require('../models/User')

// REGISTRO
router.get('/register', async (req, res) => {
    // res.send("Hey este es una ruta de autenticacion")
    const user = await new User({
        username: "Lola",
        email: "lola@gmail.com",
        password: "123456"
    })

    await user.save();
    res.send("OK");
});

module.exports = router;