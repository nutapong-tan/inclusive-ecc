import { FC } from 'react';
import Slideshow from './components/SlideShows';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './styles/main.scss';

const App: FC = () => {
  return <Slideshow />;
};

export default App;
