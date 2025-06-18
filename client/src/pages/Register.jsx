import { useState } from 'react';
import axios from 'axios';
import '../styles/Register.css';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    companyName: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://my-game-m48h.onrender.com/api/auth/register',
        form
      );

      // ✅ Save user ID and token to localStorage
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('token', res.data.token);

      setMessage('✅ Registered & logged in!');
      navigate('/'); // redirect to main game/dashboard
    } catch (err) {
      console.error(err);
      setMessage('❌ Registration failed.');
    }
  };

  return (
    <div className='login-container'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className='login-form'>
        <input
          type='text'
          name='companyName'
          placeholder='Company Name'
          value={form.companyName}
          onChange={handleChange}
          required
        />
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
        <button type='submit'>Register</button>
        {message && <p className='message'>{message}</p>}
      </form>

      {/* 🔹 Login Button */}
      <div className='login-link'>
        <p>Already have an account?</p>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
}
