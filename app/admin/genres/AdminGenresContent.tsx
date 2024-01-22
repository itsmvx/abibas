'use client';
import useAdminViewModeContext from "@/hooks/useAdminViewModeContext";
import AdminContentHeading from "@/app/components/AdminContentHeading";
import { AdminGenreDataType } from "@/app/admin/genres/page";
import AdminGenresCard from "@/app/admin/genres/AdminGenresCard";
import AdminGenresTable from "@/app/admin/genres/AdminGenresTable";

const AdminGenresContent = ({ genresData, webKey }: { genresData: AdminGenreDataType[], webKey: { key: string | null, iv: string | null } }) => {
    const { adminViewMode, setAdminViewMode } = useAdminViewModeContext();

    return (
        <>
            <AdminContentHeading
                adminViewMode={adminViewMode}
                setAdminViewMode={setAdminViewMode}
                tittle="Genres"
                webKey={webKey.key}
            />
            {
                adminViewMode === 'CARD'
                    ? <AdminGenresCard genresData={genresData} webKey={webKey} />
                    : adminViewMode === 'TABLE'
                        ? <AdminGenresTable genresData={genresData} />
                        : <AdminGenresCard genresData={genresData} webKey={webKey}/>
            }
        </>
    );
};

export default AdminGenresContent;
