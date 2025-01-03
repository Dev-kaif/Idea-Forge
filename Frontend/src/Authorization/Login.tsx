import React, { useState } from "react";
import Button from "../Components/Button";

const LoginPage: React.FC = () => {
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login Submitted", { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-white">
      <div className="w-full max-w-md p-6 bg-zinc-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 bg-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 bg-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <Button text={"Login"} variant="bg-purple-700 hover:bg-purple-600 justify-center transition focus:outline-none focus:ring-2 focus:ring-purple-500"/>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-blue-400 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
