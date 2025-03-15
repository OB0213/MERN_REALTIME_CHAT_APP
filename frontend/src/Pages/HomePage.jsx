import React from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../Components/Sidebar";
import NoChatSelected from "../Components/NoChatSelected";
import ChatContainer from "../Components/ChatContainer";

function HomePage() {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-current w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex rounded-lg h-full overflow-hidden">
            <Sidebar />
            {!selectedUser ? (
              <NoChatSelected />
            ) : (
              <ChatContainer></ChatContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
