'use client';
import useAdminViewModeContext from "@/hooks/useAdminViewModeContext";
import AdminContentHeading from "@/app/components/AdminContentHeading";
import { AdminEventDataType } from "@/app/admin/events/page";
import AdminEventsCard from "@/app/admin/events/AdminEventsCard";
import AdminEventsTable from "@/app/admin/events/AdminEventsTable";
import { useState } from "react";

const AdminEventsContent = ({ eventsDataProps, webKey }: { eventsDataProps: AdminEventDataType[], webKey: { key: string | null, iv: string | null } }) => {
    const { adminViewMode, setAdminViewMode } = useAdminViewModeContext();
    const [ eventsData, setEventsData ] = useState<AdminEventDataType[]>(eventsDataProps);

    return (
        <>
            <AdminContentHeading
                adminViewMode={adminViewMode}
                setAdminViewMode={setAdminViewMode}
                tittle="Events"
                webKey={webKey.key}
            />
            {
                adminViewMode === 'CARD'
                    ? <AdminEventsCard eventData={eventsData} webKey={webKey} />
                    : adminViewMode === 'TABLE'
                        ? <AdminEventsTable eventsDataProps={eventsData} setEventsDataProps={setEventsData} />
                        : <AdminEventsCard eventData={eventsData} webKey={webKey}/>
            }
        </>
    );
};

export default AdminEventsContent;
