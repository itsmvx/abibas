import Image from "next/image";
import { ChickenImg, Haruna2L, Noa2L, Rio1L } from "@/lib/StaticImagesLib";
import Link from "next/link";
import { dateFormat } from "@/lib/DateFormatLib";
import { WEB_ERROR_CAUSE, WEB_ERROR_MESSAGE } from "@/lib/ErrorsLib";
import prisma from "@/lib/prisma";

const getDashboardData = async () => {
    try {
        const audiencesQuery = async (): Promise<{ count: number, data: AudiencesModelType | null }> => {
            const [ count, data ]: [ count: number, data: AudiencesModelType | null ] = await prisma.$transaction([
                prisma.audiences.count(),
                prisma.audiences.findFirst({
                    take: -1
                })
            ]);
            return {
                count: count,
                data: data
            };
        };
        const categoriesQuery = async (): Promise<{ count: number, data: CategoriesModelType | null }> => {
            const [ count, data ]: [ count: number, data: CategoriesModelType | null ] = await prisma.$transaction([
                prisma.categories.count(),
                prisma.categories.findFirst({
                    take: -1
                })
            ]);
            return {
                count: count,
                data: data
            };
        };
        const genresQuery = async (): Promise<{ count: number, data: GenresModelType | null }> => {
            const [ count, data ]: [ count: number, data: GenresModelType | null ] = await prisma.$transaction([
                prisma.genres.count(),
                prisma.genres.findFirst({
                    take: -1
                })
            ]);
            return {
                count: count,
                data: data
            };
        };
        const seriesQuery = async (): Promise<{ count: number, data: SeriesModelType | null }> => {
            const [ count, data ]: [ count: number, data: SeriesModelType | null ] = await prisma.$transaction([
                prisma.series.count(),
                prisma.series.findFirst({
                    take: -1
                })
            ]);
            return {
                count: count,
                data: data
            };
        };
        const productsQuery = async (): Promise<{ count: number, data: ProductsModelType | null }> => {
            const [ count, data ]: [ count: number, data: ProductsModelType | null ] = await prisma.$transaction([
                prisma.products.count(),
                prisma.products.findFirst({
                    take: -1
                })
            ]);
            return {
                count: count,
                data: data
            };
        };
        const eventsQuery = async (): Promise<{ count: number, ongoing: number }> => {
            const [ allCount, ongoingCount ]: [ allCount: number, ongoingcount: number ] = await prisma.$transaction([
                prisma.events.count(),
                prisma.events.count({
                    where: {
                        status: true
                    }
                })
            ]);
            return {
                count: allCount,
                ongoing: ongoingCount
            };
        };
        const queries = await Promise.all([
            await audiencesQuery(),
            await categoriesQuery(),
            await genresQuery(),
            await seriesQuery(),
            await productsQuery(),
            await eventsQuery()
        ]);
        return {
            audiences: queries[0],
            categories: queries[1],
            genres: queries[2],
            series: queries[3],
            products: queries[4],
            events: queries[5],
        };

    } catch (error) {
        throw new Error(WEB_ERROR_MESSAGE.DATABASE_ERROR, { cause: WEB_ERROR_CAUSE.DATABASE_ERROR });
    }
};

const DashboardPage = async () => {
    const dashboardData = await getDashboardData();
    return (
        <>
            <div className="space-y-10">
                <section className="flex flex-row flex-wrap justify-evenly lg:justify-between gap-y-4 md:gap-x-3 py-2 transition-all ease-in-out duration-300">
                    <div className="w-full md:w-80 lg:w-[32%] h-36 bg-white rounded-lg ring-[0.5px] ring-zinc-400 shadow-sm shadow-gray-300 transition-all duration-200 ease-in-out">
                        <div className="relative w-11/12 h-2/3 overflow-hidden">
                            <div className="absolute left-5 top-1/3 w-12 h-12 flex items-center justify-center bg-neutral-800 text-white rounded-xl">
                                <iconify-icon
                                    width={24}
                                    icon="mdi:account-group-outline"
                                />
                            </div>
                            <div className="absolute top-1/3 left-16 right-2 translate-x-2">
                                <h1 className="text-sm text-zinc-700 font-medium text-right truncate">
                                    Total Audiences
                                </h1>
                                <p className="text-xl text-right font-bold truncate">
                                    {
                                        dashboardData.audiences.count
                                            ? `${ dashboardData.audiences.count } Audience`
                                            : ' 0 Audience'
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="h-10 flex items-end justify-center text-sm text-zinc-700">
                            Last Entry :
                            {
                                dashboardData.audiences.data?.createdAt
                                    ? ` ${ dateFormat(dashboardData.audiences.data.createdAt.toString(), 'YYYY-MM-DD hh:mm') }`
                                    : ' Not set yet'
                            }
                        </div>
                    </div>
                    <div className="w-full md:w-80 lg:w-[32%] h-36 bg-white rounded-lg ring-[0.5px] ring-zinc-400 shadow-sm shadow-gray-300 transition-all duration-200 ease-in-out">
                        <div className="w-11/12 h-2/3 relative overflow-hidden">
                            <div className="absolute left-5 top-1/3 w-12 h-12 flex items-center justify-center bg-neutral-800 text-white rounded-xl">
                                <iconify-icon width={24} icon="mdi:folder-multiple-outline"></iconify-icon>
                            </div>
                            <div className="absolute top-1/3 left-16 right-2 translate-x-2">
                                <h1 className="text-sm text-zinc-700 font-medium text-right truncate">
                                    Total Categories
                                </h1>
                                <p className="text-xl text-right font-bold truncate">
                                    {
                                        dashboardData.categories.count
                                            ? `${ dashboardData.categories.count } Category`
                                            : ' 0 Category'
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="h-10 flex items-end justify-center text-sm text-zinc-700">
                            Last Entry :
                            {
                                dashboardData.categories.data?.createdAt
                                    ? ` ${ dateFormat(dashboardData.categories.data.createdAt.toString(), 'YYYY-MM-DD hh:mm') }`
                                    : ' Not set yet'
                            }
                        </div>
                    </div>
                    <div className="w-full md:w-80 lg:w-[32%] h-36 bg-white rounded-lg ring-[0.5px] ring-zinc-400 shadow-sm shadow-gray-300 transition-all duration-200 ease-in-out">
                        <div className="w-11/12 h-2/3 relative overflow-hidden">
                            <div className="absolute left-5 top-1/3 w-12 h-12 flex items-center justify-center bg-neutral-800 text-white rounded-xl">
                                <iconify-icon width={24} icon="mdi:folder-star-multiple-outline"></iconify-icon>
                            </div>
                            <div className="absolute top-1/3 left-16 right-2 translate-x-2">
                                <h1 className="text-sm text-zinc-700 font-medium text-right truncate">
                                    Total Genres
                                </h1>
                                <p className="text-xl text-right font-bold truncate">
                                    {
                                        dashboardData.genres.count
                                            ? `${ dashboardData.genres.count } Genre`
                                            : ' 0 Genre'
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="h-10 flex items-end justify-center text-sm text-zinc-700">
                            Last Entry :
                            {
                                dashboardData.genres.data?.createdAt
                                    ? ` ${ dateFormat(dashboardData.genres.data.createdAt.toString(), 'YYYY-MM-DD hh:mm') }`
                                    : ' Not set yet'
                            }
                        </div>
                    </div>

                    <div className="w-full md:w-80 lg:w-[32%] h-36 bg-white rounded-lg ring-[0.5px] ring-zinc-400 shadow-sm shadow-gray-300 transition-all duration-200 ease-in-out">
                        <div className="w-11/12 h-2/3 relative overflow-hidden">
                            <div className="absolute left-5 top-1/3 w-12 h-12 flex items-center justify-center bg-neutral-800 text-white rounded-xl">
                                <iconify-icon width={24} icon="mdi:cards"></iconify-icon>
                            </div>
                            <div className="absolute top-1/3 left-16 right-2 translate-x-2">
                                <h1 className="text-sm text-zinc-700 font-medium text-right truncate">
                                    Total Series
                                </h1>
                                <p className="text-xl text-right font-bold truncate">
                                    {
                                        dashboardData.series.count
                                            ? `${ dashboardData.series.count } Series`
                                            : ' 0 Series'
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="h-10 flex items-end justify-center text-sm text-zinc-700">
                            Last entry :
                            {
                                dashboardData.series.data?.createdAt
                                    ? ` ${dateFormat(dashboardData.series.data.createdAt.toString(), 'YYYY-MM-DD hh:mm')}`
                                    : ' Not set yet'
                            }
                        </div>
                    </div>
                    <div className="w-full md:w-80 lg:w-[32%] h-36 bg-white rounded-lg ring-[0.5px] ring-zinc-400 shadow-sm shadow-gray-300 transition-all duration-200 ease-in-out">
                        <div className="w-11/12 h-2/3 relative overflow-hidden">
                            <div className="absolute left-5 top-1/3 w-12 h-12 flex items-center justify-center bg-neutral-800 text-white rounded-xl">
                                <iconify-icon width={24} icon="mdi:shopping-outline"></iconify-icon>
                            </div>
                            <div className="absolute top-1/3 left-16 right-2 translate-x-2">
                                <h1 className="text-sm text-zinc-700 font-medium text-right truncate">
                                    Total Products
                                </h1>
                                <p className="text-xl text-right font-bold truncate">
                                    {
                                        dashboardData.products.count
                                            ? `${ dashboardData.products.count } Product`
                                            : ' 0 Product'
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="h-10 flex items-end justify-center text-sm text-zinc-700">
                            Last entry :
                            {
                                dashboardData.products.data?.createdAt
                                    ? ` ${dateFormat(dashboardData.products.data.createdAt.toString(), 'YYYY-MM-DD hh:mm')}`
                                    : ' Not set yet'
                            }
                        </div>
                    </div>
                    <div className="w-full md:w-80 lg:w-[32%] h-36 bg-white rounded-lg ring-[0.5px] ring-zinc-400 shadow-sm shadow-gray-300 transition-all duration-200 ease-in-out">
                        <div className="w-11/12 h-2/3 relative overflow-hidden">
                            <div className="absolute left-5 top-1/3 w-12 h-12 flex items-center justify-center bg-neutral-800 text-white rounded-xl">
                                <iconify-icon width={24} icon="mdi:calendar-month-outline"></iconify-icon>
                            </div>
                            <div className="absolute top-1/3 left-16 right-2 translate-x-2">
                                <h1 className="text-sm text-zinc-700 font-medium text-right truncate">
                                    Total Events
                                </h1>
                                <p className="text-xl text-right font-bold truncate">
                                    {
                                        dashboardData.events.count
                                            ? `${ dashboardData.events.count } Event`
                                            : ' 0 Event '
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="h-10 flex items-end justify-center text-sm text-zinc-700">
                            {
                                dashboardData.events.ongoing
                                    ? `${ dashboardData.events.ongoing } Event On Going `
                                    : ' Not Set Yet'
                            }
                        </div>
                    </div>
                </section>

                <section className="space-y-3 select-none">
                    <div className="w-full flex flex-col md:flex-row flex-wrap lg:flex-nowrap justify-evenly lg:justify-between items-center lg:items-start gap-x-3 gap-y-10">
                        <div className="w-full sm:w-96 md:w-80 lg:w-80 aspect-[5/4] relative group transition-all duration-300 ease-in-out rounded-md ring-[3px] ring-neutral-900 shadow-sm shadow-zinc-500 overflow-hidden bg-neutral-100">
                            <div className="absolute z-10 -top-1 -left-1.5 px-3 py-1 -skew-x-[22deg] rounded-r-md text-white bg-neutral-900">
                                Latest Product
                            </div>
                            <Image
                                src={
                                dashboardData.products.data
                                    ? Rio1L
                                    : ChickenImg
                                }
                                alt=""
                                fill={!!dashboardData.products.data}
                                className={
                                    dashboardData.products.data
                                        ? 'object-cover object-center'
                                        : 'w-4/12 aspect-square absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'
                                }
                            />
                            <div className="absolute z-20 top-0 bottom-0 left-0 w-full flex flex-col items-center justify-evenly bg-neutral-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                <h1 className="justify-self-center mx-8 font-semibold text-zinc-100 text-lg text-center truncate capitalize">
                                    {
                                        dashboardData.products.data?.name ?? 'No Product yet'
                                    }
                                </h1>
                                <div className="text-center text-white">
                                    {
                                        dashboardData.products.data && (
                                            <Link
                                                href={`/admin`}
                                                className="peer"
                                            >
                                                <iconify-icon
                                                    width={45}
                                                    icon="mdi:arrow-right-circle"
                                                />
                                            </Link>
                                        )
                                    }
                                    <p className="text-sm tracking-tighter -mt-2 peer-hover:opacity-100 opacity-0 transition-opacity duration-150">
                                        Check details
                                    </p>
                                </div>
                                <p className="font-mono text-sm font-semibold text-white">
                                    Updated on:
                                    {
                                        dashboardData.products.data?.updatedAt
                                            ? ` ${dateFormat(dashboardData.products.data.updatedAt.toString())}`
                                            : ' -'
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="w-full sm:w-96 md:w-80 lg:w-80 aspect-[5/4] relative group transition-all duration-300 ease-in-out rounded-md ring-[3px] ring-neutral-900 shadow-sm shadow-zinc-500 overflow-hidden bg-neutral-100">
                            <div className="absolute z-10 -top-1 -left-1.5 px-3 py-1 -skew-x-[22deg] rounded-r-md text-white bg-neutral-900">
                                Latest Series
                            </div>
                            <Image
                                src={
                                    dashboardData.series.data
                                        ? Noa2L
                                        : ChickenImg
                                }
                                alt=""
                                fill={!!dashboardData.series.data}
                                className={
                                    dashboardData.series.data
                                        ? 'object-cover object-center'
                                        : 'w-4/12 aspect-square absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'
                                }
                            />
                            <div className="absolute z-20 top-0 bottom-0 left-0 w-full flex flex-col items-center justify-evenly bg-neutral-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                <h1 className="justify-self-center mx-8 font-semibold text-zinc-100 text-lg text-center truncate capitalize">
                                    {
                                        dashboardData.series.data?.name ?? 'No Product yet'
                                    }
                                </h1>
                                <div className="text-center text-white">
                                    {
                                        dashboardData.series.data && (
                                            <Link
                                                href={`/admin/series${ dashboardData.series.data.id }`}
                                                className="peer"
                                            >
                                                <iconify-icon
                                                    width={45}
                                                    icon="mdi:arrow-right-circle"
                                                />
                                            </Link>
                                        )
                                    }
                                    <p className="text-sm tracking-tighter -mt-2 peer-hover:opacity-100 opacity-0 transition-opacity duration-150">
                                        Check details
                                    </p>
                                </div>
                                <p className="font-mono text-sm font-semibold text-white">
                                    Updated on:
                                    {
                                        dashboardData.series.data?.updatedAt
                                            ? ` ${dateFormat(dashboardData.series.data.updatedAt.toString(), 'YYYY-MM-DD')}`
                                            : ' -'
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="w-full sm:w-96 md:w-80 lg:w-80 aspect-[5/4] relative group transition-all duration-300 ease-in-out rounded-md ring-[3px] ring-neutral-900 shadow-sm shadow-zinc-500 overflow-hidden bg-neutral-100">
                            <div className="absolute z-10 -top-1 -left-1.5 px-3 py-1 -skew-x-[22deg] rounded-r-md text-white bg-neutral-900">
                                Latest Genre
                            </div>
                            <Image
                                src={
                                dashboardData.genres.data
                                    ? Haruna2L
                                    : ChickenImg
                                }
                                alt=""
                                fill={!!dashboardData.genres.data}
                                className={
                                    dashboardData.genres.data
                                        ? 'object-cover object-center'
                                        : 'w-4/12 aspect-square absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'
                                }
                            />
                            <div className="absolute z-20 top-0 bottom-0 left-0 w-full flex flex-col items-center justify-evenly bg-neutral-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                <h1 className="justify-self-center mx-8 font-semibold text-zinc-100 text-lg text-center truncate capitalize">
                                    {
                                        dashboardData.genres.data?.name ?? 'No Product yet'
                                    }
                                </h1>
                                <div className="text-center text-white">
                                    {
                                        dashboardData.genres.data && (
                                            <Link
                                                href={`/admin`}
                                                className="peer"
                                            >
                                                <iconify-icon
                                                    width={45}
                                                    icon="mdi:arrow-right-circle"
                                                />
                                            </Link>
                                        )
                                    }
                                    <p className="text-sm tracking-tighter -mt-2 peer-hover:opacity-100 opacity-0 transition-opacity duration-150">
                                        Check details
                                    </p>
                                </div>
                                <p className="font-mono text-sm font-semibold text-white">
                                    Updated on:
                                    {
                                        dashboardData.genres.data?.updatedAt
                                            ? ` ${dateFormat(dashboardData.genres.data.updatedAt.toString(), 'YYYY-MM-DD')}`
                                            : ' -'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};
export default DashboardPage;
