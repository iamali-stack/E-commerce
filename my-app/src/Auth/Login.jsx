import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext.jsx';

export default function Login() {
  const { setuserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [errMsg, seterrMsg] = useState(null);
  const [isLoading, setLoading] = useState(false);

  function submitForm(values) {
    setLoading(true);
    seterrMsg(null);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .then((response) => {
        if (response.data.message === 'success') {
          setuserLogin(response.data?.token);
          localStorage.setItem('usertoken', response.data?.token);
          navigate('/home');
        }
      })
      .catch((error) => {
        seterrMsg(error?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid email format'),
    password: Yup.string()
      .required('Password is required')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/, 'Password must contain at least 6 characters, including uppercase, lowercase, number, and special character'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: submitForm
  });

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white">
      <h1 className="text-2xl font-normal text-gray-700 mb-6">Login</h1>
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm text-gray-600 mb-1">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
          />
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.email}</div>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm text-gray-600 mb-1">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="current-password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.password}</div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => navigate('/forget-password')}
            className="text-sm text-gray-600 hover:text-gray-800 bg-transparent border-0 p-0"
          >
            Forgot your password?
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-white text-green-500 border border-green-500 rounded hover:bg-green-600 hover:text-white disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        {errMsg && (
          <div className="text-red-600 text-sm text-center mt-4">{errMsg}</div>
        )}
      </form>
    </div>
  );
}
