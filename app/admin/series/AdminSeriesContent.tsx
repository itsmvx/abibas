'use client';
import useAdminViewModeContext from "@/hooks/useAdminViewModeContext";
import AdminContentHeading from "@/app/components/AdminContentHeading";
import { AdminSeriesDataType } from "@/app/admin/series/page";
import AdminSeriesCard from "@/app/admin/series/AdminSeriesCard";
import AdminSeriesTable from "@/app/admin/series/AdminSeriesTable";

const AdminSeriesContent = ({ seriesData, webKey }: { seriesData: AdminSeriesDataType[], webKey: { key: string | null, iv: string | null } }) => {
    const { adminViewMode, setAdminViewMode } = useAdminViewModeContext();

    return (
        <>
            <AdminContentHeading
                adminViewMode={adminViewMode}
                setAdminViewMode={setAdminViewMode}
                tittle="Series"
                webKey={webKey.key}
            />
            {
                adminViewMode === 'CARD'
                    ? <AdminSeriesCard seriesData={seriesData} webKey={webKey} />
                    : adminViewMode === 'TABLE'
                        ? <AdminSeriesTable seriesData={seriesData} />
                        : <AdminSeriesCard seriesData={seriesData} webKey={webKey}/>
            }
        </>
    );
};

export default AdminSeriesContent;
