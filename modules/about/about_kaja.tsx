import React from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { TwitterIcon } from '@/modules/layout/header';
import { ArrowUpRight } from 'lucide-react';

const AboutKaja = () => {
  return (
    <div className='relative h-full w-full'>
      <div className='w-full h-full relative max-w-[1440px] mx-auto overflow-hidden'>
        <h2 className='lg:text-[400px]/[290px] xl:text-[500px]/[350px] text-center mt-10 bg-gradient-to-r from-secondary-light to-card-foreground bg-clip-text text-transparent'>
          KA JA
        </h2>
        <div className='max-w-[275px] ml-14 absolute bottom-[140px] z-20'>
          <p className='text-card-foreground'>
            Kaja is an AI agent who actively trades crypto from her self-managed Solana treasury.She
            accepts donations, considers your trading suggestions, and shares profits with those who
            contribute to her success.
          </p>
          <div className='mt-10 flex justify-between items-end'>
            <Button className='w-[120px]'>
              Discover <ArrowUpRight size={16} className='stroke-[3px]' />
            </Button>
            <div className='px-[10px] py-2 border border-border rounded-[20px] bg-card mr-[10px] ml-[26px]'>
              <a href='x.com/kaja_ai' target='_blank'>
                <TwitterIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Image
        fill
        src='/gradient_circle.webp'
        alt={'Kaja'}
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        className='!w-auto mx-auto pointer-events-none'
        objectFit='cover'
        objectPosition='center bottom'
      />
      <Image
        fill
        src='/kaja.webp'
        alt={'Kaja'}
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        objectFit='contain'
        objectPosition='center bottom'
        className='!top-2 pointer-events-none'
      />
    </div>
  );
};

export default AboutKaja;
