import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit'; // Nhập thư viện Chatbot từ React-chatbot-kit
import config from '../config/configChatBoot'; // Đúng đường dẫn đến tệp cấu hình
import MessageParser from '../chatboot/mess/MessageParser'; // Đúng đường dẫn đến tệp MessageParser
import ActionProvider from '../chatboot/acction/ActionProvider'; // Đúng đường dẫn đến tệp ActionProvider
const Chatboot = () => {
    const [showBot, toggleBot] = useState(false);

  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('chat_messages'));
    return messages;
  };
  return (
    <div className='chat-boot-content flex_center'>
     <div className='chat-main flex_center'>
     {showBot && (
        <div className='chat-boot-box'>
         <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageHistory={loadMessages()}
          messageParser={MessageParser}
          saveMessages={saveMessages}
          placeholderText='Nhập câu hỏi của bạn'
        />
        </div>
       
      )}
      <button className='btn-chatboot flex_center' onClick={() => toggleBot((prev) => !prev)}><i class="fa-brands fa-facebook-messenger"></i></button>
     </div>
    </div>
  );
};

export default Chatboot;
