'use client';

import { ChangeEvent, useRef, useState } from 'react';

import { Textarea } from '@/components/ui/textarea';
import { useSendMessage } from '@/hooks/use-send-message';
import { cn } from '@/lib/utils';

import { SendIcon } from './send-icon';

const initialHeight = 56;

export const ChatInput = () => {
  const [textareaHeight, setTextareaHeight] = useState<number>(initialHeight);

  const address: string | undefined = '';

  const balance: { value: bigint } | null = {
    value: BigInt(0),
  };

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const { setMessage, sendMessage, message, messagePrice, isPending } = useSendMessage();

  const [focus, setFocus] = useState<boolean>(false);

  const sufficientBalance =
    messagePrice && balance.value && address ? messagePrice >= balance.value : true;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    setMessage(target.value);
    target.style.height = `${initialHeight}px`;
    const newHeight = Math.min(target.scrollHeight, 200);
    target.style.height = `${newHeight}px`;
    setTextareaHeight(newHeight);
  };

  return (
    <div
      // TODO change border to 0.5px
      className='flex cursor-text rounded-sm  border border-border pr-3 items-center bg-[rgba(15,12,15,0.65)] gap-3 backdrop-blur-[5px]'
      tabIndex={-1}
      onFocus={() => {
        setFocus(true);
        textAreaRef.current?.focus();
      }}
      onBlur={() => setFocus(false)}
    >
      <Textarea
        value={message}
        style={{
          height: `${textareaHeight}px`,
        }}
        className={cn(
          'border-none bg-transparent outline-none py-0 resize-none transition-all duration-[2000ms] h-14 min-h-14 max-h-[200px]',
          textareaHeight > initialHeight ? 'leading-normal' : 'leading-[56px]',
        )}
        onKeyDown={e => {
          if (isPending) {
            return;
          }
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
            setTextareaHeight(initialHeight);
          }
        }}
        ref={textAreaRef}
        onChange={handleChange}
        onInput={handleChange}
      />
      <button
        onClick={e => {
          e.preventDefault();
          sendMessage();
          setTextareaHeight(initialHeight);
        }}
        disabled={!message || sufficientBalance || isPending}
        className={cn(
          'flex h-8 bg-[#EB11D1] items-center justify-center rounded-sm px-2 disabled:opacity-40',
          focus && message && '',
        )}
      >
        <SendIcon />
      </button>
    </div>
  );
};
