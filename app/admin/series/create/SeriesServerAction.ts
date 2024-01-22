'use server';
import sharp from "sharp";
import { getApiKey } from "@/lib/CryptoLib";
import { z } from "zod";
import path from "node:path";
import prisma from "@/lib/prisma";
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";

const seriesFormSchema = z.object({
    name: z.string()
        .min(1, { message: `Name can't be empty` })
        .regex(/^[a-zA-Z0-9\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/, { message: 'Unique symbol is not allowed in Name input' }),
    slug: z.string().min(1, { message: `Category Slug can't be empty` }),
    description: z.string().min(1, { message: `'Category Description can't be empty` }),
    images: z.string().array().nonempty({ message: `Images must be provided` })
});

export const seriesCreateData = async (formData: FormData): Promise<{ success: boolean, message: string }> => {
    const validatedForm = seriesFormSchema.safeParse({
        name: formData.get('name'),
        slug: formData.get('slug'),
        description: formData.get('description'),
        images: formData.get('images')
            ? JSON.parse(formData.get('images') as string)
            : []
    });
    if (!validatedForm.success) {
        return {
            success: false,
            message: validatedForm.error.issues[0].message
        };
    }
    try {
        await prisma.series.create({
            data: {
                name: validatedForm.data.name,
                slug: validatedForm.data.slug,
                description: validatedForm.data.description,
                images: validatedForm.data.images
            }
        });
        return {
            success: true,
            message: 'Form Submit success'
        };
    } catch (error: any) {
        const errorMessage: string = error instanceof PrismaClientKnownRequestError
            ? error.message
            : error instanceof PrismaClientUnknownRequestError
                ? error.message
                : `Anonymous error occurred`;
        return {
            success: false,
            message: errorMessage
        };
    }
};

export async function seriesNameCheck(name: string): Promise<boolean | null> {
    const { key, iv }: { key: string | null, iv: string | null } = getApiKey();
    if (!key || !iv) {
        return null;
    }

    const res: Response = await fetch(`${ process.env.MY_WEBAPI_URL }/admin/series?check=${ name.toLowerCase() }`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'X-Api-Key': JSON.stringify({ key: key, iv: iv })
        },
        cache: 'no-store'
    });
    if (res.status === 500) {
        return null;
    }

    return res.ok;
}
export async function imagesProcess(formData: FormData): Promise<{ name: string[], data: string[] } | null> {
    try {
        const imageFiles: FormDataEntryValue[] = Array.from(formData.values());
        const imageProcessing: Buffer[] = await Promise.all(imageFiles.map(async (image: FormDataEntryValue) => {
            const img: File = image as File;
            const arrBuffer: ArrayBuffer = await img.arrayBuffer();
            const uint8Array: Uint8Array = new Uint8Array(arrBuffer);
            return await sharp (uint8Array)
                .toFormat ('webp')
                .resize ({ width: 1024 })
                .webp ({ quality: 85 })
                .toBuffer ();
        }));

        return {
            name: imageFiles.map((image) => {
                const img: File = image as File;
                return path.parse(img.name).name;
            }),
            data: imageProcessing.map((result: Buffer): string => `data:image/webp;base64,${Buffer.from(result).toString('base64')}`)
        };
    } catch (error) {
        return null;
    }
}

