'use client';
import { useUserPrefsContext } from "@/hooks/useUserPreferencesContext";
import { ReactNode } from "react";

const DefaultContentWrapper = ({ children } : { children: ReactNode }) => {
    const { userPrefsState } = useUserPrefsContext();
    return (
        <>
            <main className={`w-full h-full ${ userPrefsState.navbarFixed ? 'mt-0' : 'mt-16' } transition-all duration-200 ease-in-out`}>
                { children }
            </main>
        </>
    );
};

export default DefaultContentWrapper;
