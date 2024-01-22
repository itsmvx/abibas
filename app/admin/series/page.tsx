import { getWebKey } from "@/lib/CryptoLib";
import { WEB_ERROR_CAUSE, WEB_ERROR_MESSAGE } from "@/lib/ErrorsLib";
// import { WebSeriesPageResponse } from "@/app/api/v2/web/admin/series/route";
import AdminSeriesContent from "@/app/admin/series/AdminSeriesContent";
import prisma from "@/lib/prisma";

export type AdminSeriesDataType = {
    _count: {
        products: number
    }
} & SeriesModelType

// const getSeriesData = async () => {
//     const { key, iv }: { key: string | null, iv: string | null } = getApiKey();
//     if (!key || !iv) {
//         throw new Error(WEB_ERROR_MESSAGE.APIKEY_GENERATE_ERROR, { cause: WEB_ERROR_CAUSE.APIKEY_GENERATE_ERROR });
//     }
//
//     const res: Response = await fetch(`${ process.env.MY_WEBAPI_URL }/admin/series`, {
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

const getSeriesData = async () => {
    try {
        return await prisma.series.findMany({
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
const SeriesPage = async () => {
    const webKey: { key: string | null, iv: string | null } = getWebKey();
    if (!webKey.key || !webKey.iv) {
        throw new Error('Whoops');
    }
    // const seriesRes = await getSeriesData();
    const seriesData = await getSeriesData();

    return (
        <>
            <AdminSeriesContent seriesData={seriesData} webKey={webKey} />
        </>
    );
};
export default SeriesPage;
