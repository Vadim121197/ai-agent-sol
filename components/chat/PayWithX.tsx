import { signIn, useSession } from 'next-auth/react';

import { useToast } from '@/hooks/use-toast';
import { paymentApi } from '@/lib/api/payment';
import { useMutation } from '@tanstack/react-query';

import { Button } from '../ui/button';

export const PayWithX = () => {
  const { toast } = useToast();
  const { data } = useSession();

  const { mutate, isPending } = useMutation({
    mutationFn: paymentApi.payWithX,
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
    },
  });

  return (
    <Button
      className='flex items-center gap-[10px] min-w-[82px] max-w-[240px]'
      variant='secondary'
      disabled={isPending}
      onClick={() => {
        void (async () => {
          if (!data) {
            await signIn('twitter');
            return;
          }

          mutate({ message: 'test tweet 212' });
        })();
      }}
    >
      <p className='text-sm font-semibold'>{data ? 'Post to X' : 'Auth'}</p>
    </Button>
  );
};
