//////////// first one without username ////////////////////
// import { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       navigate("/"); // After register, redirect to home
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
//         <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Register</h2>

//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password (at least 6 characters)"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-text-[#6D2764] hover:bg-green-600 text-white py-2 rounded"
//         >
//           Register
//         </button>

//         <p className="text-sm text-center mt-4">
//           Already have an account?{" "}
//           <a href="/login" className="text-[#6D2764] hover:underline">
//             Login
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Register;



//////////////second with username//////////////////
// import { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const [username, setUsername] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [error, setError] = useState<string>("");
//   const navigate = useNavigate();

//   const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(""); // Reset error before new attempt

//     try {
//       // Firebase registration
//       await createUserWithEmailAndPassword(auth, email, password);
//       // After successful registration, redirect to login page
//       navigate("/login"); 
//     } catch (err: any) {
//       setError(err.message); // Set error message on failure
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
//         <h2 className="text-2xl font-bold mb-6 text-center text-[#6D2764]">Register</h2>

//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password (at least 6 characters)"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-[#6D2764] hover:bg-green-600 text-white py-2 rounded"
//         >
//           Register
//         </button>

//         <p className="text-sm text-center mt-4">
//           Already have an account?{" "}
//           <a href="/login" className="text-[#6D2764] hover:underline">
//             Login
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Register;




////////////////third changes for the profule //////////
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Reset error before new attempt

    try {
      // Firebase registration
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set displayName (username) after user registration
      await updateProfile(user, { displayName: username });

      // After successful registration, redirect to login page
      navigate("/login");
    } catch (err: any) {
      setError(err.message); // Set error message on failure
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#6D2764]">Register</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border border-[#6D2764]  rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-[#6D2764]  rounded"
          required
        />

        <input
          type="password"
          placeholder="Password (at least 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-[#6D2764]  rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#6D2764] hover:bg-[#6D2765] text-white py-2 rounded"
        >
          Register
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#6D2764] hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
