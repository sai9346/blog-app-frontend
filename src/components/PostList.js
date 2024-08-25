import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Failed to delete post');
        }
        setPosts(posts.filter(post => post._id !== id));
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('Error deleting post');
      }
    }
  };

  if (posts.length === 0) {
    return <Typography>No posts available</Typography>;
  }

  return (
    <Container>
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{post.title}</Typography>
                <Typography variant="body2" color="textSecondary">By {post.author}</Typography>
                <Typography variant="body1">{post.content.slice(0, 100)}...</Typography>
                <Button component={Link} to={`/posts/${post._id}`} color="primary">
                  Read More
                </Button>
                <IconButton 
                  color="primary"
                  component={Link}
                  to={`/edit-post/${post._id}`}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  color="secondary"
                  onClick={() => handleDelete(post._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PostList;
