import { BorderWrapper } from '@/components/border-wrapper';
import { Challenges } from '@/types/chat';

import { ChatInput } from './chat-input';
import { Messages } from './messages';

export const Chat = ({ type }: { type: Challenges }) => {
  return (
    <BorderWrapper className='w-[430px] pt-5 pb-4 px-5 flex flex-col justify-between max-h-screen'>
      <Messages type={type} />
      <ChatInput type={type} />
    </BorderWrapper>
  );
};
