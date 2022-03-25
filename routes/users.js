const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Hey este es una ruta de usuario")
})

module.exports = router