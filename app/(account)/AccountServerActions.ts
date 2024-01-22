import { signIn } from "next-auth/react";
import prisma from "@/lib/prisma";
export async function signInAction(username: string, password: string, mode: 'email' | 'username') {
    // const authRes = await fetch(`/api/v2/users`, {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         username: username,
    //         password: password
    //     })
    // });
    console.log(mode);
    const auth = await signIn('credentials', {
        username: username,
        password: password,
        redirect: false
    });

    return auth;
}

export async function signUpAction(formSignUp: FormData) {
    try {
        const fullname = formSignUp.get('fullname') as string;
        const username = formSignUp.get('username') as string;
        const password = formSignUp.get('password') as string;
        const email = formSignUp.get('email') as string;
        const role = formSignUp.get('role') as string;

        if (!fullname || !username || !password || !email || !role) {
            return null;
        }
        const createUserResponse: Response = await fetch(`/api/v2/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullname: fullname,
                username: username,
                password: password,
                email: email,
                role: role,
            })
        });
        return {
            success: createUserResponse.ok,
            message: createUserResponse.statusText
        };

    } catch (error: any) {
        return error.message;
    }
}

export async function uniqueCheck(value: string, column: 'username' | 'email'):  Promise<boolean | null> {
    try {
        let findUnique: {} | UserModelType | null = {};
        if (column === 'username') {
            findUnique = await prisma.user.findUnique({
                where: {
                    username: value
                }
            });
        }
        else {
            findUnique = await prisma.user.findUnique({
                where: {
                    email: value
                }
            });
        }
        return !!findUnique;

    } catch (error: any) {
        return null;
    }
}
