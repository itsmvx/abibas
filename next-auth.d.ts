// eslint-disable-next-line no-unused-vars
import NextAuth from "next-auth";
declare module "next-auth" {
    interface User {
        fullname: string | null;
        username: string;
        email: string | null;
        images: string[];
        role: string;
    }
    // eslint-disable-next-line no-unused-vars
    interface Session {
        user: User & {
            fullname: string | null;
            username: string;
            email: string | null;
            images: string[];
            role: string;
        }
        token: {
            fullname: string | null;
            username: string;
            email: string | null;
            images: string[];
            role: string;
        }
    }
}
