import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { logo } from '../assets/icons';
import { postUserData } from '../apis/user';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', fullname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);

    const response = await postUserData(formData);

    if (response.status === 'success') {
      Swal.fire({
        title: 'Success!',
        text: 'Success register account',
        icon: 'success',
        confirmButtonText: 'OK!',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/sign-in');
        }
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Mechaku | Sign Up</title>
      </Helmet>
      <div className="w-full min-h-screen px-5 py-[50px] bg-[#F9FAFF]">
        <div className="lg:w-fit mx-auto bg-white shadow-2xl shadow-black/10 rounded-[50px] px-8 md:px-12 py-4 md:py-8">
          {/* Header */}
          <div className="flex flex-col justify-center items-center">
            <img
              src={logo}
              alt="Mechaku Logo"
              className="w-20 h-20 object-cover bg-center mb-8"
            />
            <h1 className="font-bold text-2xl md:text-3xl text-zinc-700 tracking-wide mb-4">Sign Up</h1>
            <p className="text-lg text-zinc-500">Daftar dan bergabung dengan kami</p>

            {/* Form */}
            <form onSubmit={(e) => handleSubmit(e)} className="w-full text-left mt-[50px]">
              {/* Fullname */}
              <label htmlFor="fullname" className="flex flex-col mb-6">
                <p className="text-lg text-zinc-600 mb-2">Full Name</p>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="Enter Your Fullname..."
                  className="rounded-full bg-slate-50 shadow-sm px-6 lg:px-8 py-3 lg:py-4 text-zinc-600 text-lg placeholder:text-zinc-300 border-2 outline-none border-zinc-400 focus:border-zinc-400 focus:shadow-2xl focus:shadow-emerald-100"
                  required
                />
              </label>

              {/* Email Address */}
              <label htmlFor="email" className="flex flex-col mb-6">
                <p className="text-lg text-zinc-600 mb-2">Email Address</p>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address..."
                  className="rounded-full bg-slate-50 shadow-sm px-6 lg:px-8 py-3 lg:py-4 text-zinc-600 text-lg placeholder:text-zinc-300 border-2 outline-none border-zinc-400 focus:border-zinc-400 focus:shadow-2xl focus:shadow-emerald-100"
                  required
                />
              </label>

              {/* Password */}
              <label htmlFor="password" className="flex flex-col mb-6">
                <p className="text-lg text-zinc-600 mb-2">Password</p>
                <div className="relative">
                  <input
                    type={`${hidePassword ? 'password' : 'text'}`}
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Your Password..."
                    className="w-full rounded-full bg-slate-50 shadow-sm px-8 py-4 text-zinc-600 text-lg placeholder:text-zinc-300 border-2 outline-none border-zinc-400 focus:border-zinc-400 focus:shadow-2xl focus:shadow-emerald-100"
                    required
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-400 text-2xl duration-300 cursor-pointer" onClick={() => setHidePassword(!hidePassword)}>
                    {hidePassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </div>
                </div>
              </label>

              {/* Avatar */}
              <label htmlFor="filename" className="flex flex-col mb-8">
                <p className="text-lg text-zinc-600 mb-2">Avatar</p>
                <input
                  type="file"
                  name="filename"
                  id="filename"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  className="rounded-full bg-slate-50 shadow-sm px-6 lg:px-8 py-3 lg:py-4 text-zinc-600 text-lg placeholder:text-zinc-300 border-2 outline-none border-zinc-400 focus:border-zinc-400 focus:shadow-2xl focus:shadow-emerald-100
                file:mr-5 file:py-2 file:px-6 file:rounded-full file:bg-zinc-200 file:text-zinc-600 file:font-medium file:border-none file:cursor-pointer"
                />
              </label>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 font-semibold text-white text-lg tracking-wide px-6 lg:px-8 py-3 lg:py-4 rounded-full duration-300"
              >
                Complete Sign Up
              </button>
              <p className="mt-3 text-zinc-600 text-center">
                Already have an account? {'  '}
                <Link to="/sign-in" className="underline">Sign In Now</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
