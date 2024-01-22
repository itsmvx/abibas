import { getWebKey } from "@/lib/CryptoLib";
import { WEB_ERROR_CAUSE, WEB_ERROR_MESSAGE } from "@/lib/ErrorsLib";
// import { WebResponseAudiencesPage } from "@/app/api/v2/web/admin/audiences/route";
import AdminAudiencesContent from '@/app/admin/audiences/AdminAudiencesContent';
import prisma from "@/lib/prisma";

export type AdminAudienceDataType = {
    _count: {
        products: number
    }
} & AudiencesModelType

// const getAudiencesData = async () => {
//     const { key, iv }: { key: string | null, iv: string | null } = getApiKey();
//     if (!key || !iv) {
//         throw new Error(WEB_ERROR_MESSAGE.APIKEY_GENERATE_ERROR, { cause: WEB_ERROR_CAUSE.APIKEY_GENERATE_ERROR });
//     }
//
//     const res: Response = await fetch(`${ process.env.MY_WEBAPI_URL }/admin/audiences`,{
//         method: 'GET',
//         headers: {
//             'X-Api-Key': JSON.stringify({ key: key, iv: iv })
//         }
//     });
//     if (!res.ok) {
//         throw new Error(WEB_ERROR_MESSAGE.APIKEY_GENERATE_ERROR, { cause: WEB_ERROR_CAUSE.DATABASE_ERROR });
//     }
//
//     return res.json();
// };
const getAudienceData = async () => {
    try {
        return await prisma.audiences.findMany({
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
const AudiencesPage = async () => {
    const webKey: { key: string | null, iv: string | null } = getWebKey();
    if (!webKey.key || !webKey.iv) {
        throw new Error('Whoops');
    }
    // const audienceRes: WebResponseAudiencesPage = await getAudiencesData();
    // const audiencesData: AdminAudienceDataType[] = [ ...audienceRes.data ];
    const audiencesData = await getAudienceData();
    return (
        <>
            <AdminAudiencesContent audiencesData={audiencesData} webKey={webKey} />
        </>

    );
};
export default AudiencesPage;
