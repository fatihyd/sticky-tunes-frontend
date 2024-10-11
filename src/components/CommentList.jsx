import { useEffect, useState } from 'react';
import axios from 'axios';
import CommentItem from './CommentItem';

function CommentList({ postId }) {
    const [comments, setComments] = useState([]);

    // Fetch comments for the post
    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:5139/api/posts/${postId}/comments`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    return (
        <div className="comment-list">
            {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </div>
    );
}

export default CommentList;
