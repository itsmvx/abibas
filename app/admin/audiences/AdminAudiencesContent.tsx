'use client';
import AdminAudiencesCard from "@/app/admin/audiences/AdminAudiencesCard";
import AdminAudiencesTable from "@/app/admin/audiences/AdminAudiencesTable";
import useAdminViewModeContext from "@/hooks/useAdminViewModeContext";
import AdminContentHeading from "@/app/components/AdminContentHeading";

type AudienceDataType = {
    _count: {
        products: number
    }
} & AudiencesModelType
const AdminAudiencesContent = ({ audiencesData, webKey }: { audiencesData: AudienceDataType[], webKey: { key: string | null, iv: string | null } }) => {
    const { adminViewMode, setAdminViewMode } = useAdminViewModeContext();

    return (
        <>
            <AdminContentHeading
                adminViewMode={adminViewMode}
                setAdminViewMode={setAdminViewMode}
                tittle="Audiences"
                webKey={webKey.key}
            />
            {
                adminViewMode === 'CARD'
                    ? <AdminAudiencesCard audiencesData={audiencesData} webKey={webKey}/>
                    : adminViewMode === 'TABLE'
                        ? <AdminAudiencesTable audiencesData={audiencesData} />
                        : <AdminAudiencesCard audiencesData={audiencesData} webKey={webKey}/>
            }
            <footer className="mt-5 mx-auto w-full h-auto rounded-sm ring-1 ring-zinc-600/50 bg-white">

            </footer>
        </>
    );
};

export default AdminAudiencesContent;
