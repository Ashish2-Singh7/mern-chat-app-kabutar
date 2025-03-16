
import React, { useRef, useState } from 'react';

import { MdEdit } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

import { useSettingsContext } from '../../context/SettingContext';

import GenderCheckBox from '../../Pages/SignUp/GenderCheckBox';

const Settings = () => {
    const [inputs, setInputs] = useState({ username: "", currentPassword: "", newPassword: "", fullName: "", gender: "" });
    const loading = false;
    const { setShowSettings } = useSettingsContext();
    const profileImgRef = useRef();
    const [profileImg, setProfileImg] = useState(null);

    const handleSubmit = () => {

    }

    const onInputChangeHandler = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const handleCheckBoxChange = (gender) => {
        setInputs({ ...inputs, gender });
    }

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div
            className='w-[256.8px] bg-gray-900 p-3 border-r border-slate-500'
        >

            <div className="close">
                <IoMdClose
                    className='text-2xl cursor-pointer'
                    onClick={() => { setShowSettings(false) }}
                />
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col items-center' >
                <div className="flex flex-col items-center">
                    {/* USER AVATAR */}
                    <div className='avatar'>
                        <div className='w-20 rounded-full relative group/avatar'>
                            <img src={!profileImg ? "/avatar-placeholder.png" : profileImg} />
                            <div className='absolute bottom-5 right-0 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer'>
                                <MdEdit
                                    className='w-4 h-4 text-white'
                                    onClick={() => { profileImgRef.current.click() }}
                                />
                            </div>
                        </div>
                    </div>
                    <label className="label p-2">
                        <span className="text-base label-text">Profile Image</span>
                    </label>
                    <input
                        type='file'
                        hidden
                        accept="image/*"
                        ref={profileImgRef}
                        onChange={handleImgChange}
                    />
                </div>
                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">Username</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        className="w-full input h-10"
                        name="username"
                        value={inputs.username}
                        onChange={onInputChangeHandler}
                    />
                </div>
                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">Full Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        className="w-full input h-10"
                        name="fullName"
                        value={inputs.fullName}
                        onChange={onInputChangeHandler}
                    />
                </div>

                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">Current Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Current Password"
                        className="w-full input h-10"
                        name="currentPassword"
                        value={inputs.currentPassword}
                        onChange={onInputChangeHandler}
                    />
                </div>
                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">New Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        className="w-full input h-10"
                        name="newPassword"
                        value={inputs.newPassword}
                        onChange={onInputChangeHandler}
                    />
                </div>
                <div className='my-2'>
                    <GenderCheckBox handleCheckBoxChange={handleCheckBoxChange} selectedValue={inputs.gender} />
                </div>
                <div>
                    <button
                        className="btn btn-block btn-md mt-2"
                        disabled={loading}
                    >
                        {loading ? <span className="loading loading-spinner"></span> : "Update"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Settings
