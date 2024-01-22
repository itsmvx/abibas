import { NextRequest, NextResponse } from "next/server";
import { checkApiKey } from "@/lib/CryptoLib";
import prisma from "@/lib/prisma";

type QueryResultType = {
    _count: {
        products: number
    }
} & EventsModelType

export type WebResponseEventsPage = {
    message: string,
    data: QueryResultType[]
}

export async function GET(req: NextRequest): Promise<NextResponse<WebResponseEventsPage | { message: string }>> {
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
            const queryResult: EventsModelType | null = await prisma.events.findFirst({
                where: {
                    id: idParam
                }
            });
            if (!queryResult) {
                return NextResponse.json({
                    message: 'Event not Found'
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
            const queryResult: EventsModelType | null = await prisma.events.findUnique({
                where: {
                    name: checkParam
                }
            });
            if (queryResult) {
                return NextResponse.json({
                    message: 'Event name already exist!'
                }, { status: 409 });
            }

            return NextResponse.json({
                message: 'Event name can be used'
            }, { status: 200 });
        } catch (error) {
            return NextResponse.json({
                message: 'An Error Occurred while querying data from Database'
            }, { status: 500 });
        }
    }

    try {
        const queryResult: QueryResultType[] = await prisma.events.findMany({
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

export async function DELETE(req: NextRequest) {
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
        const reqFormData: FormData = await req.formData();
        const idToDelete: string | null = reqFormData.get('id') as string;
        if (!idToDelete) {
            return NextResponse.json({
                message: 'Hey man... Ganbare Ganbare :D'
            }, { status: 403 });
        }
        await prisma.events.delete({
            where: {
                id: idToDelete
            }
        });
        return NextResponse.json({
            message: 'Requested action was executed successfully'
        }, { status: 200, statusText: 'Requested action was executed successfully' });
    } catch (error: any) {
        return NextResponse.json({
            message: 'An error occurred while querying to Database'
        }, { status: 500, statusText: 'An error occurred while querying to Database' });
    }
}
