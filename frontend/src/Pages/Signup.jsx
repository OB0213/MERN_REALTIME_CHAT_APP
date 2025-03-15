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
import { useAuthStore } from "../store1/useAuthStore";
import { Link } from "react-router-dom";
import AuthImagePattern from "../Components/AuthImagePattern";
import toast from "react-hot-toast";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signUp, isSigningUp } = useAuthStore();
  const validateForm = () => {
    if (!formdata.fullName.trim()) {
      return toast.error("Full Name is required");
    }
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
      signUp(formdata);
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
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get Started With Your Free Account
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label w-full">
                <span className="font-medium">Full Name:</span>
              </label>
              <label className="input w-full">
                <User className="size-5 text-base-content/40" />
                <input
                  type="text"
                  placeholder="John Doe"
                  onChange={(e) =>
                    setFormData({ ...formdata, fullName: e.target.value })
                  }
                  value={formdata.fullName}
                  className="w-full"
                />
              </label>
            </div>
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
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="size-5 animate-spin"></Loader2>
                    ...Loading
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an Account?{" "}
              <Link to="/login" className="link link-primary">
                Sign In
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

export default Signup;
