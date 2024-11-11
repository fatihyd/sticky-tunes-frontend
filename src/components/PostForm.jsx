import { useState } from 'react';
import axios from 'axios';

function PostForm({ addPost }) {
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [text, setText] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError('');

    try {
      const response = await axios.post('http://localhost:5250/api/posts', { spotifyUrl, text });
      addPost(response.data);
      setSpotifyUrl('');
      setText('');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { errors, message } = error.response.data;

        if (errors && typeof errors === 'object') {
          setFieldErrors(errors);
        } else if (message) {
          setGeneralError(message);
        } else {
          setGeneralError('An unknown error occurred.');
        }
      } else {
        console.error('Error creating post:', error);
        setGeneralError('An unexpected error occurred.');
      }
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      {generalError && (
        <div className="error-messages">
          <p className="error-text">{generalError}</p>
        </div>
      )}

      <div className="form-group">
        <input
          type="text"
          placeholder="Spotify Track URL"
          value={spotifyUrl}
          onChange={(e) => setSpotifyUrl(e.target.value)}
        />
        {fieldErrors.SpotifyUrl && fieldErrors.SpotifyUrl.map((msg, idx) => (
          <p key={idx} className="error-text">{msg}</p>
        ))}
      </div>

      <div className="form-group">
        <textarea
          placeholder="Your thoughts..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        {fieldErrors.Text && fieldErrors.Text.map((msg, idx) => (
          <p key={idx} className="error-text">{msg}</p>
        ))}
      </div>

      <button type="submit">Post</button>
    </form>
  );
}

export default PostForm;
