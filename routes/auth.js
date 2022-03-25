const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// REGISTRO
router.post('/register', async (req, res) => {

    try {
        // generar nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //crear nuevo usuario
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        // guardar y retornar respuesta
        const user = await newUser.save();
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json(error)
        console.log("Error en el registro del usuario" + error);
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(404).json("Usuario no encontrado!");

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Contraseña incorrecta!");

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error)
        console.log("Error en el login" + error);
    }
});

module.exports = router;