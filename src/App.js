import { ChatContextProvider } from './context/chatContext';
import SideBar from './components/SideBar';
import ChatView from './components/ChatView';
import { useEffect, useState } from 'react';
import Modal from './components/Modal';
import Setting from './components/Setting';

// const setKey = await window.localStorage.setItem('api-key', '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');

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  let conversation = [
      {
        role: 'system',
        content:
          "you're an a AI assistant that replies to all my questions in markdown format.",
      },
      { role: 'user', content: 'hi' },
      { role: 'assistant', content: 'Hi! How can I help you?' },
  ];
  window.localStorage.setItem('api-key','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');
  window.localStorage.setItem('conversation',JSON.stringify(conversation));
  // useEffect(() => {
  //   const apiKey = window.localStorage.getItem('api-key');
  //   if (!apiKey) {
  //     setModalOpen(true);
  //   }
  // }, []);
  return (
    <ChatContextProvider>
      {/* <Modal title='Setting' modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </Modal> */}
      <div className='flex transition duration-500 ease-in-out'>
        <SideBar />
        <ChatView />
      </div>
    </ChatContextProvider>
  );
};

export default App;
