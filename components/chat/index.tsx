'use client';

import React from 'react';

import Welcome from '@/components/chat/welcome';
import Loader from '@/components/loader';
import { useSelectedChat } from '@/hooks/use-selected-chat';
import { cn } from '@/lib/utils';

import { ChatInput } from './chat-input';
import { Messages } from './messages';

export const Chat = () => {
  const { selectedChat, isLoading } = useSelectedChat();

  return (
    <div
      className={cn(
        'flex flex-col justify-between max-h-screen flex-1  bg-cover bg-bottom bg-no-repeat bg-[rgba(20,15,20,0.75)] backdrop-blur-[4px] bg-blend-overlay rounded-lg border px-5 pb-6',
        { 'bg-[url(/kaja.webp)]': selectedChat?.length },
      )}
    >
      {isLoading ? (
        <div className='flex justify-center items-center h-full'>
          <Loader />
        </div>
      ) : (
        <>
          {selectedChat?.length ? <Messages /> : <Welcome />}
          <ChatInput />
        </>
      )}
    </div>
  );
};
