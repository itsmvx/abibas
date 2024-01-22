import { NextRequest, NextResponse } from 'next/server';
import { put } from "@vercel/blob";

export async function POST(req: NextRequest): Promise<NextResponse<{ message: string } | { message: string, data: string[] }>> {
    try {
        const formData: FormData = await req.formData ();
        const formDataValues: FormDataEntryValue[] = Array.from (formData.values());
        const imageUrls: string[] = await Promise.all(formDataValues.map (async (formData: FormDataEntryValue) => {
            const imageFile: File = formData as File;
            const { url }: { url: string } = await put(`${imageFile.name}`, imageFile, { access: 'public' });
            return url;
        }));

    //     const processedBuffers = await Promise.all(formDataValues.map(async (image: FormDataEntryValue) => {
    //         const img: File = image as File;
    //         const arrBuffer: ArrayBuffer = await img.arrayBuffer();
    //         const uint8Array: Uint8Array = new Uint8Array(arrBuffer);
    //
    //         return await sharp (uint8Array)
    //             .toFormat ('webp')
    //             .resize ({ width: 1024 })
    //             .webp ({ quality: 85 })
    //             .toBuffer ();
    //     }));
    //
    //     const combinedBuffer: Buffer = Buffer.concat(processedBuffers);
    //     return new NextResponse (combinedBuffer, {
    //         headers: {
    //             'Content-Type': 'image/webp',
    //         },
    //     });
        return NextResponse.json({
            message: 'Operation Succeeded',
            data: imageUrls
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
        }, { status: 500, statusText: 'Operation Failed, an error occurred' });
    }
}

export const revalidate = 1;
