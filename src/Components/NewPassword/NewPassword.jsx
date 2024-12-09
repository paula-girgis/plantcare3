
// // /^[A-Z][a-z0-9]{5,10}$/

// import axios from 'axios';
// import { useFormik } from 'formik';
// import React, {  useState } from 'react';
// import {  useNavigate } from 'react-router-dom';
// import * as Yup from 'yup';

// export default function NewPassword() {
   
//     let navigate = useNavigate()
//     let [msg, setMsg] = useState('')
//     let [isLoading, setLoading] = useState(false)
//     const [error, setError] = useState(null);

//     async function handlePassword(values) {
//         try {
//             setLoading(true)
//             let { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
//             if (data.token) {
//                 setLoading(false)
//                 setMsg('')
//                 navigate('/login')
//             }

//         } catch (err) {
//             setLoading(false)
//             setMsg(err?.response?.data?.message)
//         }
//     }

//     // Backend
//     let validationSchema = Yup.object({
//         email: Yup.string().email().required('email is required'),
//         newPassword: Yup.string().matches(/^[A-Za-z\d@$!%*?&]{8,100}$/).required('password is required'),
//     })

//     let formik = useFormik({
//         initialValues: {
//             email: '',
//             newPassword: '',
//         },
//         validationSchema,
//         onSubmit: handlePassword
//     })


//     return <>
  
//     <div className='regiserBack flex justify-center items-center'>
//     <div className="py-10 mx-auto shadow-2xl bg-transparent w-full max-w-5xl">

//     {msg ? <div className=" p-4 m-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
//              <span className="font-medium">{msg}</span>
//     </div> : ''}

//         {error ? (<div className="alert alert-danger mb-3 p-2 text-center">{error}</div>) : null}
//         <h2 className="p-6 Color text-lg font-bold mb-6 shadow-sm text-center">You should have recieved a reset Link, Check Your mail </h2>
        
//         <form className="max-w-lg mx-auto" onSubmit={formik.handleSubmit}>

//         <div className="relative z-0 w-full mb-5 group">
//                     <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
//                     <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
//                 </div>

//                 {/* alert */}

//                 {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
//                     <span className="font-medium">{formik.errors.email}</span>
//                 </div> : ''}

//                 <div className="relative z-0 w-full mb-5 group">
//                     <input onBlur={formik.handleBlur} type="password" value={formik.values.newPassword} onChange={formik.handleChange} id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
//                     <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">newPassword</label>
//                 </div>


//                 {/* alert */}

//                 {formik.errors.newPassword && formik.touched.newPassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
//                     <span className="font-medium">{formik.errors.newPassword}</span>
//                 </div> : ''}


//                 <button type="submit" className="btn bg-main mt-4 d-block mx-auto bttn w-full text-center text-white hover:bg-green-800 transition">
//               {isLoading?<i className='fas fa-spinner fa-spin' ></i> : "Login"}
//               </button>
//          </form>
//     </div>
//     </div>

// </>
// }


import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function NewPassword() {
  const location = useLocation();

  // Extract token and email from the URL query parameters
  const token = new URLSearchParams(location.search).get("token");
  const email = new URLSearchParams(location.search).get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // If token or email is missing, display an error
    if (!token || !email) {
      setError("Missing token or email.");
    }
  }, [token, email]);

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Check if the new password matches the confirm password
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Send POST request with the new password and confirm password in the body
      const response = await axios.post(
        "http://plantcarehub-001-site1.otempurl.com/User/reset-password",
        {
          newPassword,  // Include the new password in the request body
          confirmPassword,  // Include the confirm password in the request body
        },
        {
          params: { token, email },  // Pass token and email as query parameters
        }
      );
      // Display success message if the password reset is successful
      setSuccess(response.data.message);
    } catch (err) {
      // Handle any errors that occur
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="new-password-container">
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      {!success && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
}