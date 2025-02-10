import { AuxData, Message as IMessage, SystemMessage } from '@/types/chat';

import { MessageAction } from './message-action';

interface MessageProps {
  message: IMessage;
  prevMassage: string;
}

export const Message = ({ message, prevMassage }: MessageProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <p className='text-base font-medium text-card-foreground break-words'>{message.content}</p>

      {(message as SystemMessage).aux_data && (
        <MessageAction
          pool={(message as SystemMessage).aux_data as unknown as AuxData}
          prevMassage={prevMassage}
        />
      )}
    </div>
  );
};
