import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';

import SampleAvatar from '../assets/images/pic.png';
import { Header } from '../components/DasboardComponents';
import { fetchUpdateProfile } from '../redux/features/userSlice';

const MemberSettingsPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState(user?.name);
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone_number', phoneNumber);
    formData.append('avatar', avatar);

    const updateProfileData = {
      id: user.id,
      data: formData,
    };

    dispatch(fetchUpdateProfile(updateProfileData));
  };

  return (
    <>
      <Helmet>
        <title>Mechaku | Edit Profile</title>
      </Helmet>
      <section className="mt-10 xl:mt-0">
        <Header title="Edit My Profile" />

        <div className="max-w-xl mt-10 bg-white px-8 py-4 rounded-2xl shadow-2xl shadow-black/10">
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="avatar" className="flex items-center gap-4 mb-6">
              <img
                src={`${user?.avatar ? `https://mechaku-server.zaerodev.my.id/uploads/users/${user?.avatar}` : SampleAvatar}`}
                alt="avatar"
                className="w-20 h-20 rounded-full object-cover bg-center bg-no-repeat"
              />
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
                className="rounded-full bg-slate-50 px-4 py-2 text-zinc-600 placeholder:text-zinc-300 border-2 outline-none
              file:mr-5 file:rounded-full file:bg-zinc-200 file:text-zinc-600 file:border-none file:cursor-pointer"
              />
            </label>
            <label htmlFor="name" className="flex flex-col mb-6">
              <p className="font-medium text-slate-600 mb-2">Fullname</p>
              <input
                type="text"
                name="name"
                id="name"
                className="input input-bordered max-w-xl text-zinc-700 placeholder:text-slate-300"
                placeholder="Enter your fullname"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label htmlFor="email" className="flex flex-col mb-6">
              <p className="font-medium text-slate-600 mb-2">Email Address</p>
              <input
                type="email"
                name="email"
                id="email"
                className="input input-bordered max-w-xl text-zinc-700 placeholder:text-slate-300"
                placeholder="Enter your email address"
                value={user?.email}
                disabled
              />
            </label>
            <label htmlFor="name" className="flex flex-col mb-6">
              <p className="font-medium text-slate-600 mb-2">Phone Number</p>
              <input
                type="tel"
                name="name"
                id="name"
                className="input input-bordered max-w-xl text-zinc-700 placeholder:text-slate-300"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </label>
            <button type="submit" className="btn btn-primary rounded-full">
              Save Changes
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default MemberSettingsPage;
