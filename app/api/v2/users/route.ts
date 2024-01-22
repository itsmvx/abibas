import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

const inputRegex: RegExp = /^(?=.*[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[\sa-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
const userSchema = z.object({
    fullname: z.string().min(5).max(255),
    username: z.string().min(5, {
        message: 'Username at least five character'
    }).regex(inputRegex, {
        message: 'Username contains only alphanumeric characters'
    }),
    email: z.string().min(5, { message: 'Email address contains only alphanumeric characters' }),
    password: z.string().min(5, {
        message: 'Password at least five character'
    }),
    role: z.string().min(3, {
        message: 'Role must be provided'
    })
});
export async function POST(req: NextRequest) {
    const { fullname, username, email, password, role } = await req.json();
    const validatedData = userSchema.safeParse({
        fullname: fullname,
        username: username,
        email: email,
        password: password,
        role: role,
    });
    if (!validatedData.success) {
        return NextResponse.json({
            success: false,
            message: validatedData.error.message
        }, { status: 400, statusText: validatedData.error.message });
    }

   try {
       const createUser = await prisma.user.create({
           data: {
               fullname: validatedData.data.fullname,
               username: validatedData.data.username,
               email: validatedData.data.email,
               password: await bcrypt.hash(validatedData.data.password, 12),
               roles: {
                   connect: {
                       id: validatedData.data.role
                   }
               }
           }
       });
       return NextResponse.json({
           success: true,
           data: {
               ...createUser,
               password: 'uhuy'
           }
       }, { status: 200, statusText: 'User successfully created!' });
   } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: error.message ?? 'Something went wrong'
        }, { status: 500, statusText: error.message ?? 'Something went wrong' });
   }
}
