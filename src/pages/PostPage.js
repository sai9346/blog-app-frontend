// src/pages/PostPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostDetails from '../components/PostDetails';
import PostForm from '../components/PostForm';

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            // Fetch the post data if in edit mode
            const fetchPost = async () => {
                try {
                    const response = await fetch(`/api/posts/${id}`);
                    if (!response.ok) {
                        throw new Error('Post not found');
                    }
                    const data = await response.json();
                    setPost(data);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchPost();
        } else {
            setIsEditMode(false);
        }
    }, [id]);

    return (
        <div>
            {isEditMode ? <PostForm post={post} /> : <PostDetails />}
        </div>
    );
};

export default PostPage;
