import React, { useState } from "react";
import Button from "../Components/Button";

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name:"",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    console.log("Signup Submitted", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-white">
      <div className="w-full max-w-md p-6 bg-zinc-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 bg-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 bg-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 bg-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 bg-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <Button
            text={"Sign Up"}
            variant="bg-purple-700 hover:bg-purple-600 justify-center transition focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
