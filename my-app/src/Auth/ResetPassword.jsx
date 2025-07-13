import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem('resetEmail');

  function handleResetPassword() {
    if (!newPassword) {
      setMsg('Please enter a new password');
      return;
    }

    setLoading(true);
    axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
      email,
      newPassword
    })
      .then((res) => {
        if (res.data.token) {
          setMsg('Password reset successfully!');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setMsg('Something went wrong');
        }
      })
      .catch((err) => {
        setMsg(err?.response?.data?.message || 'Reset failed');
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white">
      <h2 className="text-2xl font-medium text-gray-700 mb-6">Reset Password</h2>
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button
        onClick={handleResetPassword}
        disabled={loading}
className="w-full px-4 py-2 bg-white text-green-500 border border-green-500 rounded hover:bg-green-600 hover:text-white disabled:opacity-50"
      >
        {loading ? 'Resetting...' : 'Reset Password'}
      </button>

      {msg && (
        <p className={`mt-4 text-sm text-center ${msg.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
          {msg}
        </p>
      )}
    </div>
  );
}
