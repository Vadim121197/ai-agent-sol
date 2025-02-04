'use client';

import { useSelectedChat } from '@/hooks/use-selected-chat';
import { cn } from '@/lib/utils';
import { Challenges, Role } from '@/types/chat';
import { Calendar, UserRound } from 'lucide-react';
import moment from 'moment';

import { Skeleton } from '../ui/skeleton';
import { firstMessage } from './contants';

export const Messages = ({ type }: { type: Challenges }) => {
  const { selectedChat, isFetched } = useSelectedChat(type);

  return (
    <div className='flex flex-1 flex-col-reverse max-h-screen overflow-y-auto'>
      <div className='scrollbar-thumb-black scrollbar-thumb-rounded scrollbar-w-2 scrolling-touch flex flex-col-reverse overflow-y-auto'>
        {(selectedChat ?? []).map(i => (
          <div key={i.date} className='flex flex-col pb-4'>
            <div className='sticky top-0 my-4 flex justify-center'>
              <div className='flex items-center gap-1 rounded-sm bg-message px-4 py-1'>
                <Calendar className='size-4 text-muted-foreground' />
                <p className='text-base font-semibold text-muted-foreground'>{i.date}</p>
              </div>
            </div>
            <div className='flex flex-col gap-8'>
              {i.items.map((message, index) => {
                const isUser = message.role === Role.USER;

                return (
                  <div
                    key={index}
                    className={cn('flex w-full items-end', {
                      'justify-end': isUser,
                    })}
                  >
                    {/* TODO add border 0.5px */}
                    <div className='flex w-[90%] flex-col px-6 py-5 rounded-lg bg-message border border-message-border gap-3'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-1'>
                          <UserRound className='size-5 text-link-border' />
                          <p className='text-link-border text-base font-bold'>
                            {isUser ? 'You' : 'Chat'}
                          </p>
                        </div>
                        {'isPending' in message ? (
                          <Skeleton className='h-4 w-20' />
                        ) : (
                          <p className='text-sm font-semibold text-muted-foreground'>
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
                        <p className='text-base font-medium break-words'>{message.content}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {isFetched && (
          <div className={cn('flex w-full items-end', { 'pb-4': !selectedChat?.length })}>
            {/* TODO add border 0.5px */}
            <div className='flex w-[90%] flex-col px-6 py-5 rounded-lg bg-message border border-message-border gap-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                  <UserRound className='size-5 text-link-border' />
                  <p className='text-link-border text-base font-bold'>Chat</p>
                </div>
              </div>
              <p className='text-base font-medium break-words'>{firstMessage[type]}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
