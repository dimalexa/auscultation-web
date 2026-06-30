import React, { useState } from 'react';
import CommentList from './CommentList';
import '../../styles/post.css';

function Post({ post, onDeletePost, onAddComment, onDeleteComment }) {
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  const handleAddComment = (e) => {
    e.preventDefault();
    
    if (!commentText.trim() || !commentAuthor.trim()) {
      alert('Пожалуйста, введите имя и комментарий!');
      return;
    }

    const newComment = {
      id: Date.now(),
      text: commentText.trim(),
      author: commentAuthor.trim(),
      date: new Date().toLocaleString()
    };

    onAddComment(post.id, newComment);
    
    // Очистка формы комментария
    setCommentText('');
    setCommentAuthor('');
  };

  return (
    <article className="post-card">
      <div className="post-header">
        <h3 className="post-title">{post.title}</h3>
        <button 
          onClick={() => onDeletePost(post.id)} 
          className="delete-post-btn"
          aria-label="Удалить пост"
        >
          🗑️
        </button>
      </div>
      
      <div className="post-meta">
        <span className="post-author">{post.author}</span>
        <span className="post-date">{post.date}</span>
      </div>
      
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      
      <div className="comments-section">
        <h4>💬 Комментарии ({post.comments.length})</h4>
        
        <CommentList 
          comments={post.comments} 
          postId={post.id}
          onDeleteComment={onDeleteComment}
        />
        
        <form onSubmit={handleAddComment} className="comment-form">
          <div className="comment-form-row">
            <input
              type="text"
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
              placeholder="Ваше имя"
              className="comment-author-input"
              required
            />
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Написать комментарий..."
              className="comment-text-input"
              rows="2"
              required
            />
          </div>
          <button type="submit" className="comment-submit-btn">
            💬 Отправить комментарий
          </button>
        </form>
      </div>
    </article>
  );
}

export default Post;