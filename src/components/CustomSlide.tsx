import { FC } from "react";
import { Button, Typography } from "antd";
import { ISlide } from "../models/slide";

interface SlideProps {
    slide: ISlide;
}  

const { Title, Paragraph } = Typography;
const CustomSlide: FC<SlideProps> = ({ slide }) => {

    return (
        <div className={`slide-container content-${slide.key}`}>
            <img className="slide-image" src={slide.image} alt={slide.title} loading="lazy" />
            <div className="slide-form">
                <Title level={3} className="slide-title">
                    {slide.title}
                </Title>
                <Paragraph className="slide-description">{slide.description}</Paragraph>
                <Button type="primary">Learn More</Button>
            </div>
        </div>
    );
};

export default CustomSlide