import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store/store.ts';
import "./style.css"
import { ChatProvider } from './entities/chat/model/chatContext.tsx';

createRoot(document.getElementById('root')!).render(
  
    <Provider store={store}>
      <ChatProvider>
      <App />
      </ChatProvider>
    </Provider>
  
);
