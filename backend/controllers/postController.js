// D:\Nxtwave\Blog-app\backend\controllers\postController.js
const postService = require('../services/postService');

exports.createPost = async (req, res, next) => {
    try {
        const post = await postService.createPost(req.body);
        res.status(201).json(post);
    } catch (err) {
        next(err);
    }
};

exports.getPosts = async (req, res, next) => {
    try {
        const posts = await postService.getPosts();
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
};

exports.getPostById = async (req, res, next) => {
    try {
        const post = await postService.getPostById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
};

exports.updatePost = async (req, res, next) => {
    try {
        const post = await postService.updatePost(req.params.id, req.body);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const post = await postService.deletePost(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        next(err);
    }
};