import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { checkApiKey } from "@/lib/CryptoLib";

type QueriesResultType = [
    {
        count: number, data: AudiencesModelType | null
    },
    {
        count: number, data: CategoriesModelType | null
    },
    {
        count: number, data: GenresModelType | null
    },
    {
        count: number, data: SeriesModelType | null
    },
    {
        count: number, data: ProductsModelType | null
    },
    {
        count: number, ongoing: number
    }
]
export type WebDashboardPageResponse = {
    message: string,
    data: {
        audiences: {
            count: number,
            data: AudiencesModelType | null
        },
        categories: {
            count: number,
            data: CategoriesModelType | null
        },
        genres: {
            count: number,
            data: GenresModelType | null
        },
        series: {
            count: number,
            data: SeriesModelType | null
        },
        products: {
            count: number,
            data: ProductsModelType | null
        },
        events: {
            count: number,
            ongoing: number
        },
    }
}
export async function GET(req: NextRequest): Promise<NextResponse<WebDashboardPageResponse | { message: string }>> {
    const headerKey: string | null = req.headers.get('X-Api-Key');
    if (!headerKey) {
        return NextResponse.json({
            message: `You Shouldn't here man..`
        }, { status: 403 });
    }
    try {
        const { iv, key } = JSON.parse(headerKey);
        if (!iv || !key ) {
            return NextResponse.json({
                message: 'Invalid API Key man... Ganbare Ganbare :D'
            }, { status: 403 });
        }
    } catch (error: any) {
        return NextResponse.json({
            message: 'Whoops.. we have some challenger huh'
        }, { status: 403 });
    }
    const apiKeyTest: { ok: boolean, message: string } = await checkApiKey(headerKey);
    if (!apiKeyTest.ok) {
        return NextResponse.json({
            message: apiKeyTest.message
        }, { status: 401 });
    }

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
        const queries: QueriesResultType = await Promise.all([
            await audiencesQuery(),
            await categoriesQuery(),
            await genresQuery(),
            await seriesQuery(),
            await productsQuery(),
            await eventsQuery()
        ]);
        return NextResponse.json({
            message: 'Success',
            data: {
                audiences: queries[0],
                categories: queries[1],
                genres: queries[2],
                series: queries[3],
                products: queries[4],
                events: queries[5],
            }
        });
    } catch (error) {
        return NextResponse.json({
            message: 'An Error occurred while fetching data to Database'
        }, { status: 500 });
    }
}
