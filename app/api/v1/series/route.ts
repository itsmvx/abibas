import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { undefined, z } from "zod";

export async function GET(req: NextRequest) {
    const count = req.nextUrl.searchParams.get('count')
        ? Number(req.nextUrl.searchParams.get('count'))
        : 20;

    let whereInput: { } | undefined = {};
    const idParams: string | null = req.nextUrl.searchParams.get('id');
    idParams
        ? whereInput = { ...whereInput, id: idParams }
        : whereInput = undefined;
    try {
        const queryData = await prisma.series.findMany({
            where: whereInput,
            take: count
        });
        return NextResponse.json({
            message: 'success',
            data: queryData,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: 'An error to get data!'
        }, { status: 500 });
    }

}
export async function POST(req: NextRequest)  {

    const formDataSchema = z.object({
        name: z.string().min(1, { message: "name must be fill" }),
        slug: z.string().min(1, { message: "Slug field is required" }),
        description: z.string().min(1,{ message: "Description field is required" }),
    });
    try {
        const formData = await req.json();
        if (!formData.name || !formData.slug || !formData.description) {
            return NextResponse.json({
                message: 'Invalid Required field'
            }, { status: 400 });
        }
        const validatedData = formDataSchema.parse(formData);
        await prisma.series.create({
            data: {
                name: validatedData.name,
                slug: validatedData.slug,
                description: validatedData.description
            }
        });
        return NextResponse.json({
            message: "success"
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({
            message: `${ error ?? 'An error occurred while connecting to database' }`
        }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    const formDataSchema = z.object({
        name: z.string().min(1, { message: "name must be fill" }),
        slug: z.string().min(1, { message: "Slug field is required" }),
        description: z.string().min(1,{ message: "Description field is required" }),
    });
    try {
        const formData = await req.json();
        if (!formData.name || !formData.slug || !formData.description) {
            return NextResponse.json({
                message: 'Invalid Required field'
            }, { status: 400 });
        }
        const validatedData = formDataSchema.parse(formData);
        let whereInput: { } | undefined = {};
        const idParams: string | null = req.nextUrl.searchParams.get('id');
        idParams
            ? whereInput = { ...whereInput, id: idParams }
            : NextResponse.json({
                message: 'Missing parameter id'
            }, { status: 400 });
        const query = await prisma.series.update({
            data: {
                name: validatedData.name,
                slug: validatedData.slug,
                description: validatedData.description
            },
            where: {
                id: whereInput.toString()
            }
        });
        return NextResponse.json({
           message: 'success',
           data: query
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
           message: 'An error to updating data'
        }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const idParams = req.nextUrl.searchParams.get('idParams')
            ? String(req.nextUrl.searchParams.get('idParams'))
            : NextResponse.json({
                message: 'Id not found!'
            });
        await prisma.series.delete({
            where: {
                id: idParams.toString()
            }
        });
        return NextResponse.json({
            message: 'success'
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: 'error'
        }, { status: 500 });
    }
}
