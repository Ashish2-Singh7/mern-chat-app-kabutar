import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
    const [inputs, setInputs] = useState({ username: '', password: '' });
    const onInputChangeHandler = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    const { loading, login } = useLogin();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(inputs);
    }
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400/0 bg-clip-padding backdrop-filter backdrop-blur-lg">
                <h1 className="font-semibold text-center text-3xl text-gray-300">
                    Login
                    <span className="text-blue-500">ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
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
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full input h-10"
                            name="password"
                            value={inputs.password}
                            onChange={onInputChangeHandler}
                        />
                    </div>
                    <Link to="/signup" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                        {"Don't"} have an account ?
                    </Link>
                    <div>
                        <button
                            className="btn btn-block btn-sm mt-2"
                            disabled={loading}
                        >
                            {loading ? <span className="loading loading-spinner"></span> : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
