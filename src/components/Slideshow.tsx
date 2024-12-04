import { FC, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Parallax, Navigation, Pagination, HashNavigation } from 'swiper/modules';

import slidesData from '../assets/data/slides.json';
import { ISlide } from '../models/slide';
import CustomSlide from './CustomSlide';

const Slideshow: FC = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [slides, setSlides] = useState<ISlide[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    setSlides(slidesData);
  }, []);

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveIndex(swiper.activeIndex);
    console.log('Current slide index:', swiper.activeIndex);
  };

  const goToSlide = (slideIndex: number) => {
    if (swiperRef.current) swiperRef.current?.slideTo(slideIndex);
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const handleBack = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  return (
    <div className="slideshow-container">
      <Swiper
        onInit={(swiper: SwiperClass) => swiperRef.current = swiper}
        speed={600}
        autoHeight
        direction="vertical"
        hashNavigation={{ watchState: true }}
        onSlideChange={handleSlideChange}
        modules={[Parallax, Pagination, Navigation, HashNavigation]}
        className="my-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} data-hash={slide.title} className="slide">
            <CustomSlide 
              slide={slide}
              active={activeIndex}
              total={slides.length}
              goto={goToSlide}
              onPrev={handleBack}
              onNext={handleNext} 
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slideshow;
