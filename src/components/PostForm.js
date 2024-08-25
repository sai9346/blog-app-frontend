import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`);
          if (!response.ok) {
            throw new Error('Post not found');
          }
          const post = await response.json();
          setTitle(post.title);
          setContent(post.content);
          setAuthor(post.author);
        } catch (err) {
          console.error('Error fetching post:', err);
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!title || !content || !author) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const method = id ? 'PUT' : 'POST';
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts${id ? `/${id}` : ''}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, author }),
      });

      if (!response.ok) {
        throw new Error('Failed to save post');
      }

      alert(`Post ${id ? 'updated' : 'created'} successfully`);
      navigate('/');
    } catch (err) {
      setError(err.message);
      console.error('Error saving post:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        {id ? 'Edit Post' : 'Create New Post'}
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          fullWidth
          label="Content"
          variant="outlined"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          fullWidth
          label="Author"
          variant="outlined"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <Button variant="contained" color="primary" type="submit" disabled={loading}>
          {loading ? 'Saving...' : (id ? 'Update Post' : 'Create Post')}
        </Button>
      </form>
    </Container>
  );
};

export default PostForm;
