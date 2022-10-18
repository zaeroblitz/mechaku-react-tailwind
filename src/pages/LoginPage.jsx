import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { logo } from '../assets/icons';
import { fetchUser } from '../redux/features/userSlice';
import SignInIllustration from '../assets/images/sign_in_illustration.jpg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const auth = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(fetchUser({ email, password }));
  };

  useEffect(() => {
    if (auth?.isLogin && !auth?.isLoading) {
      MySwal.fire({
        title: 'Success!',
        text: 'Login Success',
        icon: 'success',
        confirmButtonText: 'OK!',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/');
        }
      });
    } else if (!auth?.isLogin && auth?.error && !auth?.isLoading) {
      MySwal.fire({
        title: 'Error!',
        text: `Login Failed: ${auth?.error}`,
        icon: 'error',
        confirmButtonText: 'OK!',
      });
    }
  }, [auth]);

  return (
    <>
      <Helmet>
        <title>Mechaku | Sign In</title>
      </Helmet>
      <div className="w-full h-screen bg-[#F9FAFF] px-5 lg:overflow-hidden grid items-center grid-cols-1 lg:grid-cols-2 lg:px-20 lg:gap-10">
        <div className="hidden lg:block">
          <img
            src={SignInIllustration}
            alt="Illustration"
            className="h-auto object-cover bg-center bg-no-repeat mx-auto"
          />
        </div>

        <form onSubmit={handleSubmit} className="w-full bg-white rounded-[50px] shadow-2xl shadow-black/10 px-8 md:px-12 py-6 md:py-10">
          <div className="mb-8 mx-auto lg:mx-0">
            <img
              src={logo}
              alt="Logo"
              className="w-16 h-16 object-cover mb-10"
            />
            <h1 className="font-bold text-4xl text-zinc-700 mb-3">Sign In</h1>
            <p className="text-lg lg:text-xl text-zinc-500">Masuk untuk mencari mecha kesukaanmu</p>
          </div>
          <div className="mb-8 mx-auto lg:mx-0">
            <label htmlFor="email" className="flex flex-col">
              <p className="text-lg text-zinc-600 mb-2">Email Address</p>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email Address..."
                className="rounded-full bg-slate-50 shadow-sm px-8 py-4 text-zinc-600 text-lg placeholder:text-zinc-300 border-2 outline-none border-zinc-400 focus:border-zinc-400 focus:shadow-2xl focus:shadow-emerald-100"
                required
              />
            </label>
            <label htmlFor="password" className="flex flex-col mt-4">
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
          </div>
          <div className="text-center mx-auto lg:mx-0">
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 font-semibold text-white text-lg tracking-wide px-8 py-4 rounded-full duration-300 select-none"
            >
              Continue to Sign In
            </button>
            <p className="mt-3 text-zinc-600">
              Not registered yet? {'  '}
              <Link to="/sign-up" className="underline">Create an Account</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
