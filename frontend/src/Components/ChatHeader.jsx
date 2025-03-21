import React, { useState } from "react";
import { useChatStore } from "../store1/useChatStore";
import { useAuthStore } from "../store1/useAuthStore";
import natureImage from "../assets/profileImg.jpg";
import { X } from "lucide-react";

function ChatHeader() {
  const { selectedUser, setSelectedUsers } = useChatStore();
  const { onlineUsers } = useAuthStore();
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="w-24 rounded-full relative">
              <img
                src={selectedUser.profilePic || natureImage}
                alt={selectedUser.fullName}
              ></img>
            </div>
          </div>

          {/* User Info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUsers(null)}>
          <X />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
