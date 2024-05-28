import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import RegisterPage from './pages/RegisterPage';
import { useEffect } from 'react';
import api from './utils/api';
import Header from './components/Header';

function App() {
  const valid = async () => {
    const res = await api.get('/user/getCsrfToken');
    !res && alert('서비스 접근 불가');
  };

  useEffect(() => {
    valid();
  }, []);
  return (
    <Header>
      <Routes>
        <Route path='/' element={<TodoPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </Header>
  );
}

export default App;
