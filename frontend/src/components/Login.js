import React from "react";
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await api.post("api/auth/login", { email, password });
      const { user } = response.data;
      console.log(user);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1000,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err.response.status === 404 || err.response.status === 401) {
        toast.error("Invalid Email or Password", {
          position: "top-center",
          autoClose: 1000,
        });
      } else {
        toast.error(err.response.message, {
          position: "top-center",
          autoClose: 1000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  //handleSignUp
  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleSignUp}>Sign Up</button>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <button
          type="submit"
          disabled={loading}
          style={{
            color: loading ? "lightgray" : "gray",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Processing..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
