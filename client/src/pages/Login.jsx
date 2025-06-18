import { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://my-game-m48h.onrender.com/api/auth/login',
        form
      );

      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('token', res.data.token);

      setMessage('✅ Logged in!');
      navigate('/');
    } catch (err) {
      console.error(err);
      setMessage('❌ Invalid email or password.');
    }
  };

  return (
    <div className='login-container'>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit} className='login-form'>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type='submit'>Login</button>
        {message && <p className='message'>{message}</p>}
      </form>

      {/* 🔹 Register Button */}
      <div className='register-link'>
        <p>Don't have an account?</p>
        <button onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  );
}
