import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VerifyResetCode() {
  const [resetCode, setResetCode] = useState('');
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleVerifyCode() {
    if (!resetCode) {
      setMsg('Please enter the reset code');
      return;
    }

    setLoading(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', { resetCode })
      .then((res) => {
        if (res.data.status === 'Success') {
          setMsg('Code verified! Redirecting...');
          setTimeout(() => navigate('/reset-password'), 2000);
        } else {
          setMsg('Invalid reset code');
        }
      })
      .catch((err) => {
        setMsg(err?.response?.data?.message || 'Failed to verify reset code');
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white">
      <h2 className="text-2xl font-medium text-gray-700 mb-6">please enter your verification code
</h2>
      <input
        type="text"
        maxLength="6"
        className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
        placeholder="Enter the reset code"
        value={resetCode}
        onChange={(e) => setResetCode(e.target.value)}
      />
      <button
        onClick={handleVerifyCode}
        disabled={loading}
className="w-full px-4 py-2 bg-white text-green-500 border border-green-500 rounded hover:bg-green-600 hover:text-white disabled:opacity-50"
      >
        {loading ? 'Verifying...' : 'Verify Code'}
      </button>

      {msg && (
        <p className={`mt-4 text-sm text-center ${msg.includes('verified') ? 'text-green-600' : 'text-red-600'}`}>
          {msg}
        </p>
      )}
    </div>
  );
}
