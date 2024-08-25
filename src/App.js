import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';
import NewPostPage from './pages/NewPostPage';
import PostPage from './pages/PostPage';


const App = () => (
  <Router>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/new-post" element={<NewPostPage />} />
        <Route path="/edit-post/:id" element={<PostPage />} />
      </Routes>
    </main>
    <Footer />
  </Router>
);

export default App;
