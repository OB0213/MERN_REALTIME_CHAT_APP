import {
  EyeOff,
  Lock,
  Mail,
  MessageSquare,
  User,
  Eye,
  Loader2,
} from "lucide-react";
import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import AuthImagePattern from "../Components/AuthImagePattern";
import toast from "react-hot-toast";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();
  const validateForm = () => {
    if (!formdata.email.trim()) {
      return toast.error("Email is required");
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formdata.email.trim())) {
      return toast.error("Invalid Email");
    }
    if (!formdata.password.trim()) {
      return toast.error("Password is required");
    }
    if (formdata.password.trim().length < 6) {
      return toast.error(
        "Password length should be greater than 6 or equal to 6"
      );
    }

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      login(formdata);
    }
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 ">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary"></MessageSquare>
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign In into your account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label w-full">
                <span className="font-medium">Email:</span>
              </label>
              <label className="input w-full">
                <Mail className="size-5 text-base-content/40" />
                <input
                  type="email"
                  placeholder="xyz@gmail.com"
                  onChange={(e) =>
                    setFormData({ ...formdata, email: e.target.value })
                  }
                  value={formdata.email}
                  className="w-full"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label w-full">
                <span className="font-medium">Password:</span>
              </label>
              <label className="input w-full">
                <Lock className="size-5 text-base-content/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="......"
                  onChange={(e) =>
                    setFormData({ ...formdata, password: e.target.value })
                  }
                  value={formdata.password}
                  className="w-full"
                />
                <button
                  type="button"
                  className="pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="size-5 animate-spin"></Loader2>
                    ...Loading
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              You do not have account?{" "}
              <Link to="/signup" className="link link-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <AuthImagePattern
        title="Join Our Community"
        subtitle="Connect with friends,share moments"
      />
    </div>
  );
}

export default Login;
