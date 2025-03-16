import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup';

const SignUp = () => {

  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });

  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }
  const { loading, signup } = useSignup();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await signup(inputs);
  }

  const handleCheckBoxChange = (gender) => {
    setInputs({ ...inputs, gender });
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className="w-full p-6 rounded-lg shadow-lg bg-white/5 bg-clip-padding backdrop-filter backdrop-blur-3xl">
        <h1 className="font-semibold text-center text-3xl text-gray-300">
          Sign Up
        </h1>

        <form onSubmit={onSubmitHandler}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Full name"
              className="w-full input h-10"
              value={inputs.fullName}
              name='fullName'
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter your Username"
              name='username'
              value={inputs.username}
              onChange={onChangeHandler}
              className="w-full input h-10"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input h-10"
              value={inputs.password}
              onChange={onChangeHandler}
              name='password'
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input h-10"
              value={inputs.confirmPassword}
              name='confirmPassword'
              onChange={onChangeHandler}
            />
          </div>

          <GenderCheckBox handleCheckBoxChange={handleCheckBoxChange} selectedValue={inputs.gender} />

          <Link to="/login" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
            Already have an account ?
          </Link>
          <div>
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              disabled={loading}
            >
              {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
