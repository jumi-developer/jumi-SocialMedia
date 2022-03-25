const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');

// Actualizar usuario
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                res.status(500).json(error)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("La cuenta ha sido actualizada!")
        } catch (error) {
            res.status(500).json(error)
        }

    } else {
        return res.status(403).json("Solo puedes actualizar tu cuenta!");
    }
})

// Borrar usuario
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {

        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("La cuenta ha sido eliminada!")
        } catch (error) {
            res.status(500).json(error)
        }

    } else {
        return res.status(403).json("Solo puedes eliminar tu cuenta!");
    }
})

// Obtener usuarios
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Follow usuarios

// Unfollow usuario

module.exports = router