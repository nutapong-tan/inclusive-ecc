import { FC, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Parallax, Navigation, Pagination, HashNavigation } from 'swiper/modules';

import slidesData from '../assets/data/slides.json';
import { ISlide } from '../models/slide';
import CustomSlide from './CustomSlide';
import { Button, Flex, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { FacebookShareButton } from 'react-share';

interface ModalState {
  isVisible: boolean;
  channel?: string;
  data?: string;
}

const Slideshow: FC = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [slides, setSlides] = useState<ISlide[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [formData, setFormData] = useState<Record<number, any>>({});
  const [modalState, setModalState] = useState<ModalState>({ isVisible: false });

  useEffect(() => {
    setSlides(slidesData);
  }, []);

  const updateFormData = (slideIndex: number, data: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [slideIndex]: data,
    }));
  };

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveIndex(swiper.activeIndex);
    console.log('Current slide index:', swiper.activeIndex);
  };

  const goToSlide = (slideIndex: number) => {
    if (swiperRef.current) swiperRef.current?.slideTo(slideIndex);
  };

  const openShareModal = () => {
    const slideData = formData[activeIndex] || {};
    setModalState({ isVisible: true, channel: slideData.channel, data: slideData.comment });
  };

  const closeShareModal = () => {
    setModalState({ isVisible: false });
  };

  return (
    <div className="slideshow-container">
      <Swiper
        onInit={(swiper: SwiperClass) => swiperRef.current = swiper}
        speed={600}
        autoHeight
        direction="vertical"
        allowTouchMove={false}
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
              formData={formData}
              updateForm={updateFormData}
              shareForm={openShareModal}
              goto={goToSlide}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Modal
        title="Confirm Share Post"
        open={modalState.isVisible}
        onCancel={closeShareModal}
        footer={() => {
          return (
            <Flex align='center' justify='flex-end' gap={'4px'}>
              <Button key="cancel" onClick={closeShareModal}>
                Cancel
              </Button>,
              <FacebookShareButton
                key="share"
                url={`https://www.youtube.com/@${modalState.channel}`}
                hashtag={modalState.data}
                onClick={closeShareModal}
              >
                <Button key="submit" type="primary" >
                  Share
                </Button>
              </FacebookShareButton>
            </Flex>
          )
        }}
      >
        <div>
          <p>Preview and edit your post below:</p>
          <TextArea
            rows={6}
            value={modalState.data}
            onChange={(e) =>
              setModalState((prevState) => ({
                ...prevState,
                data: e.target.value,
              }))
            }
          />
        </div>
      </Modal>
    </div>
  );
};

export default Slideshow;
