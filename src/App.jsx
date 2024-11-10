import { useEffect, useState } from 'react';
import axios from 'axios';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  // Fetch all posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5250/api/posts'); // Adjust the API URL as needed
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Handler to add a new post
  const addPost = (post) => {
    setPosts([post, ...posts]);
  };

  return (
    <div className="App">
      <h1>Sticky Tunes</h1>
      <PostForm addPost={addPost} />
      <PostList posts={posts} />
    </div>
  );
}

export default App;
