import { getWebKey } from "@/lib/CryptoLib";
import { WEB_ERROR_CAUSE, WEB_ERROR_MESSAGE } from "@/lib/ErrorsLib";
// import { WebGenresPageResponse } from "@/app/api/v2/web/admin/genres/route";
import AdminGenresContent from "@/app/admin/genres/AdminGenresContent";
import prisma from "@/lib/prisma";

export type AdminGenreDataType = {
    _count: {
        products: number
    }
} & GenresModelType
const getGenresData = async () => {
    try {
        return await prisma.genres.findMany({
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
const GenresPage = async () => {
    const webKey: { key: string | null, iv: string | null } = getWebKey();
    if (!webKey.key || !webKey.iv) {
        throw new Error('Whoops');
    }
    const genresData = await getGenresData();
    console.log(genresData[0].createdAt);
    return (
        <>
            <AdminGenresContent genresData={genresData} webKey={webKey} />
        </>
    );
};
export default GenresPage;
