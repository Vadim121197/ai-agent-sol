'use client';

import { useEffect, useState } from 'react';

import {
  CarouselApi,
  CarouselContent,
  CarouselItem,
  Carousel as CarouselWrapper,
} from '@/components/ui/carousel';
import AboutKaja from '@/modules/about/about_kaja';

export default function Carousel() {
  const slides = [AboutKaja, AboutKaja];
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateCarouselState = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
      setTotalItems(carouselApi.scrollSnapList().length);
    };

    updateCarouselState();

    carouselApi.on('select', updateCarouselState);

    return () => {
      carouselApi.off('select', updateCarouselState); // Clean up on unmount
    };
  }, [carouselApi]);

  const scrollToIndex = (index: number) => {
    carouselApi?.scrollTo(index);
  };

  return (
    <div className='flex-1'>
      <CarouselWrapper setApi={setCarouselApi} opts={{ loop: true }} className='w-full h-full z-10'>
        <CarouselContent className='h-full'>
          {slides.map((Slide, index) => (
            <CarouselItem key={index} className='w-full h-full'>
              <Slide />
            </CarouselItem>
          ))}
        </CarouselContent>
      </CarouselWrapper>

      <div className='absolute bottom-[140px] right-[50px] flex justify-center space-x-2 z-20'>
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-foreground' : 'bg-secondary-light'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
