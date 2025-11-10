
import type React from "react";
import { Link } from "react-router-dom";
import SignupForm from "../components/SignupForm";

const SignupPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100dvh-80px)] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Join EventHub
        </h1>
        <p className="text-gray-600 text-center mb-8 text-sm">
          Create an account to get started
        </p>

        {/* Form */}
        <SignupForm />

        {/* Footer */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
