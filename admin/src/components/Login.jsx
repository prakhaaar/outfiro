import React, { useState } from "react";
import login from "../assets/login.png";
import axios from "axios";
import { backend_url } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backend_url}/api/user/admin`, {
        email,
        password,
      });
      data.success ? setToken(data.token) : toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex h-full w-full bg-white">
      <div className="hidden w-1/2 sm:block">
        <img
          src={login}
          alt="Login visual"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full sm:w-1/2 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-[90%] max-w-md mx-auto flex flex-col gap-5 text-gray-800"
        >
          <h3 className="text-3xl font-bold mb-4">Login</h3>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded bg-primary"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded bg-primary"
          />
          <button type="submit" className="btn-dark w-full py-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
