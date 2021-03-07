import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper } from "swiper/react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { useRef } from "react";
import styled from "styled-components";

// Import Swiper styles
import "swiper/swiper.min.css";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Container = styled.div`
    margin-bottom: 25px;
    padding-bottom: 25px;
    border-bottom: 3px double rgb(252, 178, 52, 0.4);
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.span`
    font-size: 1.5rem;
    font-weight: 800;
    font-size: 30px;
    color: black;
    padding: 5px;
    border-radius: 5px;
    margin-bottom: 1rem;
`;

const Setting = styled.div`
    display: flex;
`;

const ArrowLeft = styled(AiFillCaretLeft)`
    color: #fcb234;
    width: 2rem;
    height: 2rem;
`;

const ArrowRight = styled(AiFillCaretRight)`
    color: #fcb234;
    width: 2rem;
    height: 2rem;
`;

const PreButton = styled.div`
    background-color: none;
    width: 2rem;
    height: 2rem;
    padding: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 5;
    border: solid white 1px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #fcb234;
        ${ArrowLeft} {
            color: white;
        }
    }
`;

const NextButton = styled.div`
    background-color: none;
    width: 2rem;
    height: 2rem;
    padding: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 5;
    border: solid white 1px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #fcb234;
        ${ArrowRight} {
            color: white;
        }
    }
`;

const SwiperSection = ({ title, perView = 5, children, isSetting = false }) => {
    const preRef = useRef();
    const nextRef = useRef();
    const setting = useRef();

    return (
        <Container>
            <Header>
                <Title>{title}</Title>
                <Setting ref={setting}>
                    <PreButton ref={preRef}>
                        <ArrowLeft />
                    </PreButton>
                    <NextButton ref={nextRef}>
                        <ArrowRight />
                    </NextButton>
                </Setting>
            </Header>
            <Swiper
                spaceBetween={50}
                slidesPerView={perView}
                navigation={{
                    preEl: preRef.current ? preRef.current : undefined,
                    nextEl: nextRef.current ? nextRef.current : undefined,
                }}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => {
                    isSetting = swiper.slides.length > 5;
                    if (isSetting) {
                        swiper.navigation.update();
                    } else {
                        setting.current.remove();
                    }
                }}
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = preRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                }}
                autoplay={{ delay: 3000 }}
            >
                {children}
            </Swiper>
        </Container>
    );
};

export default SwiperSection;
