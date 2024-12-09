import { FC } from "react";
import { Button, Flex, Form, Input, Typography } from "antd";
import { ISlide } from "../models/slide";
import TextArea from "antd/es/input/TextArea";

interface SlideProps {
    slide: ISlide;
    active: number;
    total: number;
    formData: Record<number, any>;
    goto: (slideIndex: number) => void;
    shareForm: () => void;
    updateForm: (slideIndex: number, data: any) => void;
}

const { Title, Paragraph } = Typography;
const CustomSlide: FC<SlideProps> = ({ slide, active, total, formData, goto, updateForm, shareForm }) => {
    const handleInputChange = (key: string, value: string) => {
        updateForm(active, { ...formData[active], [key]: value });
    };

    return (
        <div className={`slide-container content-${slide.key}`}>
            <img className="slide-image" src={slide.image} alt={slide.title} loading="lazy" />
            <div className="slide-form">
                <Title level={3} className="slide-title">
                    {slide.title}
                </Title>
                <Paragraph className="slide-description">{slide.description}</Paragraph>
                <Form layout="vertical">
                    <Form.Item label="Your Channel">
                        <Input
                            value={formData[active]?.channel || ""}
                            onChange={(e) => handleInputChange("channel", e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Your Comment">
                        <TextArea
                            rows={4}
                            value={formData[active]?.comment || ""}
                            onChange={(e) => handleInputChange("comment", e.target.value)}
                        />
                    </Form.Item>
                </Form>
                <Flex vertical gap={"8px"}>
                    <Flex justify="center" align="center">
                        <Button className="facebook-btn" onClick={shareForm}>
                            Share on Facebook
                        </Button>
                    </Flex>
                    <Flex justify="space-between" align="center">
                        <Button type="primary" onClick={() => goto(active - 1)} disabled={active === 0}>Back</Button>
                        <Button type="primary" onClick={() => goto(active + 1)} disabled={active + 1 === total}>Next</Button>
                    </Flex>
                </Flex>
            </div>
        </div>
    );
};

export default CustomSlide