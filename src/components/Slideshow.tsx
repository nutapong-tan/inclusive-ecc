import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import slidesData from '../assets/data/slides.json';

import { Parallax, Navigation, Pagination, HashNavigation } from 'swiper/modules';
import { Button, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Slideshow: React.FC = () => {
  const [slides, setSlides] = useState<any[]>([]);

  useEffect(() => {
    setSlides(slidesData);
  }, []);

  return (
    <div className="slideshow-container">
      <Swiper
        speed={600}
        autoHeight={true}
        direction={'vertical'}
        hashNavigation={{
          watchState: true,
        }}
        modules={[Parallax, Pagination, Navigation, HashNavigation]}
        className="my-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} data-hash={slide.title} className="slide">
            <div className="slide-content">
              <img src={slide.image} alt={slide.title} className="slide-image" loading="lazy" />
              <div className='slide-group'>
                <Title level={3} className="slide-title">
                  {slide.title}
                </Title>
                <Paragraph className="slide-description">
                  {slide.description}
                </Paragraph>
                <Button type="primary">Learn More</Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slideshow;
