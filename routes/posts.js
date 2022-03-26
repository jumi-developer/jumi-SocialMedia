const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

/* router.get('/', (req, res) => {
    console.log('====================================');
    console.log("hola");
    console.log('====================================');
}) */

// Crear un post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error);
    }
})

// Actualizar un post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("La publicacion se ha actualizado.");
        } else {
            res.status(403).json("Puedes actualizar solo tu publicacion.")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// Eliminar un post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("La publicacion se ha eliminado.");
        } else {
            res.status(403).json("Puedes eliminar solo tu publicacion.")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// Like-Dislike un post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
        } else {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("Le has dado dislike a la publicacion");
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// Obtener post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById({ id: req.params.id });
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Obtener timeline posts
router.get("/timeline/all", async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.json(userPosts.concat(...friendPosts));
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;