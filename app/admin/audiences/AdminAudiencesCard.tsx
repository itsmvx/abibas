'use client';
import Image from "next/image";
import { AllImages } from "@/lib/StaticImagesLib";
import AdminCardAddButton from "@/app/components/AdminCardAddButton";

type AudienceDataType = {
    _count: {
        products: number
    }
} & AudiencesModelType
const AdminAudiencesCard = ({ audiencesData, webKey }: { audiencesData: AudienceDataType[], webKey: { key: string | null, iv: string | null } }) => {
    return (
        <>
            <section className="w-full min-h-96 flex flex-col sm:flex-row flex-wrap items-center justify-evenly gap-x-3 md:gap-x-5 lg:gap-x-6 gap-y-12 sm:gap-y-11 md:gap-y-10 bg-white py-10 px-5">
                <div className="relative w-80 sm:w-72 md:w-80 lg:w-[30%] lg:min-w-72 h-auto aspect-[4/3] overflow-hidden border-2 border-black/50 border-dashed rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.2)] shadow-neutral-400 transition-all duration-200 ease-in-out animate-fade-right animate-ease-in-out animate-once animate-duration-[400ms]">
                    <AdminCardAddButton webKey={webKey}/>
                </div>
                {
                    audiencesData.map ((audience: AudienceDataType, index: number) => (
                        <div key={index} className={`relative w-80 sm:w-72 md:w-80 lg:w-[30%] lg:min-w-72 h-auto aspect-[4/3] overflow-hidden rounded-md scale-100 hover:scale-105 shadow-[0_2px_8px_rgba(0,0,0,0.2)] shadow-neutral-700 transition-all duration-200 ease-in-out ${index === 0 ? 'animate-fade-down' : 'animate-fade-up'} animate-fade-up animate-once animate-ease-in-out animate-duration-[400ms]`}>
                            <div className="absolute z-10 group/details peer w-[4.5rem] sm:w-16 md:w-20 h-6 top-0 left-[39.5%] md:left-[37.5%] lg:left-[36.5%] bg-neutral-900 hover:w-full hover:h-full hover:left-0 hover:bg-opacity-70 flex items-center hover:items-start justify-center transition-all duration-150 ease-in-out">
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <iconify-icon
                                        icon="line-md:chevron-down" width={30}
                                        class="text-white text-center opacity-100 group-hover/details:opacity-0 transition-all duration-100 ease-in-out"
                                    />
                                    <div
                                        className="absolute left-1/2 -translate-x-1/2 text-white w-full h-full p-7 opacity-0 select-none group-hover/details:opacity-100 flex flex-col gap-y-4 transition-all delay-0 group-hover/details:delay-150 duration-150 group-hover/details:duration-200">
                                        <h1 className="invisible group-hover/details:visible text-center font-semibold text-lg capitalize tracking-wider"> {audience.name.toLowerCase ()} </h1>
                                        <p className="invisible group-hover/details:visible font-sans font-medium text-sm tracking-wide">
                                            Total Products
                                            <span className="mx-1.5">:</span>
                                            {audience._count.products}
                                        </p>
                                        <p></p>
                                    </div>
                                </div>

                            </div>
                            <div className="absolute w-16 h-7 top-0 -translate-y-0.5 left-[45%] -translate-x-1/2 bg-neutral-900 peer-hover:bg-opacity-0 text-white flex items-center justify-center skew-x-[20deg] rounded-md transition-all duration-100">
                            </div>
                            <div className="absolute w-16 h-7 top-0 -translate-y-0.5 left-[55%] -translate-x-1/2 bg-neutral-900 peer-hover:bg-opacity-0 text-white flex items-center justify-center -skew-x-[20deg] rounded-md transition-all duration-100">
                            </div>

                            <Image
                                src={AllImages[index === 0 ? index : index + 5]}
                                width={300}
                                alt="org"
                                quality={100}
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                    ))
                }
            </section>
        </>
    );
};

export default AdminAudiencesCard;
