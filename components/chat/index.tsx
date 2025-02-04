import { BorderWrapper } from '@/components/border-wrapper';

import { ChatInput } from './chat-input';
import { Messages } from './messages';

export const Chat = () => {
  return (
    <BorderWrapper className='w-[430px] pt-5 pb-4 px-5 flex flex-col justify-between max-h-screen'>
      <Messages />
      <ChatInput />
    </BorderWrapper>
  );
};
