import React from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { BookText, FileText } from 'lucide-react';

const Welcome = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full w-full'>
      <div className='w-[120px] h-[120px] relative border rounded-full overflow-hidden mb-6'>
        <Image
          fill
          src='/kaja.webp'
          alt={'Kaja'}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          objectFit='cover'
          className='!top-2'
        />
      </div>
      <h2 className='text-3xl flex gap-2'>
        Hello <Image src='/kiss_mark.svg' alt='kiss mark' width={20} height={20} />
      </h2>
      <p className='text-xl mt-2'>Nice to see you! How can I assist?</p>
      <div className='flex gap-6 mt-8'>
        <Button variant={'outline'} className={'w-[130px]'}>
          <FileText />
          Shill Example
        </Button>
        <Button variant={'outline'} className={'w-[130px]'}>
          <BookText /> Guide
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
