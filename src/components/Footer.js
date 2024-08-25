import React from 'react';
import { Container, Typography } from '@mui/material';

const Footer = () => (
  <footer style={{ marginTop: 'auto', padding: '1em 0', backgroundColor: '#f1f1f1' }}>
    <Container maxWidth="lg">
      <Typography variant="body2" color="textSecondary" align="center">
        {'© '}
        BlogApp {new Date().getFullYear()}
      </Typography>
    </Container>
  </footer>
);

export default Footer;
