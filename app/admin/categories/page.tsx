import { getWebKey } from "@/lib/CryptoLib";
import { WEB_ERROR_CAUSE, WEB_ERROR_MESSAGE } from "@/lib/ErrorsLib";
import AdminCategoriesContent from "@/app/admin/categories/AdminCategoriesContent";
// import { WebCategoriesPageResponse } from "@/app/api/v2/web/admin/categories/route";
import prisma from "@/lib/prisma";

export type AdminCategoryDataType = {
    _count: {
        products: number
    }
} & CategoriesModelType

// const getCategoriesData = async () => {
//     const { key, iv }: { key: string | null, iv: string | null } = getApiKey();
//     if (!key || !iv) {
//         throw new Error(WEB_ERROR_MESSAGE.APIKEY_GENERATE_ERROR, { cause: WEB_ERROR_CAUSE.APIKEY_GENERATE_ERROR });
//     }
//
//     const res: Response = await fetch(`${ process.env.MY_WEBAPI_URL }/admin/categories`, {
//         method: 'GET',
//         headers: {
//             'Content-type': 'application/json',
//             'X-Api-Key': JSON.stringify({ key: key, iv: iv })
//         }
//     });
//     if (!res.ok) {
//         throw new Error('HH3H3');
//     }
//
//     return res.json();
// };

const getCategoriesData = async () => {
    try {
        return await prisma.categories.findMany({
            include: {
                _count: {
                    select: {
                        products: true
                    }
                }
            }
        });
    } catch (error) {
        throw new Error(WEB_ERROR_MESSAGE.DATABASE_ERROR, { cause: WEB_ERROR_CAUSE.DATABASE_ERROR });
    }
};
const CategoriesPage = async () => {
    const webKey: { key: string | null, iv: string | null } = getWebKey();
    if (!webKey.key || !webKey.iv) {
        throw new Error('Whoops');
    }
    // const categoriesRes: WebCategoriesPageResponse = await getCategoriesData();
    // const categoriesData: AdminCategoryDataType[] = [ ...categoriesRes.data ];
    const categoriesData = await getCategoriesData();

    return (
        <>
            <AdminCategoriesContent categoriesData={categoriesData} webKey={webKey} />
        </>
    );
};
export default CategoriesPage;
export const dynamic = 'force-dynamic';
