import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // After login, redirect to home
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password"); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#6D2764]">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-[#6D2764] rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-[#6D2764] rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#6D2764] hover:bg-[#6D2764] text-white py-2 rounded"
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleForgotPassword}
          className="w-full mt-4 text-[#6D2764] hover:underline text-sm"
        >
          Forgot Password?
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-[#6D2764] hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
