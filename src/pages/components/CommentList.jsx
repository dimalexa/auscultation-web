import React from 'react';
import '../../styles/commentlist.css';

function CommentList({ comments, postId, onDeleteComment }) {
  if (comments.length === 0) {
    return <p className="no-comments">Пока нет комментариев. Будьте первым!</p>;
  }

  return (
    <div className="comment-list">
      {comments.map(comment => (
        <div key={comment.id} className="comment-item">
          <div className="comment-header">
            <strong className="comment-author">{comment.author}</strong>
            <span className="comment-date">{comment.date}</span>
            <button 
              onClick={() => onDeleteComment(postId, comment.id)}
              className="delete-comment-btn"
              aria-label="Удалить комментарий"
            >
              🗑️
            </button>
          </div>
          <p className="comment-text">{comment.text}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentList;