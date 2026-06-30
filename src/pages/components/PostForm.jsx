import React, { useState } from 'react';
import '../../styles/postform.css';

function PostForm({ onAddPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !author.trim()) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      date: new Date().toLocaleString(),
      comments: []
    };

    onAddPost(newPost);
    
    // Очистка формы
    setTitle('');
    setContent('');
    setAuthor('');
  };

  return (
    <div className="post-form-container">
      <h2>Создать новый пост</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">Заголовок:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите заголовок..."
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="author">Автор:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Ваше имя..."
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Содержание:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Напишите что-нибудь интересное..."
            rows="6"
            required
          />
        </div>
        
        <button type="submit" className="submit-btn">
          Опубликовать пост
        </button>
      </form>
    </div>
  );
}

export default PostForm;