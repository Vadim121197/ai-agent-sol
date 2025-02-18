'use client';

import { ChangeEvent, useRef, useState } from 'react';

import { Textarea } from '@/components/ui/textarea';
import { useSendMessage } from '@/hooks/use-send-message';
import { cn } from '@/lib/utils';

import { SendIcon } from './send-icon';

export const ChatInput = () => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const { setMessage, sendMessage, message, isPending } = useSendMessage();

  const [focus, setFocus] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    setMessage(target.value);
  };
  const disabled = !message.trim() || isPending;

  return (
    <label
      // TODO change border to 0.5px
      className='flex cursor-text rounded-sm border p-4 pr-3 items-center bg-[rgba(15,12,15,0.65)] gap-3 backdrop-blur-[5px] duration-[2000ms]'
      tabIndex={-1}
      htmlFor={'textarea'}
    >
      <Textarea
        id={'textarea'}
        value={message}
        placeholder='Type your message '
        className={cn('border-none bg-transparent outline-none py-0 resize-none transition-all ')}
        minRows={1}
        maxRows={9}
        onKeyDown={e => {
          if (disabled) {
            return;
          }
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
        ref={textAreaRef}
        onChange={handleChange}
        onInput={handleChange}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
      />
      <button
        onClick={e => {
          e.preventDefault();
          sendMessage();
        }}
        disabled={disabled}
        className={cn(
          'flex h-8 bg-[#EB11D1] items-center justify-center rounded-sm px-2 disabled:opacity-40',
          focus && message && '',
        )}
      >
        <SendIcon />
      </button>
    </label>
  );
};
