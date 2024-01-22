'use client';
import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { useUserPrefsContext } from "@/hooks/useUserPreferencesContext";
const AdminNavbar = dynamic(() => import('@/app/components/AdminNavbar'), { ssr: false });
const AdminContentWrapper = ({ children }: { children: ReactNode }) => {
    const { userPrefsState } = useUserPrefsContext();
    return (
        <>
            <section
                className="flex-1 ml-0 pb-5 lg:ml-80 w-full transition-all duration-300 ease-in-out overflow-x-clip">
                <div className="mx-4">
                    <AdminNavbar/>
                    <section
                        className={`${userPrefsState.navbarFixed ? 'mt-10' : 'mt-0'} transition-all duration-300 ease-in-out`}>
                        {children}
                    </section>
                </div>
            </section>
        </>
    );
};

export default AdminContentWrapper;
