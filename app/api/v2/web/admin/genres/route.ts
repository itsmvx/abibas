import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkApiKey } from "@/lib/CryptoLib";

type QueryResultType = {
    _count: {
        products: number
    }
} & GenresModelType

export type WebGenresPageResponse = {
    message: string,
    data: QueryResultType[]
}
export async function GET(req: NextRequest) {
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

    const idParam: string | null = req.nextUrl.searchParams.get('id');
    const checkParam: string | null = req.nextUrl.searchParams.get('check');

    if (idParam) {
        try {
            const queryResult: GenresModelType | null = await prisma.genres.findFirst({
                where: {
                    id: idParam
                }
            });
            if (!queryResult) {
                return NextResponse.json({
                    message: 'Categories not Found'
                }, { status: 404 });
            }
            return NextResponse.json({
                message: 'success',
                data: queryResult
            }, { status: 200 });
        }
        catch (error) {
            return NextResponse.json({
                message: 'An Error Occurred while querying to Database'
            }, { status: 500 });
        }
    } else if (checkParam) {
        try {
            const queryResult: GenresModelType | null = await prisma.genres.findUnique({
                where: {
                    name: checkParam
                }
            });
            if (queryResult) {
                return NextResponse.json({
                    message: 'Genres name already exist!'
                }, { status: 409 });
            }

            return NextResponse.json({
                message: 'Genres name can be used'
            }, { status: 200 });
        } catch (error) {
            return NextResponse.json({
                message: 'An Occurred while querying to Database'
            }, { status: 500 });
        }
    }

    const pageParam: string | null = req.nextUrl.searchParams.get('page');
    const takeParam: string | null = req.nextUrl.searchParams.get('take');

    const takeQuery: number = takeParam
        ? Number(takeParam)
        : 20;

    const skipQuery: number | undefined = pageParam
        ? takeQuery * Number(pageParam)
        : undefined;
    try {
        const queryResult: QueryResultType[] = await prisma.genres.findMany({
            include: {
                _count: {
                    select: {
                        products: true,
                    }
                }
            },
            skip: skipQuery,
            take: takeQuery
        });

        return NextResponse.json({
            message: 'success',
            data: queryResult
        });
    } catch (error) {
        return NextResponse.json({
            message: 'An Occurred while querying to Database'
        }, { status: 500 });
    }
}

export const revalidate = 1;
