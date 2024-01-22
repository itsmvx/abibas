// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { z } from "zod";
//
// export async function GET(req: NextRequest) {
//     try {
//         const idParams = req.nextUrl.searchParams.get('id')
//             ? String(req.nextUrl.searchParams.get('id'))
//             : NextResponse.json({
//                 message: 'ID not found!'
//             }, { status: 500 });
//         const query = await prisma.users.findMany({
//             select: {
//                 id: true,
//                 fullname: true,
//                 username: true,
//                 images: true
//             },
//             where: {
//                 id: idParams
//             }
//         });
//         return NextResponse.json({
//             message: 'success',
//             data: query
//         }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({
//            message: 'An error to get data'
//         }, { status: 500 });
//     }
// }
//
// export async function POST(req: NextRequest) {
//     const formDataSchema = z.object({
//         fullname: z.string().min(1, { message: "fullname must be fill" }),
//         username: z.string().min(1, { message: "username field is required" }),
//         email: z.string().email(1, { message: "email field is required" }),
//         images: z.string().array().min(1, { message: "At least one image is required" })
//     });
//     try {
//         const formData = await req.json();
//         if (!formData.fullname || !formData.username || !formData.email || !formData.images) {
//             return NextResponse.json({
//                 message: 'Invalid Required field'
//             }, { status: 400 });
//         }
//         const validatedData = formDataSchema.parse(formData);
//         await prisma.users.create({
//             data: {
//                 fullname: validatedData.fullname,
//                 username: validatedData.username,
//                 email: validatedData.email,
//                 images: validatedData.images
//             }
//         });
//         return NextResponse.json({
//            message: 'success'
//         }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({
//             message: 'An error to get data'
//         }, { status: 500 });
//     }
// }
//
// export async function PATCH(req: NextRequest){
//     const formDataSchema = z.object({
//         fullname: z.string().min(1, { message: "fullname must be fill" }),
//         username: z.string().min(1, { message: "username field is required" }),
//         email: z.string().email(1,{ message: "email field is required" }),
//         images: z.string().array().min(1, { message: "At least one image is required" })
//     });
//     try {
//         const formData = await req.json();
//         if (!formData.fullname || !formData.username || !formData.email || !formData.images) {
//             return NextResponse.json({
//                 message: 'Invalid Required field'
//             }, { status: 400 });
//         }
//         const validatedData = formDataSchema.parse(formData);
//         let whereInput: { } | undefined = {};
//         const idParams: string | null = req.nextUrl.searchParams.get('id');
//         idParams
//             ? whereInput = { ...whereInput, id: idParams }
//             : NextResponse.json({
//                 message: 'Missing parameter id'
//             }, { status: 400 });
//
//         const query = await prisma.users.update({
//             data: {
//                 fullname: validatedData.fullname,
//                 username: validatedData.username,
//                 email: validatedData.email,
//                 images: validatedData.images
//             },
//             where: {
//                 id: whereInput
//             }
//         });
//         return NextResponse.json({
//             message: 'success',
//             data: query
//         }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({
//             message: 'An error to get data'
//         }, { status: 500 });
//     }
// }
//
// export async function DELETE(req: NextRequest){
//     try {
//         const idParams = req.nextUrl.searchParams.get('idParams')
//             ? String(req.nextUrl.searchParams.get('idParams'))
//             : NextResponse.json({
//                 message: 'Id not found!'
//             });
//         await prisma.users.delete({
//             where: {
//                 id: idParams.toString()
//             }
//         });
//         return NextResponse.json({
//             message: 'success'
//         }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({
//             message: 'An error to get data'
//         }, { status: 500 });
//     }
// }

import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        message: 'IYA'
    });
}
