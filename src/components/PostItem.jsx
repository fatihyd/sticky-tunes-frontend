import CommentList from './CommentList';
import CommentForm from './CommentForm';

function PostItem({ post }) {
    return (
        <div className="post-item">
            <iframe
                src={`https://open.spotify.com/embed/track/${post.track.spotifyTrackId}`}
                width="300"
                height="80"
                frameBorder="0"
                allow="encrypted-media"
                title={post.track.name}
            ></iframe>
            <p>{post.text}</p>
            <p><small>Posted on {new Date(post.datePosted).toLocaleString()}</small></p>
            <CommentForm postId={post.id} />
            <CommentList postId={post.id} />
        </div>
    );
}

export default PostItem;
