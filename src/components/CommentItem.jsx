function CommentItem({ comment }) {
    return (
        <div className="comment-item">
            <iframe
                src={`https://open.spotify.com/embed/track/${comment.track.spotifyTrackId}`}
                width="100%"
                height="80"
                frameBorder="0"
                allow="encrypted-media"
                title={comment.track.name}
            ></iframe>
            <p>{comment.text}</p>
            <p><small>Commented on {new Date(comment.datePosted).toLocaleString()}</small></p>
        </div>
    );
}

export default CommentItem;
