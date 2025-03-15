import React, { useEffect } from 'react'
import { useChatStore } from '../Store/useChatStore';
import ChatHeader from './ChatHeader';
import MessagesInput from './MessagesInput';
import MessageSkeleton from './MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import natureImage from '../assets/profileImg.jpg';
import { formatMessageTime } from '../lib/utils';

function ChatContainer() {
   const {
     messages,
     getMessages,
     isMessagesLoading,
     selectedUser,
     subscribeToMessage,
     unSubscribeFromMessages,
   } = useChatStore();
   const {authUser}=useAuthStore();
   useEffect(()=>{
    getMessages(selectedUser._id);
    subscribeToMessage();
    return ()=>{
            unSubscribeFromMessages();
    }
   },[selectedUser._id,getMessages,subscribeToMessage,unSubscribeFromMessages]);
   console.log(messages);
   if(isMessagesLoading)
   {
    return (
<div className='flex-1 flex flex-col overflow-auto'>
    <MessageSkeleton />
  
    <MessagesInput />
</div>
)
   }
  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((elements) => (
          <div
            key={elements._id}
            className={`chat ${
              elements.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    elements.senderId === authUser._id
                      ? authUser.profilePic || natureImage
                      : selectedUser.profilePic || natureImage
                  }
                  alt="profile-pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(elements.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {elements.image && (
                <img
                  src={elements.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {elements.text && <p>{elements.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessagesInput />
    </div>
  );
}

export default ChatContainer
