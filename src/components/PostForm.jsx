import { useState } from 'react';
import axios from 'axios';

function PostForm({ addPost }) {
    const [spotifyUrl, setSpotifyUrl] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5139/api/posts', { spotifyUrl, text });
            addPost(response.data);
            setSpotifyUrl('');
            setText('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <form className="post-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Spotify Track URL"
                value={spotifyUrl}
                onChange={(e) => setSpotifyUrl(e.target.value)}
                required
            />
            <textarea
                placeholder="Your thoughts..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
            ></textarea>
            <button type="submit">Post</button>
        </form>
    );
}

export default PostForm;
