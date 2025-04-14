import React from "react";
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  console.log(process.env.REACT_APP_API_URL);

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await api.post("api/auth/register", {
        name,
        email,
        password,
      });

      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1000,
      });
      navigate("/login");
    } catch (error) {
      toast.error(error.response.message, {
        position: "top-center",
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  const backLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1>Register</h1>
      <button onClick={backLogin}>back</button>
      <br />
      <br />
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <br />
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
          {loading ? "Processing..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Login;
