import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent } from '@mui/material';

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`);
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
    }, [id]);

    if (!post) return <Typography>Loading...</Typography>;

    return (
        <Container>
            <Card style={{ marginTop: '20px' }}>
                <CardContent>
                    <Typography variant="h4">{post.title}</Typography>
                    <Typography variant="body1">{post.content}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">By {post.author}</Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default PostDetails;
