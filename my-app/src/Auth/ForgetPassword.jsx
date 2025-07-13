import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleForgotPassword() {
    if (!email) {
      setMsg('Please enter your email');
      return;
    }

    setLoading(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email })
      .then((res) => {
        if (res.data.statusMsg === 'success') {
          localStorage.setItem('resetEmail', email); // عشان نستخدمه في المراحل الجاية
          setMsg('Reset code sent successfully!');
          setTimeout(() => navigate('/verify-reset-code'), 2000);
        } else {
          setMsg('Something went wrong');
        }
      })
      .catch((err) => {
        setMsg(err?.response?.data?.message || 'Failed to send reset code');
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white">
      <h2 className="text-2xl font-medium text-gray-700 mb-6">Forgot Password</h2>
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleForgotPassword}
        disabled={loading}
className="w-full px-4 py-2 bg-white text-green-500 border border-green-500 rounded hover:bg-green-600 hover:text-white disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Reset Code'}
      </button>

      {msg && (
        <p className={`mt-4 text-sm text-center ${msg.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
          {msg}
        </p>
      )}
    </div>
  );
}
