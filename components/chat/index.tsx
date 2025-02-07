import { ChatInput } from './chat-input';
import { Messages } from './messages';

export const Chat = () => {
  return (
    <div className='flex flex-col justify-between max-h-screen flex-1 bg-[url(/kaja.webp)] bg-cover bg-bottom bg-no-repeat bg-[rgba(20,15,20,0.75)] backdrop-blur-[4px] bg-blend-overlay rounded-lg border px-5 pb-6'>
      <Messages />
      <ChatInput />
    </div>
  );
};
