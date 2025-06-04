import React, { useState } from 'react';
import FriendChatList from '../../components/FriendChatList/FriendChatList.jsx'
import ChatBox from '../../components/ChatBox/ChatBox.jsx';
import Nav from '../../components/Nav/Nav.jsx';
import './Chat.css';

const ChatPage = () => {
  const [friends] = useState([
    { id: 1, username: 'Buddy' },
    { id: 2, username: 'Max' },
    { id: 3, username: 'Charlie' },
  ]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    setMessages([...messages, { text, from: 'me' }]);
  };

  return (
    <div className="message-page">
      <Nav />
      <FriendChatList friends={friends} onSelectFriend={setSelectedFriend} />
      <ChatBox selectedFriend={selectedFriend} messages={messages} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;
