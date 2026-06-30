import logo from './logo.svg';
import './App.css';
import AuscultationQuiz from './pages/AusqultationQuiz';
import Main from './pages/Main';
import Blog from './pages/Blog';
import About from './pages/About';
import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auscultation" element={<AuscultationQuiz/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/blog" element={<Blog/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
