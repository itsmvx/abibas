import { SignUpComponents } from "@/app/(account)/sign-up/SignUpComponents";
import prisma from "@/lib/prisma";

const SignUpPage = async () => {
    const rolesData = await prisma.roles.findMany();
    return (
        <>
           <SignUpComponents rolesData={rolesData}/>
        </>

    );
};

export default SignUpPage;
