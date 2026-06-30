import React, { useState, useEffect } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import '../styles/blog.css';
import '../styles/general.css';
import HamburgerMenu from './components/Menu';

export default function Blog() {
  const [posts, setPosts] = useState([]);

  // Загрузка постов из localStorage при монтировании
  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  // Сохранение постов в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const addComment = (postId, comment) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, comment]
        };
      }
      return post;
    }));
  };

  const deleteComment = (postId, commentId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.filter(comment => comment.id !== commentId)
        };
      }
      return post;
    }));
  };

  return (
        <div className='general-block'>
            <HamburgerMenu />
            <div className="app">
            <header className="app-header">
                <h1>📝 Блог</h1>
                <p>Тут когда-нибудь будут посты</p>
            </header>
            <main className="app-main">
                <PostList 
                posts={posts} 
                onDeletePost={deletePost}
                onAddComment={addComment}
                onDeleteComment={deleteComment}
                />
                <PostForm onAddPost={addPost} />
            </main>
            </div>
        </div>
  );
}