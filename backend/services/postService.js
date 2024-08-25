// D:\Nxtwave\Blog-app\backend\services\postService.js

const Post = require('../models/Post');

const createPost = async (data) => {
    const post = new Post(data);
    return await post.save();
};

const getPosts = async () => {
    return await Post.find();
};

const getPostById = async (id) => {
    try {
        // Use Mongoose's findById method to find the post by its ID
        const post = await Post.findById(id);
        if (!post) {
            throw new Error('Post not found');
        }
        return post;
    } catch (err) {
        throw err;
    }
};

const updatePost = async (id, data) => {
    try {
        const post = await Post.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!post) {
            throw new Error('Post not found');
        }
        return post;
    } catch (err) {
        throw err;
    }
};

const deletePost = async (id) => {
    try {
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            throw new Error('Post not found');
        }
        return post;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
};
