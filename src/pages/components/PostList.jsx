import React from 'react';
import Post from './Post';
import '../../styles/postlist.css';

function PostList({ posts, onDeletePost, onAddComment, onDeleteComment }) {
  if (posts.length === 0) {
    return (
      <div className="post-list-empty">
        <p>Пока нет постов. Будьте первым, кто создаст пост!</p>
      </div>
    );
  }

  return (
    <div className="post-list">
      <h2>Все посты ({posts.length})</h2>
      {posts.map(post => (
        <Post 
          key={post.id} 
          post={post} 
          onDeletePost={onDeletePost}
          onAddComment={onAddComment}
          onDeleteComment={onDeleteComment}
        />
      ))}
    </div>
  );
}

export default PostList;