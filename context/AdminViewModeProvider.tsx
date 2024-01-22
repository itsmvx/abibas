'use client';
import { createContext, Dispatch, ReactNode, useState } from "react";

type AdminViewMode = 'CARD' | 'TABLE';
export type AdminViewModeContextType = {
    adminViewMode: AdminViewMode,
    setAdminViewMode: Dispatch<AdminViewMode>
}
export const AdminViewModeContext = createContext<AdminViewModeContextType | null>(null);
const AdminViewModeProvider = ({ children }: { children: ReactNode }) => {
    const [ adminViewMode, setAdminViewMode ] = useState<AdminViewMode>('TABLE');

    return (
        <>
            <AdminViewModeContext.Provider value={{
                adminViewMode, setAdminViewMode
            }}>
                { children }
            </AdminViewModeContext.Provider>
        </>
    );
};

export default AdminViewModeProvider;
