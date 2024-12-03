import { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Parallax, Navigation, Pagination, HashNavigation } from 'swiper/modules';

import slidesData from '../assets/data/slides.json';
import { ISlide } from '../models/slide';
import CustomSlide from './CustomSlide';

const Slideshow: FC = () => {
  const [slides, setSlides] = useState<ISlide[]>([]);

  useEffect(() => {
    setSlides(slidesData);
  }, []);

  return (
    <div className="slideshow-container">
      <Swiper
        speed={600}
        autoHeight
        direction="vertical"
        hashNavigation={{ watchState: true }}
        modules={[Parallax, Pagination, Navigation, HashNavigation]}
        className="my-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} data-hash={slide.title} className="slide">
            <CustomSlide slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slideshow;
