import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
    try {
        const query = await prisma.events.findMany({
            take: 5
        });
        return NextResponse.json({
           message: 'Success',
           data: query
        },{ status: 200 });
    } catch (error) {
        return NextResponse.json({
           message: 'An error to get data'
        },{ status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const formDataSchema = z.object({
        name: z.string().min(1, { message: "name must be fill" }),
        slug: z.string().min(1, { message: "Slug field is required" }),
        description: z.string().min(1,{ message: "Description field is required" }),
        images: z.string().array().min(1, { message: "At least one image is required" }),
        status: z.boolean(),
        beginDate: z.date(),
        endDate: z.date()
    });
    try {
        const formData = await req.json();
        if (!formData.name || !formData.slug || !formData.description || !formData.images || !formData.status
            || !formData.beginDate || !formData.endDate) {
            return NextResponse.json({
                message: 'Invalid Required field'
            }, { status: 400 });
        }
        const validatedData = formDataSchema.parse(formData);
        await prisma.events.create({
           data: {
               name: validatedData.name,
               slug: validatedData.slug,
               description: validatedData.description,
               images: validatedData.images,
               status: validatedData.status,
               beginDate: validatedData.beginDate,
               endDate: validatedData.endDate
           }
        });
        return NextResponse.json({
           message: 'success'
        },{ status: 201 });
    } catch (error) {
        return NextResponse.json({
           message: 'An error to create data'
        },{ status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    const formDataSchema = z.object({
        name: z.string().min(1, { message: "name must be fill" }),
        slug: z.string().min(1, { message: "Slug field is required" }),
        description: z.string().min(1,{ message: "Description field is required" }),
        images: z.string().array().min(1, { message: "At least one image is required" }),
        status: z.boolean(),
        beginDate: z.date(),
        endDate: z.date()
    });
    try {
        const formData = await req.json();
        if (!formData.name || !formData.slug || !formData.description || !formData.images || !formData.status
            || !formData.beginDate || !formData.endDate) {
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

        const query = await prisma.events.update({
            data: {
                name: validatedData.name,
                slug: validatedData.slug,
                description: validatedData.description,
                images: validatedData.images,
                status: validatedData.status,
                beginDate: validatedData.beginDate,
                endDate: validatedData.endDate
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
           message: 'An error to updating data',
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
        await prisma.events.delete({
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
