import { useEffect, useState } from 'react';
import axios from 'axios';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

function PostItem({ post }) {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5250/api/posts/${post.id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="post-item">
      <iframe
        src={`https://open.spotify.com/embed/track/${post.track.spotifyTrackId}`}
        width="100%"
        height="80"
        frameBorder="0"
        allow="encrypted-media"
        title={post.track.name}
      ></iframe>
      <p>{post.text}</p>
      <p><small>Posted on {new Date(post.datePosted).toLocaleString()}</small></p>
      <CommentForm postId={post.id} onCommentAdded={fetchComments} />
      <CommentList comments={comments} />
    </div>
  );
}

export default PostItem;
