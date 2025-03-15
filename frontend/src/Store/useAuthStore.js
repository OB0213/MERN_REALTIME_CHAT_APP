import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from 'socket.io-client'

const BASE_URL = "http://localhost:5001/";
export const useAuthStore = create((set,get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers:[],
  socket:null,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (err) {
      console.log("Error is:", err);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account Created Successfully");
      get().connectSocket();
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged Out Successfully");
      get().disconnectSocket();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("User Logged In successfully");
      get().connectSocket();
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/updateProfile", data);
      set({ authUser: res.data });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket:()=>{
    const {authUser}=get();
    if(!authUser||get().socket?.connected)
    {
        return;
    }
    const socket=io(BASE_URL,{
        query:{
            userId:authUser._id,
        }
    });
    socket.connect();
    set({socket:socket});

    socket.on("getOnlineUsers",(userIds)=>{
        set({onlineUsers:userIds});
    })

  },
  disconnectSocket:()=>{
    if(get().socket?.connected)
    {
        get().socket.disconnect();
    }

  }
}));
