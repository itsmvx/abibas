import { NextRequest, NextResponse } from "next/server";
import { checkApiKey } from "@/lib/CryptoLib";

export const useWebAPIAuth = async (req: NextRequest) => {
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
};
