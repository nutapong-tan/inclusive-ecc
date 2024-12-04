import { FC } from "react";
import { Button, Flex, Typography } from "antd";
import { ISlide } from "../models/slide";

interface SlideProps {
    slide: ISlide;
    active: number;
    total: number;
    goto: (slideIndex: number) => void;
    onPrev: () => void;
    onNext: () => void;
}

const { Title, Paragraph } = Typography;
const CustomSlide: FC<SlideProps> = ({ slide, active, total, onPrev, onNext }) => {

    return (
        <div className={`slide-container content-${slide.key}`}>
            <img className="slide-image" src={slide.image} alt={slide.title} loading="lazy" />
            <div className="slide-form">
                <Title level={3} className="slide-title">
                    {slide.title}
                </Title>
                <Paragraph className="slide-description">{slide.description}</Paragraph>
                <Flex justify="space-between" align="center">
                    {active !== 0 && (<Button type="primary" onClick={onPrev}>Back</Button>)}
                    {active + 1 !== total && (<Button type="primary" onClick={onNext}>Next</Button>)}
                </Flex>
            </div>
        </div>
    );
};

export default CustomSlide