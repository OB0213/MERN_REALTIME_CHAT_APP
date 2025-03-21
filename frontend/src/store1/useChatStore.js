import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore"

export const useChatStore = create((set,get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isUMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage:async(messageData)=>{
        const {messages,selectedUser}=get();
        try{
            const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData);
            set({messages:[...messages,res.data]})
        }
        catch(err)
        {
            toast.error(err.response.data.message);
        }
  },
  setSelectedUsers:(selectedUser)=>{
    set({selectedUser});
  },
  subscribeToMessage:()=>{
    const {selectedUser}=get();
    if(!selectedUser) return;
    const socket=useAuthStore.getState().socket;
    socket.on("newMessage",(newMessage)=>{
        set({
            messages:[...get().messages,newMessage],
        });
    })
  },

  unSubscribeFromMessages:()=>{
    const socket=useAuthStore.getState().socket;
    socket.off("newMessage");
  }
}));