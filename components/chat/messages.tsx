'use client';

import Image from 'next/image';

import { useSelectedChat } from '@/hooks/use-selected-chat';
import { cn } from '@/lib/utils';
import { Role } from '@/types/chat';
import { Calendar } from 'lucide-react';
import moment from 'moment';

import { Skeleton } from '../ui/skeleton';
import { Message } from './message';

export const Messages = () => {
  const { selectedChat, isFetched } = useSelectedChat();

  return (
    <div className='flex flex-1 flex-col-reverse max-h-screen overflow-y-auto'>
      <div className='scrollbar-thumb-black scrollbar-thumb-rounded scrollbar-w-2 scrolling-touch flex flex-col-reverse overflow-y-auto'>
        {(selectedChat ?? []).map(i => (
          <div key={i.date} className='flex flex-col pb-4'>
            <div className='sticky top-4 my-4 flex justify-center z-10'>
              <div className='flex items-center gap-1 border border-border rounded-sm bg-icon-bg px-4 py-1'>
                <Calendar className='size-4 text-[#A8A1A7]' />
                <p className='text-base font-medium text-[#A8A1A7]'>{i.date}</p>
              </div>
            </div>
            <div className='flex flex-col gap-8'>
              {i.items.map((message, index, arr) => {
                const isUser = message.role === Role.USER;

                return (
                  <div
                    key={index}
                    className={cn('flex w-full items-end', {
                      'justify-end': isUser,
                    })}
                  >
                    {/* TODO add border 0.5px */}
                    <div className='flex w-[75%] flex-col px-6 py-5 rounded-lg bg-[rgba(20,15,20,0.65)] border border-border gap-3 backdrop-blur-sm'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-1'>
                          <Image
                            src={isUser ? '/user.png' : '/kaja_avatar.png'}
                            width={18}
                            height={18}
                            alt='icon'
                            className='rounded-full border border-border'
                          />

                          <p className='text-primary text-sm font-medium'>
                            {isUser ? 'You' : 'Kaja Agent'}
                          </p>
                        </div>
                        {'isPending' in message ? (
                          <Skeleton className='h-4 w-20' />
                        ) : (
                          <p className='text-sm font-medium text-card-foreground'>
                            {moment(message.timestamp).format('HH:mm')}
                          </p>
                        )}
                      </div>
                      {'isPending' in message ? (
                        <div className='space-y-2'>
                          <Skeleton className='h-4 w-[250px]' />
                          <Skeleton className='h-4 w-[200px]' />
                          <Skeleton className='h-4 w-[250px]' />
                        </div>
                      ) : (
                        <Message message={message} prevMassage={arr[index - 1]?.content ?? ''} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {isFetched && (
          <div className={cn('flex w-full items-end mt-6', { 'pb-4': !selectedChat?.length })}>
            {/* TODO add border 0.5px */}
            <div className='flex w-[75%] flex-col px-6 py-5 rounded-lg bg-[rgba(20,15,20,0.65)] border border-border gap-3 backdrop-blur-sm'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                  <Image
                    src='/kaja_avatar.png'
                    width={18}
                    height={18}
                    alt='icon'
                    className='rounded-full border border-border'
                  />
                  <p className='text-primary text-sm font-medium'>Kaja Agent</p>
                </div>
              </div>
              <p className='text-base font-medium text-card-foreground break-words'>
                First message
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
