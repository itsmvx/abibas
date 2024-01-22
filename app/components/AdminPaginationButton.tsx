'use client';
import { Swiper, SwiperSlide } from "swiper/react";

type PropsType = {
    showPerPage: number,
    dataLength: number
};
const AdminPaginationButton = ({ showPerPage, dataLength }: PropsType) => {
    return (
        <>
            <div className="w-60 h-10 flex items-center justify-center">
                <Swiper
                    spaceBetween={5}
                    slidesPerView={ showPerPage / dataLength > 3
                        ? 3
                        : dataLength
                    }
                >
                    <SwiperSlide>

                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
};

export default AdminPaginationButton;
