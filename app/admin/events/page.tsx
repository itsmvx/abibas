import { getWebKey } from "@/lib/CryptoLib";
import { WEB_ERROR_CAUSE, WEB_ERROR_MESSAGE } from "@/lib/ErrorsLib";
import AdminEventsContent from "@/app/admin/events/AdminEventsContent";
import prisma from "@/lib/prisma";

export type AdminEventDataType = {
    _count: {
        products: number
    }
} & EventsModelType

// const getEventsData = async () => {
//     const { key, iv }: { key: string | null, iv: string | null } = getApiKey();
//     if (!key || !iv) {
//         throw new Error(WEB_ERROR_MESSAGE.APIKEY_GENERATE_ERROR, { cause: WEB_ERROR_CAUSE.APIKEY_GENERATE_ERROR });
//     }
//
//     const res: Response = await fetch(`${ process.env.MY_WEBAPI_URL }/admin/events`, {
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
const getEventsData = async () => {
    try {
        return await prisma.events.findMany({
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

const EventsPage = async () => {
    const webKey: { key: string | null, iv: string | null } = getWebKey();
    if (!webKey.key || !webKey.iv) {
        throw new Error('Whoops');
    }
    // const eventsRes: WebResponseEventsPage = await getEventsData();
    // const eventsData: AdminEventDataType[] = [ ...eventsRes.data ];
    const eventsData = await getEventsData();

    return (
        <>
            <AdminEventsContent eventsDataProps={eventsData} webKey={webKey} />
        </>
    );
};
export default EventsPage;
