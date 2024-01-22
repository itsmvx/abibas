import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import NotificationToast from "@/app/components/NotificationToast";
import LoadingScreenProvider from "@/context/LoadingScreenProvider";
import { LoadingScreen } from "@/app/components/LoadingScreen";
const NotificationToastProvider = dynamic(() => import('@/context/NotificationToastProvider'), { ssr: false });
const AdminViewModeProvider = dynamic(() => import("@/context/AdminViewModeProvider"), { ssr: false });
const AdminContentWrapper = dynamic(() => import('@/app/components/AdminContentWrapper'), { ssr: false });
const AdminSideNav = dynamic(() => import('@/app/components/AdminSideNav'), { ssr: false });
const UserPrefsSettings = dynamic(() => import('@/app/components/UserPrefSettings'), { ssr: false });
export const metadata: Metadata = {
    title: 'Abibas | Admin'
};
export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <AdminViewModeProvider>
                <NotificationToastProvider>
                    <LoadingScreenProvider>
                        <main className="w-full min-h-screen flex flex-row font-tommy bg-gray-100 scroll-smooth">
                            <AdminSideNav/>
                            <AdminContentWrapper>
                                {children}
                            </AdminContentWrapper>
                            <NotificationToast/>
                            <LoadingScreen />
                            <UserPrefsSettings mode='Admin'/>
                        </main>
                    </LoadingScreenProvider>
                </NotificationToastProvider>
            </AdminViewModeProvider>
        </>
    );
}
