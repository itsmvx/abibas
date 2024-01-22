import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

export async function GET() {
    try {
        const getData = await prisma.genres.findMany({
           select: {
               id: true,
               name: true,
               slug: true,
               description: true,
               images: true
           }
        });
        return NextResponse.json({
           message: 'success',
           data: getData
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
           message: 'An error to get data'
        }, {  status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const formDataSchema = z.object({
        name: z.string().min(1, { message: "name must be fill" }),
        slug: z.string().min(1, { message: "Slug field is required" }),
        description: z.string().min(1,{ message: "Description field is required" }),
        images: z.string().array().min(1, { message: "At least one image is required" })
    });
    try {
        const formData = await req.json();
        if (!formData.name || !formData.slug || !formData.description || !formData.images) {
            return NextResponse.json({
                message: 'Invalid Required field'
            }, { status: 400 });
        }
        const validatedData = formDataSchema.parse(formData);
        await prisma.genres.create({
            data: {
                name: validatedData.name,
                slug: validatedData.slug,
                description: validatedData.description,
                images: validatedData.images
            }
        });
        return NextResponse.json({
            message: "success"
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
           message: 'An error'
        }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    const formDataSchema = z.object({
        name: z.string().min(1, { message: "name must be fill" }),
        slug: z.string().min(1, { message: "Slug field is required" }),
        description: z.string().min(1,{ message: "Description field is required" }),
        images: z.string().array().min(1, { message: "At least one image is required" })
    });
    try {
        const formData = await req.json();
        if (!formData.name || !formData.slug || !formData.description || !formData.images) {
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
        const query = await prisma.genres.update({
            data: {
                name: validatedData.name,
                slug: validatedData.slug,
                description: validatedData.description,
                images: validatedData.images
            },
            where: {
                id: whereInput.toString()
            }
        });
        return NextResponse.json({
           message: 'succes updating data',
           data: query
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
           message: 'An error to update data'
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
        await prisma.genres.delete({
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
