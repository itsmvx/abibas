import { NextRequest, NextResponse } from "next/server";
import { checkApiKey } from "@/lib/CryptoLib";
import prisma from "@/lib/prisma";

type QueryResultType = {
    _count: {
        products: number
    }
} & AudiencesModelType

export type WebResponseAudiencesPage = {
    message: string,
    data: QueryResultType[]
}

export async function GET(req: NextRequest): Promise<NextResponse<WebResponseAudiencesPage | { message: string }>> {
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
            const queryResult: AudiencesModelType | null = await prisma.audiences.findFirst({
                where: {
                    id: idParam
                }
            });
            if (!queryResult) {
                return NextResponse.json({
                    message: 'Audience not Found'
                }, { status: 404 });
            }
            return NextResponse.json({
                message: 'success',
                data: queryResult
            }, { status: 200 });
        }
        catch (error) {
            return NextResponse.json({
                message: 'An Error Occurred while querying data from Database'
            }, { status: 500 });
        }
    } else if (checkParam) {
        try {
            const queryResult: AudiencesModelType | null = await prisma.audiences.findUnique({
                where: {
                    name: checkParam
                }
            });
            if (queryResult) {
                return NextResponse.json({
                    message: 'Audience name already exist!'
                }, { status: 409 });
            }

            return NextResponse.json({
                message: 'Audience name can be used'
            }, { status: 200 });
        } catch (error) {
            return NextResponse.json({
                message: 'An Error Occurred while querying data from Database'
            }, { status: 500 });
        }
    }

    try {
        const queryResult: QueryResultType[] = await prisma.audiences.findMany({
            include: {
                _count: {
                    select: {
                        products: true
                    }
                }
            }
        });
        return NextResponse.json({
            message: 'success',
            data: queryResult
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: 'An Error Occurred while querying data from Database'
        }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
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

    const reqData = await req.json();
    if (!reqData.id) {
        return NextResponse.json({
            msg: 'GG LU BANG'
        }, { status: 400 });
    }

    const querySearch: AudiencesModelType | null = await prisma.audiences.findUnique({
        where: {
            id: reqData.id
        }
    });

    const oldImages = querySearch?.images;

    if (querySearch) {
        return NextResponse.json({
            msg: 'Ada orangnya bg'
        }, { status: 400 });
    }

    await prisma.audiences.update({
        where: {
            id: reqData.id
        },
        data: {
            name: reqData.name,
            images: oldImages ? [ ...oldImages, reqData.images ] : [ ...reqData.images ]
        }
    });

    return NextResponse.json({
        msg: reqData
    });
}
