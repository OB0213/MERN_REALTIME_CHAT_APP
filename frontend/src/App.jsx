import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Settings from "./Pages/Settings";
import Profile from "./Pages/Profile";
import Navbar from "./Components/Navbar";
import { useAuthStore } from "./store/useAuthStore.js";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const [count, setCount] = useState(0);
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  console.log("Theme is:", theme);
  console.log(onlineUsers);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log(authUser);
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/"></Navigate>}
        ></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Login />}
        ></Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
