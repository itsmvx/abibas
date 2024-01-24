import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: "jwt",
        maxAge: 4 * 60 * 60, // 4 hours
        updateAge: 24 * 60 * 60, // 24 hours
    },
    providers: [
        CredentialsProvider({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { username, password } = credentials ?? {};
                if (!username || !password) {
                    throw new Error("Missing username or password");
                }
                let existUser;
                try {
                    existUser = await prisma.user.findUnique({
                        where: {
                            username: username
                        }
                    });
                } catch (error) {
                    return null;
                }
                if (!existUser || !(await bcrypt.compare(password, existUser.password))) {
                    return null;
                }
                return {
                    id: existUser.id,
                    fullname: existUser.fullname,
                    username: existUser.username,
                    email: existUser.email,
                    images: existUser.images,
                    role: existUser.role
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    fullname: user.fullname,
                    username: user.username,
                    email: user.email,
                    images: user.images,
                    role: user.role
                };
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    fullname: token.fullname,
                    username: token.username,
                    email: token.email,
                    images: token.images,
                    role: token.role
                }
            };
            return session;
        },

    }
};
