import { memo } from "react";
import Image from "next/image";
import { DualRingLoading } from "@/lib/StaticImagesLib";
const GenresImagesPreview = ({ imagesPreview }: { imagesPreview: { count: number, data: string[], name: string[] }}) => {
    return (
        <>
            {
                Array.from({ length: imagesPreview.count }).map((_, index: number) => ((
                    <div key={index} className={`w-80 aspect-[4/3] flex items-center justify-center animate-background animate-duration-[6s] bg-gradient-to-r from-indigo-800 via-amber-400 to-violet-700 bg-[length:500%_500%] p-1.5 overflow-hidden rounded-md`}>
                        <div className="w-full h-full flex items-center justify-center bg-white overflow-hidden">
                            <Image
                                key={index}
                                // src={URL.createObjectURL(image)}
                                src={ imagesPreview.data[index] ?? DualRingLoading }
                                alt={ imagesPreview.name[index] ?? '' }
                                className="object-center object-cover"
                                width={ imagesPreview.data[index]
                                    ? 800
                                    : 80
                                }
                                height={ imagesPreview.data[index]
                                    ? 600
                                    : 80
                                }
                                loading={'lazy'}
                                title={ imagesPreview.name[index] ?? '' }

                            />
                        </div>
                    </div>
                )))
            }
        </>
    );
};

export default memo(GenresImagesPreview);
