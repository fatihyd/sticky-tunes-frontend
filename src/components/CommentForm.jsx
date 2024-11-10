import { useState } from 'react';
import axios from 'axios';

function CommentForm({ postId, onCommentAdded }) {
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5250/api/posts/${postId}/comments`, { spotifyUrl, text });
      setSpotifyUrl('');
      setText('');
      // Refresh comments
      onCommentAdded();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Spotify Track URL"
        value={spotifyUrl}
        onChange={(e) => setSpotifyUrl(e.target.value)}
        required
      />
      <textarea
        placeholder="Your comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      ></textarea>
      <button type="submit">Comment</button>
    </form>
  );
}

export default CommentForm;
