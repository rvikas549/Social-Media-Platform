// ChatBox.jsx
import React, { useEffect, useState, useContext } from 'react';
import './ChatBox.css';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useAuth } from "../../context/AuthContext.jsx";

const ChatBox = ({ selectedFriend }) => {
  const { currentUser } = useAuth();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  // 1. Initialize socket connection
  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  // 2. Join user's room
  useEffect(() => {
    if (socket && currentUser?.uid) {
      socket.emit('join', currentUser.uid);
    }
  }, [socket, currentUser]);

  // 3. Listen for incoming messages
  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (msg) => {
        console.log('📥 Received:', msg);
        setMessages((prev) => [...prev, {
          ...msg,
          from: msg.from === currentUser.uid ? 'me' : msg.from
        }]);
      });
    }

    return () => socket?.off('receiveMessage');
  }, [socket, currentUser]);

  // 4. Fetch chat history when friend is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedFriend?.uid && currentUser?.uid) {
        try {
          const res = await axios.get(`http://localhost:5000/api/messages/${currentUser.uid}/${selectedFriend.uid}`);
          const formatted = res.data.map(msg => ({
            ...msg,
            from: msg.from === currentUser.uid ? 'me' : msg.from
          }));
          setMessages(formatted);
        } catch (err) {
          console.error("❌ Error fetching messages", err);
        }
      }
    };

    fetchMessages();
  }, [selectedFriend, currentUser]);

  // 5. Send message
  const handleSend = () => {
    if (!input.trim() || !selectedFriend) return;

    const message = {
      from: currentUser.uid,
      to: selectedFriend.uid,
      text: input.trim()
    };

    // Emit to server
    socket.emit('sendMessage', message);

    // Local update
    setMessages((prev) => [...prev, { ...message, from: 'me' }]);

    // Clear input
    setInput('');
  };

  return (
    <div className="chat-box">
      <div className="chat-header">
        <span>{selectedFriend?.username || 'Select a friend'}</span>
        <i className="info-icon">i</i>
      </div>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-msg ${msg.from === 'me' ? 'sent' : 'received'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      {selectedFriend && (
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>➤</button>
        </div>
      )}
    </div>
  );
};

export default ChatBox;

// import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';
// import './ChatBox.css';
// import { useAuth } from "../../context/AuthContext.jsx";
// const socket = io("http://localhost:5000");

// const ChatBox = ({ selectedFriend, messages, setMessages }) => {
//   const [input, setInput] = useState('');
//   const { currentUser } = useAuth();
//   const bottomRef = useRef(null);

//   useEffect(() => {
//     if (currentUser?.uid) {
//       socket.emit('join', currentUser.uid);
//     }
//   }, [currentUser]);

//   useEffect(() => {
//     socket.on('receiveMessage', (message) => {
//       setMessages((prev) => [...prev, { ...message, from: 'them' }]);
//     });

//     return () => {
//       socket.off('receiveMessage');
//     };
//   }, []);

//   const handleSend = () => {
//     if (!input.trim() || !selectedFriend) return;

//     const msg = {
//       from: currentUser.uid,
//       to: selectedFriend.uid,
//       text: input,
//     };

//     // Send to socket server
//     socket.emit('sendMessage', msg);

//     // Optimistic UI
//     setMessages((prev) => [...prev, { ...msg, from: 'me' }]);
//     setInput('');
//   };
  
//   useEffect(() => {
//   const fetchMessages = async () => {
//     if (currentUser?.uid && selectedFriend?.uid) {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/messages/${currentUser.uid}/${selectedFriend.uid}`
//         );
//         setMessages(res.data); // load into ChatBox
//       } catch (err) {
//         console.error('Error fetching chat history:', err);
//       }
//     }
//   };

//   fetchMessages();
// }, [selectedFriend]);


//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   return (
//     <div className="chat-box">
//       <div className="chat-header">
//         <span>{selectedFriend?.username || "Select a friend"}</span>
//         <i className="info-icon">i</i>
//       </div>

//       <div className="chat-messages">
//         {messages.map((msg, idx) => (
//           <div key={idx} className={`chat-msg ${msg.from === 'me' ? 'sent' : 'received'}`}>
//             {msg.text}
//           </div>
//         ))}
//         <div ref={bottomRef}></div>
//       </div>

//       <div className="chat-input">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//         />
//         <button onClick={handleSend}>➤</button>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;











// // ChatBox.jsx
// import React, { useState } from 'react';
// import './ChatBox.css';

// const ChatBox = ({ selectedFriend, messages, onSendMessage }) => {
//   const [input, setInput] = useState('');

//   const handleSend = () => {
//     if (input.trim()) {
//       onSendMessage(input);
//       setInput('');
//     }
//   };

//   return (
//     <div className="chat-box">
//       <div className="chat-header">
//         <span>{selectedFriend?.username || "Select a friend"}</span>
//         <i className="info-icon">i</i>
//       </div>
//       <div className="chat-messages">
//         {messages.map((msg, idx) => (
//           <div key={idx} className={`chat-msg ${msg.from === 'me' ? 'sent' : 'received'}`}>
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <div className="chat-input">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//         />
//         <button onClick={handleSend}>➤</button>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;
