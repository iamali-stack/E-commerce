import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext.jsx'

export default function Register() {
  let {setuserLogin}=useContext(UserContext);
  let navigate = useNavigate();
  const [errMsg, seterrMsg] = useState(null);
  const [isLoading, setLoading] = useState(false);
  
  function submitForm(values) {
    setLoading(true);
    seterrMsg(null);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
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
  
  // Form validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(3, 'Minimum 3 characters').max(20, 'Maximum 20 characters'),
    email: Yup.string().required('Email is required').email('Invalid email format'),
    password: Yup.string()
      .required('Password is required')
      .matches(/^(?=.*[A-Z])[a-zA-Z0-9]{4,10}$/, 'Password must contain at least 4 characters, one uppercase letter'),
    rePassword: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password')],
     'Passwords must match'),
    phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 
      'Phone must be a valid Egyptian phone number'),
  });

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit: submitForm
  });

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white">
      <h1 className="text-2xl font-normal text-gray-700 mb-6">Register</h1>
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm text-gray-600 mb-1">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="name"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
          />
          {formik.errors.name && formik.touched.name && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.name}</div>
          )}
        </div>

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
            autoComplete="new-password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.password}</div>
          )}
        </div>

        <div>
          <label htmlFor="rePassword" className="block text-sm text-gray-600 mb-1">Confirm Password:</label>
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="new-password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.rePassword}</div>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm text-gray-600 mb-1">Phone:</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="tel"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
          />
          {formik.errors.phone && formik.touched.phone && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.phone}</div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-sm text-gray-600 hover:text-gray-800 bg-transparent border-0 p-0"
          >
            Already have an account?
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-white text-green-500 border border-green-500 rounded hover:bg-green-600 hover:text-white disabled:opacity-50"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>

        {errMsg && (
          <div className="text-red-600 text-sm text-center mt-4">{errMsg}</div>
        )}
      </form>
    </div>
  );
}
